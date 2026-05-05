/**
 * StudentKeadaanChart.tsx
 * ──────────────────────────────────────────────────────────────
 * Komponen visualisasi data keadaan siswa SMAS PGRI 1 Bandung.
 *
 * Stack  : React (InertiaJS 3.x) + Chakra UI 3.x + ApexCharts
 * Install: npm install react-apexcharts apexcharts
 *
 * Struktur data mengikuti format CSV:
 *   - Baris kelas   : setiap kelas dengan jumlah L, P, Total per bulan
 *   - Baris ringkasan: Siswa Awal Bulan, Mutasi Masuk,
 *                      Mutasi Keluar, Siswa Akhir Bulan
 * Tahun ajaran dimulai Juli → Juni (12 bulan).
 *
 * Kelas: X (5 kelas), XI (6 kelas), XII (7 kelas)
 */

import {
    Badge,
    Box,
    Card,
    Container,
    Flex,
    Grid,
    Heading,
    HStack,
    Table,
    Tabs,
    Text,
    VStack,
} from '@chakra-ui/react';
import type { ApexOptions } from 'apexcharts';
import React, { useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useColorMode } from '../ui/color-mode';

// ════════════════════════════════════════════════════════════════
// TYPES
// ════════════════════════════════════════════════════════════════

type Grade = 'X' | 'XI' | 'XII';

type MonthKey =
    | 'Juli'
    | 'Agustus'
    | 'September'
    | 'Oktober'
    | 'November'
    | 'Desember'
    | 'Januari'
    | 'Februari'
    | 'Maret'
    | 'April'
    | 'Mei'
    | 'Juni';

interface GenderCount {
    l: number;
    p: number;
    jumlah: number;
}

interface ClassEntry {
    kelas: string;
    waliKelas: string;
    grade: Grade;
    /** Jumlah siswa L, P, total per bulan */
    bulan: Record<MonthKey, GenderCount>;
}

/**
 * Representasi 4 baris ringkasan di bawah tabel kelas (sesuai CSV):
 *   - Jumlah Siswa Awal Bulan
 *   - Mutasi Masuk
 *   - Mutasi Keluar
 *   - Jumlah Siswa Akhir Bulan
 */
interface MonthlySummary {
    bulan: MonthKey;
    siswaAwalBulan: number;
    mutasiMasuk: number;
    mutasiKeluar: number;
    siswaAkhirBulan: number;
}

interface StudentData {
    tahunAjaran: string;
    classes: ClassEntry[];
    summary: MonthlySummary[];
}

interface ChartData {
    gradeMonthlyTotals: Record<Grade, number[]>;
    genderTotals: Array<{ l: number; p: number }>;
    siswaAwalTahun: number;
    siswaAkhirTahun: number;
    totalMutasiMasuk: number;
    totalMutasiKeluar: number;
    monthsShort: string[];
}

// ════════════════════════════════════════════════════════════════
// CONSTANTS
// ════════════════════════════════════════════════════════════════

const MONTHS: MonthKey[] = [
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
];

const MONTH_SHORT: Record<MonthKey, string> = {
    Juli: 'Jul',
    Agustus: 'Ags',
    September: 'Sep',
    Oktober: 'Okt',
    November: 'Nov',
    Desember: 'Des',
    Januari: 'Jan',
    Februari: 'Feb',
    Maret: 'Mar',
    April: 'Apr',
    Mei: 'Mei',
    Juni: 'Jun',
};

const GRADE_COLORS: Record<Grade, string> = {
    X: '#3B82F6', // blue-500
    XI: '#10B981', // emerald-500
    XII: '#F59E0B', // amber-500
};

// ════════════════════════════════════════════════════════════════
// DUMMY DATA
// ════════════════════════════════════════════════════════════════

/** Definisi kelas tanpa data bulan */
const CLASS_DEFINITIONS: Array<Omit<ClassEntry, 'bulan'>> = [
    // ── Kelas X (5 kelas) ────────────────────────────────────────
    { kelas: 'X-1', waliKelas: 'Ane Rahma Sapitri, S.Pd', grade: 'X' },
    { kelas: 'X-2', waliKelas: 'Budi Santoso, S.Pd', grade: 'X' },
    { kelas: 'X-3', waliKelas: 'Citra Dewi, M.Pd', grade: 'X' },
    { kelas: 'X-4', waliKelas: 'Dedi Kurniawan, S.Pd', grade: 'X' },
    { kelas: 'X-5', waliKelas: 'Eka Pertiwi, S.Pd', grade: 'X' },
    // ── Kelas XI (6 kelas) ───────────────────────────────────────
    { kelas: 'XI-1', waliKelas: 'Fajar Nugroho, M.Pd', grade: 'XI' },
    { kelas: 'XI-2', waliKelas: 'Gina Amalia, S.Pd', grade: 'XI' },
    { kelas: 'XI-3', waliKelas: 'Hendra Wijaya, S.Pd', grade: 'XI' },
    { kelas: 'XI-4', waliKelas: 'Indah Lestari, M.Pd', grade: 'XI' },
    { kelas: 'XI-5', waliKelas: 'Joko Susilo, S.Pd', grade: 'XI' },
    { kelas: 'XI-6', waliKelas: 'Kartika Sari, S.Pd', grade: 'XI' },
    // ── Kelas XII (7 kelas) ──────────────────────────────────────
    { kelas: 'XII-1', waliKelas: 'Lukman Hakim, M.Pd', grade: 'XII' },
    { kelas: 'XII-2', waliKelas: 'Maya Anggraini, S.Pd', grade: 'XII' },
    { kelas: 'XII-3', waliKelas: 'Nanda Pratama, S.Pd', grade: 'XII' },
    { kelas: 'XII-4', waliKelas: 'Oka Wirawan, M.Pd', grade: 'XII' },
    { kelas: 'XII-5', waliKelas: 'Putri Rahayu, S.Pd', grade: 'XII' },
    { kelas: 'XII-6', waliKelas: 'Qori Fauzan, S.Pd', grade: 'XII' },
    { kelas: 'XII-7', waliKelas: 'Rizky Maulana, M.Pd', grade: 'XII' },
];

/**
 * Jumlah dasar [L, P] per kelas.
 * Total awal: X ≈ 148, XI ≈ 190, XII ≈ 190 → grand total ≈ 528
 */
const CLASS_BASE: Record<string, [number, number]> = {
    'X-1': [15, 15],
    'X-2': [14, 16],
    'X-3': [16, 14],
    'X-4': [15, 14],
    'X-5': [14, 15],
    'XI-1': [16, 16],
    'XI-2': [15, 17],
    'XI-3': [17, 15],
    'XI-4': [16, 16],
    'XI-5': [15, 16],
    'XI-6': [16, 15],
    'XII-1': [13, 14],
    'XII-2': [14, 13],
    'XII-3': [13, 14],
    'XII-4': [14, 14],
    'XII-5': [13, 14],
    'XII-6': [14, 13],
    'XII-7': [14, 13],
};

/**
 * Delta kumulatif [deltaL, deltaP] per bulan untuk kelas "anchor" (-1) tiap tingkat.
 * Kelas lain di tingkat yang sama tetap konstan → mutasi tercermin di summary,
 * bukan di setiap kelas secara terpisah (sesuai logika formulir CSV asli).
 */
const ANCHOR_DELTAS: Record<
    'X-1' | 'XI-1' | 'XII-1',
    Array<[number, number]>
> = {
    'X-1': [
        [0, 0],
        [1, 0],
        [0, 0],
        [0, 1],
        [0, -1],
        [0, 0],
        [-1, -1],
        [0, 1],
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 0],
    ],
    'XI-1': [
        [0, 0],
        [0, 1],
        [0, 0],
        [1, 0],
        [0, 0],
        [0, -1],
        [0, -1],
        [0, 0],
        [0, 0],
        [0, 1],
        [-1, 0],
        [0, 0],
    ],
    'XII-1': [
        [0, 0],
        [0, 0],
        [0, -1],
        [1, 0],
        [0, 0],
        [0, 0],
        [-1, 0],
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
        [0, 0],
    ],
};

/** Membangun data bulanan per kelas secara deterministik */
function buildClassData(): ClassEntry[] {
    return CLASS_DEFINITIONS.map((def) => {
        const [baseL, baseP] = CLASS_BASE[def.kelas];
        const anchorKey = `${def.grade}-1` as keyof typeof ANCHOR_DELTAS;
        const deltas: Array<[number, number]> =
            ANCHOR_DELTAS[anchorKey] ?? MONTHS.map(() => [0, 0]);
        const isAnchor = def.kelas === anchorKey;

        let l = baseL;
        let p = baseP;

        const bulan = Object.fromEntries(
            MONTHS.map((month, i) => {
                if (isAnchor) {
                    // Clamp: tidak kurang dari (base - 3)
                    l = Math.max(baseL - 3, l + deltas[i][0]);
                    p = Math.max(baseP - 3, p + deltas[i][1]);
                }

                return [month, { l, p, jumlah: l + p }];
            }),
        ) as Record<MonthKey, GenderCount>;

        return { ...def, bulan };
    });
}

/**
 * 4 baris ringkasan sesuai format CSV:
 *   Jumlah Siswa Awal Bulan | Mutasi Masuk | Mutasi Keluar | Jumlah Siswa Akhir Bulan
 */
const MONTHLY_SUMMARY: MonthlySummary[] = [
    {
        bulan: 'Juli',
        siswaAwalBulan: 528,
        mutasiMasuk: 2,
        mutasiKeluar: 1,
        siswaAkhirBulan: 529,
    },
    {
        bulan: 'Agustus',
        siswaAwalBulan: 529,
        mutasiMasuk: 1,
        mutasiKeluar: 2,
        siswaAkhirBulan: 528,
    },
    {
        bulan: 'September',
        siswaAwalBulan: 528,
        mutasiMasuk: 0,
        mutasiKeluar: 1,
        siswaAkhirBulan: 527,
    },
    {
        bulan: 'Oktober',
        siswaAwalBulan: 527,
        mutasiMasuk: 3,
        mutasiKeluar: 0,
        siswaAkhirBulan: 530,
    },
    {
        bulan: 'November',
        siswaAwalBulan: 530,
        mutasiMasuk: 1,
        mutasiKeluar: 2,
        siswaAkhirBulan: 529,
    },
    {
        bulan: 'Desember',
        siswaAwalBulan: 529,
        mutasiMasuk: 0,
        mutasiKeluar: 1,
        siswaAkhirBulan: 528,
    },
    {
        bulan: 'Januari',
        siswaAwalBulan: 528,
        mutasiMasuk: 2,
        mutasiKeluar: 3,
        siswaAkhirBulan: 527,
    },
    {
        bulan: 'Februari',
        siswaAwalBulan: 527,
        mutasiMasuk: 1,
        mutasiKeluar: 0,
        siswaAkhirBulan: 528,
    },
    {
        bulan: 'Maret',
        siswaAwalBulan: 528,
        mutasiMasuk: 0,
        mutasiKeluar: 2,
        siswaAkhirBulan: 526,
    },
    {
        bulan: 'April',
        siswaAwalBulan: 526,
        mutasiMasuk: 2,
        mutasiKeluar: 1,
        siswaAkhirBulan: 527,
    },
    {
        bulan: 'Mei',
        siswaAwalBulan: 527,
        mutasiMasuk: 1,
        mutasiKeluar: 3,
        siswaAkhirBulan: 525,
    },
    {
        bulan: 'Juni',
        siswaAwalBulan: 525,
        mutasiMasuk: 0,
        mutasiKeluar: 0,
        siswaAkhirBulan: 525,
    },
];

/** Data dummy lengkap — siap pakai, tidak perlu fetch */
const DUMMY_DATA: StudentData = {
    tahunAjaran: '2024/2025',
    classes: buildClassData(),
    summary: MONTHLY_SUMMARY,
};

// ════════════════════════════════════════════════════════════════
// HOOKS
// ════════════════════════════════════════════════════════════════

/**
 * Mengagregasi data mentah menjadi series yang siap diumpankan ke ApexCharts.
 *
 * Logika utama:
 *  1. gradeMonthlyTotals  → jumlahkan semua kelas per tingkat per bulan
 *  2. genderTotals        → jumlahkan L & P seluruh kelas per bulan
 *  3. stat cards          → ambil dari baris summary (awal/akhir tahun, total mutasi)
 */
function useStudentChartData(data: StudentData): ChartData {
    return useMemo(() => {
        const grades: Grade[] = ['X', 'XI', 'XII'];

        // Agregasi per tingkat per bulan
        const gradeMonthlyTotals = grades.reduce<Record<Grade, number[]>>(
            (acc, grade) => {
                acc[grade] = MONTHS.map((month) =>
                    data.classes
                        .filter((c) => c.grade === grade)
                        .reduce((sum, c) => sum + c.bulan[month].jumlah, 0),
                );

                return acc;
            },
            { X: [], XI: [], XII: [] },
        );

        // Agregasi jenis kelamin seluruh sekolah per bulan
        const genderTotals = MONTHS.map((month) => ({
            l: data.classes.reduce((sum, c) => sum + c.bulan[month].l, 0),
            p: data.classes.reduce((sum, c) => sum + c.bulan[month].p, 0),
        }));

        const first = data.summary[0];
        const last = data.summary[data.summary.length - 1];

        return {
            gradeMonthlyTotals,
            genderTotals,
            siswaAwalTahun: first.siswaAwalBulan,
            siswaAkhirTahun: last.siswaAkhirBulan,
            totalMutasiMasuk: data.summary.reduce(
                (s, m) => s + m.mutasiMasuk,
                0,
            ),
            totalMutasiKeluar: data.summary.reduce(
                (s, m) => s + m.mutasiKeluar,
                0,
            ),
            monthsShort: MONTHS.map((m) => MONTH_SHORT[m]),
        };
    }, [data]);
}

/**
 * Menghasilkan base ApexOptions yang responsif terhadap color mode.
 * Setiap chart hanya perlu di-spread dari sini lalu override bagian spesifik.
 */
function useBaseChartOptions(
    isDark: boolean,
    monthsShort: string[],
): ApexOptions {
    return useMemo(
        () => ({
            chart: {
                background: 'transparent',
                toolbar: { show: false },
                zoom: { enabled: false },
                fontFamily: 'inherit',
                animations: { enabled: true, speed: 500 },
            },
            theme: { mode: isDark ? 'dark' : 'light' },
            grid: {
                borderColor: isDark ? '#374151' : '#E5E7EB',
                strokeDashArray: 4,
                padding: { left: 8, right: 8 },
            },
            xaxis: {
                categories: monthsShort,
                labels: {
                    style: {
                        colors: isDark ? '#9CA3AF' : '#6B7280',
                        fontSize: '11px',
                    },
                },
                axisBorder: { show: false },
                axisTicks: { show: false },
            },
            yaxis: {
                labels: {
                    style: {
                        colors: isDark ? '#9CA3AF' : '#6B7280',
                        fontSize: '11px',
                    },
                },
            },
            legend: {
                position: 'top',
                horizontalAlign: 'left',
                labels: { colors: isDark ? '#D1D5DB' : '#374151' },
                fontSize: '12px',
            },
            tooltip: { theme: isDark ? 'dark' : 'light' },
        }),
        [isDark, monthsShort],
    );
}

// ════════════════════════════════════════════════════════════════
// SUB-COMPONENTS
// ════════════════════════════════════════════════════════════════

interface StatCardProps {
    label: string;
    value: number;
    badge: string;
    badgePalette: string;
    accentColor: string;
}

/** Kartu ringkasan angka tunggal — menampilkan 4 nilai utama dari baris summary */
const StatCard: React.FC<StatCardProps> = ({
    label,
    value,
    badge,
    badgePalette,
    accentColor,
}) => (
    <Card.Root
        size="sm"
        bg={{ base: 'white', _dark: 'gray.800' }}
        borderWidth="1px"
        borderColor={{ base: 'gray.200', _dark: 'gray.700' }}
        overflow="hidden"
        position="relative"
    >
        {/* Aksen warna di kiri kartu */}
        <Box
            position="absolute"
            left={0}
            top={0}
            bottom={0}
            width="4px"
            bg={accentColor}
            borderTopLeftRadius="md"
            borderBottomLeftRadius="md"
        />
        <Card.Body pl={6} pr={4} py={4}>
            <VStack align="start" gap={2}>
                <Text
                    fontSize="10px"
                    fontWeight="semibold"
                    color="gray.500"
                    textTransform="uppercase"
                    letterSpacing="0.08em"
                >
                    {label}
                </Text>
                <Text
                    fontSize="2xl"
                    fontWeight="bold"
                    color={{ base: 'gray.900', _dark: 'white' }}
                    lineHeight={1}
                >
                    {value.toLocaleString('id-ID')}
                </Text>
                <Badge colorPalette={badgePalette} variant="subtle" size="sm">
                    {badge}
                </Badge>
            </VStack>
        </Card.Body>
    </Card.Root>
);

// ════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ════════════════════════════════════════════════════════════════

const StudentKeadaanChart: React.FC = () => {
    const { colorMode } = useColorMode();
    const isDark = colorMode === 'dark';

    const chartData = useStudentChartData(DUMMY_DATA);
    const baseOptions = useBaseChartOptions(isDark, chartData.monthsShort);

    // ── Chart 1: Tren Siswa Per Tingkat (Line) ────────────────────
    const trendOptions: ApexOptions = {
        ...baseOptions,
        chart: { ...baseOptions.chart, type: 'line', id: 'trend' },
        stroke: { curve: 'smooth', width: 2.5 },
        markers: { size: 4, hover: { size: 6 } },
        colors: [GRADE_COLORS.X, GRADE_COLORS.XI, GRADE_COLORS.XII],
        yaxis: {
            ...baseOptions.yaxis,
            min: 100,
            title: {
                text: 'Jumlah Siswa',
                style: {
                    color: isDark ? '#9CA3AF' : '#6B7280',
                    fontSize: '11px',
                },
            },
        },
        tooltip: {
            ...baseOptions.tooltip,
            y: { formatter: (v: number) => `${v} siswa` },
        },
    };

    const trendSeries = [
        { name: 'Kelas X  (5 kls)', data: chartData.gradeMonthlyTotals.X },
        { name: 'Kelas XI (6 kls)', data: chartData.gradeMonthlyTotals.XI },
        { name: 'Kelas XII (7 kls)', data: chartData.gradeMonthlyTotals.XII },
    ];

    // ── Chart 2: Mutasi Siswa (Grouped Bar) ───────────────────────
    const mutasiOptions: ApexOptions = {
        ...baseOptions,
        chart: { ...baseOptions.chart, type: 'bar', id: 'mutasi' },
        plotOptions: {
            bar: { borderRadius: 4, columnWidth: '55%' },
        },
        colors: ['#14B8A6', '#EF4444'],
        yaxis: {
            ...baseOptions.yaxis,
            min: 0,
            max: 6,
            tickAmount: 6,
            title: {
                text: 'Jumlah Siswa',
                style: {
                    color: isDark ? '#9CA3AF' : '#6B7280',
                    fontSize: '11px',
                },
            },
        },
        dataLabels: {
            enabled: true,
            style: { fontSize: '10px', colors: ['#fff'] },
            formatter: (v: number) => (v > 0 ? String(v) : ''),
        },
        tooltip: {
            ...baseOptions.tooltip,
            y: { formatter: (v: number) => `${v} siswa` },
        },
    };

    const mutasiSeries = [
        {
            name: 'Mutasi Masuk',
            data: DUMMY_DATA.summary.map((s) => s.mutasiMasuk),
        },
        {
            name: 'Mutasi Keluar',
            data: DUMMY_DATA.summary.map((s) => s.mutasiKeluar),
        },
    ];

    // ── Chart 3: Jenis Kelamin (Area) ────────────────────────────
    const genderOptions: ApexOptions = {
        ...baseOptions,
        chart: { ...baseOptions.chart, type: 'area', id: 'gender' },
        stroke: { curve: 'smooth', width: 2 },
        fill: {
            type: 'gradient',
            gradient: { opacityFrom: 0.45, opacityTo: 0.05 },
        },
        colors: ['#60A5FA', '#F472B6'],
        yaxis: {
            ...baseOptions.yaxis,
            title: {
                text: 'Jumlah Siswa',
                style: {
                    color: isDark ? '#9CA3AF' : '#6B7280',
                    fontSize: '11px',
                },
            },
        },
        tooltip: {
            ...baseOptions.tooltip,
            y: { formatter: (v: number) => `${v} siswa` },
        },
    };

    const genderSeries = [
        { name: 'Laki-laki', data: chartData.genderTotals.map((g) => g.l) },
        { name: 'Perempuan', data: chartData.genderTotals.map((g) => g.p) },
    ];

    // ── Computed values ───────────────────────────────────────────
    const netChange = chartData.siswaAkhirTahun - chartData.siswaAwalTahun;
    const isNetPositive = netChange >= 0;

    return (
        <Container maxW="7xl">
            <Box p={{ base: 4, md: 6 }} minH="100vh">
                {/* ── Header ─────────────────────────────────────────────── */}
                <Flex
                    justify="space-between"
                    align={{ base: 'flex-start', sm: 'center' }}
                    direction={{ base: 'column', sm: 'row' }}
                    gap={3}
                    mb={6}
                >
                    <VStack align="start" gap={0.5}>
                        <Heading
                            size="lg"
                            fontWeight="bold"
                            color={{ base: 'gray.900', _dark: 'white' }}
                        >
                            Data Keadaan Siswa
                        </Heading>
                        <Text fontSize="sm" color="gray.500">
                            SMAS PGRI 1 Bandung — Tahun Ajaran{' '}
                            {DUMMY_DATA.tahunAjaran}
                        </Text>
                    </VStack>

                    <HStack gap={2}>
                        <Badge
                            colorPalette={isNetPositive ? 'green' : 'red'}
                            variant="solid"
                            px={3}
                            py={1}
                            borderRadius="full"
                            fontSize="sm"
                        >
                            {isNetPositive ? '+' : ''}
                            {netChange} siswa tahun ini
                        </Badge>
                        <Badge
                            colorPalette="blue"
                            variant="outline"
                            px={3}
                            py={1}
                            borderRadius="full"
                            fontSize="sm"
                        >
                            18 Kelas
                        </Badge>
                    </HStack>
                </Flex>

                {/* ── 4 Stat Cards (Summary Rows) ────────────────────────── */}
                <Grid
                    templateColumns={{
                        base: 'repeat(2, 1fr)',
                        md: 'repeat(4, 1fr)',
                    }}
                    gap={4}
                    mb={6}
                >
                    <StatCard
                        label="Siswa Awal Tahun"
                        value={chartData.siswaAwalTahun}
                        badge="Jumlah Awal Bulan Juli"
                        badgePalette="blue"
                        accentColor="#3B82F6"
                    />
                    <StatCard
                        label="Total Mutasi Masuk"
                        value={chartData.totalMutasiMasuk}
                        badge="Jul – Jun"
                        badgePalette="green"
                        accentColor="#10B981"
                    />
                    <StatCard
                        label="Total Mutasi Keluar"
                        value={chartData.totalMutasiKeluar}
                        badge="Jul – Jun"
                        badgePalette="red"
                        accentColor="#EF4444"
                    />
                    <StatCard
                        label="Siswa Akhir Tahun"
                        value={chartData.siswaAkhirTahun}
                        badge="Jumlah Akhir Bulan Juni"
                        badgePalette="orange"
                        accentColor="#F59E0B"
                    />
                </Grid>

                {/* ── Chart Tabs ─────────────────────────────────────────── */}
                <Card.Root
                    bg={{ base: 'white', _dark: 'gray.800' }}
                    borderWidth="1px"
                    borderColor={{ base: 'gray.200', _dark: 'gray.700' }}
                    mb={6}
                >
                    <Card.Body p={{ base: 4, md: 6 }}>
                        <Tabs.Root
                            defaultValue="trend"
                            colorPalette="blue"
                            variant="line"
                        >
                            <Tabs.List
                                mb={4}
                                borderBottomWidth="1px"
                                borderColor={{
                                    base: 'gray.200',
                                    _dark: 'gray.700',
                                }}
                            >
                                <Tabs.Trigger value="trend" fontSize="sm">
                                    Tren Per Kelas
                                </Tabs.Trigger>
                                <Tabs.Trigger value="mutasi" fontSize="sm">
                                    Mutasi Siswa
                                </Tabs.Trigger>
                                <Tabs.Trigger value="gender" fontSize="sm">
                                    Jenis Kelamin
                                </Tabs.Trigger>
                            </Tabs.List>

                            {/* Tab 1: Tren Siswa Per Tingkat */}
                            <Tabs.Content value="trend" pt={2}>
                                <Text fontSize="xs" color="gray.500" mb={3}>
                                    Total siswa per tingkat kelas setiap bulan
                                    (Jul – Jun). Kelas X = 5 kelas, XI = 6
                                    kelas, XII = 7 kelas.
                                </Text>
                                <ReactApexChart
                                    type="line"
                                    options={trendOptions}
                                    series={trendSeries}
                                    height={300}
                                />
                            </Tabs.Content>

                            {/* Tab 2: Mutasi Masuk & Keluar */}
                            <Tabs.Content value="mutasi" pt={2}>
                                <Text fontSize="xs" color="gray.500" mb={3}>
                                    Perbandingan mutasi masuk dan keluar per
                                    bulan (sesuai baris ringkasan CSV).
                                </Text>
                                <ReactApexChart
                                    type="bar"
                                    options={mutasiOptions}
                                    series={mutasiSeries}
                                    height={300}
                                />
                            </Tabs.Content>

                            {/* Tab 3: Distribusi Jenis Kelamin */}
                            <Tabs.Content value="gender" pt={2}>
                                <Text fontSize="xs" color="gray.500" mb={3}>
                                    Distribusi Laki-laki vs Perempuan seluruh
                                    siswa per bulan.
                                </Text>
                                <ReactApexChart
                                    type="area"
                                    options={genderOptions}
                                    series={genderSeries}
                                    height={300}
                                />
                            </Tabs.Content>
                        </Tabs.Root>
                    </Card.Body>
                </Card.Root>

                {/* ── Tabel Rekap Bulanan ────────────────────────────────── */}
                <Card.Root
                    bg={{ base: 'white', _dark: 'gray.800' }}
                    borderWidth="1px"
                    borderColor={{ base: 'gray.200', _dark: 'gray.700' }}
                >
                    <Card.Body p={{ base: 4, md: 6 }}>
                        <Flex justify="space-between" align="center" mb={4}>
                            <Text
                                fontWeight="semibold"
                                fontSize="md"
                                color={{ base: 'gray.800', _dark: 'white' }}
                            >
                                Rekap Bulanan — Jul s/d Jun
                            </Text>
                            <Badge colorPalette="gray" variant="subtle">
                                {DUMMY_DATA.tahunAjaran}
                            </Badge>
                        </Flex>

                        <Box overflowX="auto">
                            <Table.Root size="sm" variant="outline">
                                <Table.Header>
                                    <Table.Row
                                        bg={{
                                            base: 'gray.50',
                                            _dark: 'gray.700',
                                        }}
                                    >
                                        <Table.ColumnHeader
                                            fontWeight="semibold"
                                            minW="110px"
                                        >
                                            Bulan
                                        </Table.ColumnHeader>
                                        <Table.ColumnHeader
                                            textAlign="center"
                                            fontWeight="semibold"
                                            minW="160px"
                                        >
                                            Siswa Awal Bulan
                                        </Table.ColumnHeader>
                                        <Table.ColumnHeader
                                            textAlign="center"
                                            fontWeight="semibold"
                                            color="green.500"
                                            minW="130px"
                                        >
                                            Mutasi Masuk
                                        </Table.ColumnHeader>
                                        <Table.ColumnHeader
                                            textAlign="center"
                                            fontWeight="semibold"
                                            color="red.500"
                                            minW="130px"
                                        >
                                            Mutasi Keluar
                                        </Table.ColumnHeader>
                                        <Table.ColumnHeader
                                            textAlign="center"
                                            fontWeight="semibold"
                                            minW="160px"
                                        >
                                            Siswa Akhir Bulan
                                        </Table.ColumnHeader>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {DUMMY_DATA.summary.map((row, idx) => {
                                        const isEven = idx % 2 === 0;

                                        return (
                                            <Table.Row
                                                key={row.bulan}
                                                bg={
                                                    isEven
                                                        ? {
                                                              base: 'white',
                                                              _dark: 'gray.800',
                                                          }
                                                        : {
                                                              base: 'gray.50',
                                                              _dark: 'gray.750',
                                                          }
                                                }
                                                _hover={{
                                                    bg: {
                                                        base: 'blue.50',
                                                        _dark: 'gray.700',
                                                    },
                                                }}
                                                transition="background 0.15s"
                                            >
                                                <Table.Cell fontWeight="medium">
                                                    {row.bulan}
                                                </Table.Cell>
                                                <Table.Cell
                                                    textAlign="center"
                                                    color={{
                                                        base: 'gray.700',
                                                        _dark: 'gray.200',
                                                    }}
                                                >
                                                    {row.siswaAwalBulan.toLocaleString(
                                                        'id-ID',
                                                    )}
                                                </Table.Cell>
                                                <Table.Cell textAlign="center">
                                                    <Badge
                                                        colorPalette="green"
                                                        variant="subtle"
                                                        minW="40px"
                                                        textAlign="center"
                                                    >
                                                        +{row.mutasiMasuk}
                                                    </Badge>
                                                </Table.Cell>
                                                <Table.Cell textAlign="center">
                                                    <Badge
                                                        colorPalette="red"
                                                        variant="subtle"
                                                        minW="40px"
                                                        textAlign="center"
                                                    >
                                                        -{row.mutasiKeluar}
                                                    </Badge>
                                                </Table.Cell>
                                                <Table.Cell
                                                    textAlign="center"
                                                    fontWeight="semibold"
                                                    color={{
                                                        base: 'gray.900',
                                                        _dark: 'white',
                                                    }}
                                                >
                                                    {row.siswaAkhirBulan.toLocaleString(
                                                        'id-ID',
                                                    )}
                                                </Table.Cell>
                                            </Table.Row>
                                        );
                                    })}
                                </Table.Body>

                                {/* Baris total akumulatif */}
                                <Table.Footer>
                                    <Table.Row
                                        bg={{
                                            base: 'blue.50',
                                            _dark: 'blue.900',
                                        }}
                                        borderTopWidth="2px"
                                        borderColor={{
                                            base: 'blue.200',
                                            _dark: 'blue.700',
                                        }}
                                    >
                                        <Table.Cell
                                            fontWeight="bold"
                                            color={{
                                                base: 'blue.700',
                                                _dark: 'blue.300',
                                            }}
                                        >
                                            Total Tahun
                                        </Table.Cell>
                                        <Table.Cell
                                            textAlign="center"
                                            fontWeight="semibold"
                                        >
                                            {/* Siswa awal bulan pertama */}
                                            {DUMMY_DATA.summary[0].siswaAwalBulan.toLocaleString(
                                                'id-ID',
                                            )}
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">
                                            <Badge
                                                colorPalette="green"
                                                variant="solid"
                                                minW="40px"
                                                textAlign="center"
                                            >
                                                +{chartData.totalMutasiMasuk}
                                            </Badge>
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">
                                            <Badge
                                                colorPalette="red"
                                                variant="solid"
                                                minW="40px"
                                                textAlign="center"
                                            >
                                                -{chartData.totalMutasiKeluar}
                                            </Badge>
                                        </Table.Cell>
                                        <Table.Cell
                                            textAlign="center"
                                            fontWeight="bold"
                                            color={{
                                                base: 'blue.700',
                                                _dark: 'blue.300',
                                            }}
                                        >
                                            {chartData.siswaAkhirTahun.toLocaleString(
                                                'id-ID',
                                            )}
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Footer>
                            </Table.Root>
                        </Box>
                    </Card.Body>
                </Card.Root>
            </Box>
        </Container>
    );
};

export default StudentKeadaanChart;
