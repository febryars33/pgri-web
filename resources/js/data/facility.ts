import {
    LuMonitor,
    LuBeaker,
    LuBook,
    LuUtensils,
    LuDribbble,
    LuMusic,
} from 'react-icons/lu';
import type { FacilityItem } from '@/types/facility';

export const facilities: FacilityItem[] = [
    {
        id: 1,
        name: 'Lab Komputer 1',
        icon: LuMonitor,
        color: 'blue',
        capacity: '40 Siswa',
        size: '120 m²',
        desc: 'Lab modern untuk pembelajaran pemrograman dan desain grafis.',
        descFull:
            'Lab Komputer 1 dilengkapi perangkat komputer berperforma tinggi untuk mendukung pembelajaran pemrograman, desain grafis, dan pengembangan aplikasi. Ruangan nyaman dengan pendingin udara serta koneksi internet cepat.',
        img: 'https://placehold.co/800x500/3B82F6/FFFFFF?text=Lab+Komputer+1',
        features: [
            '40 Unit Komputer',
            'AC',
            'Proyektor',
            'Internet Cepat',
        ],
    },
    {
        id: 2,
        name: 'Lab Komputer 2',
        icon: LuMonitor,
        color: 'cyan',
        capacity: '35 Siswa',
        size: '110 m²',
        desc: 'Lab khusus untuk ujian berbasis komputer dan kegiatan IT.',
        descFull:
            'Lab Komputer 2 difokuskan untuk kegiatan Ujian Berbasis Komputer (UBK) serta praktik teknologi informasi. Dilengkapi server lokal dan sistem jaringan yang stabil.',
        img: 'https://placehold.co/800x500/06B6D4/FFFFFF?text=Lab+Komputer+2',
        features: [
            '35 Unit Komputer',
            'Server Lokal',
            'Sistem UBK',
            'Jaringan Stabil',
        ],
    },
    {
        id: 3,
        name: 'Laboratorium IPA',
        icon: LuBeaker,
        color: 'green',
        capacity: '30 Siswa',
        size: '150 m²',
        desc: 'Fasilitas lengkap untuk praktikum biologi, fisika, dan kimia.',
        descFull:
            'Laboratorium IPA menyediakan berbagai alat praktikum modern untuk mendukung pembelajaran Biologi, Fisika, dan Kimia. Dilengkapi fasilitas keamanan standar untuk eksperimen siswa.',
        img: 'https://placehold.co/800x500/10B981/FFFFFF?text=Lab+IPA',
        features: [
            'Alat Praktikum Lengkap',
            'Meja Eksperimen',
            'Peralatan Keamanan',
            'Bahan Praktikum',
        ],
    },
    {
        id: 4,
        name: 'Perpustakaan Digital',
        icon: LuBook,
        color: 'purple',
        capacity: '60 Pengunjung',
        size: '200 m²',
        desc: 'Tempat nyaman untuk membaca dengan koleksi buku fisik & digital.',
        descFull:
            'Perpustakaan Digital menyediakan ribuan koleksi buku fisik dan e-book. Dilengkapi area baca yang nyaman, ruang diskusi, dan akses digital untuk menunjang belajar mandiri.',
        img: 'https://placehold.co/800x500/8B5CF6/FFFFFF?text=Perpustakaan',
        features: [
            'Ribuan Buku',
            'Akses E-Book',
            'Area Baca Nyaman',
            'Ruang Diskusi',
        ],
    },
    {
        id: 5,
        name: 'Kantin Sehat',
        icon: LuUtensils,
        color: 'orange',
        capacity: '150 Siswa',
        size: '250 m²',
        desc: 'Menyediakan makanan sehat dan higienis untuk siswa.',
        descFull:
            'Kantin sekolah menyediakan berbagai pilihan makanan sehat dan bergizi dengan kebersihan yang terjaga. Area makan luas dan nyaman untuk siswa beristirahat.',
        img: 'https://placehold.co/800x500/F97316/FFFFFF?text=Kantin',
        features: [
            'Menu Sehat',
            'Area Bersih',
            'Tempat Duduk Luas',
            'Harga Terjangkau',
        ],
    },
    {
        id: 6,
        name: 'Lapangan Olahraga',
        icon: LuDribbble,
        color: 'red',
        capacity: '100+ Siswa',
        size: '800 m²',
        desc: 'Lapangan multifungsi untuk berbagai kegiatan olahraga.',
        descFull:
            'Lapangan olahraga digunakan untuk berbagai aktivitas seperti basket, futsal, dan voli. Area luas dengan fasilitas pendukung untuk kegiatan olahraga dan ekstrakurikuler.',
        img: 'https://placehold.co/800x500/EF4444/FFFFFF?text=Lapangan',
        features: [
            'Lapangan Basket',
            'Lapangan Futsal',
            'Lapangan Voli',
            'Area Luas',
        ],
    },
    {
        id: 7,
        name: 'Studio Musik',
        icon: LuMusic,
        color: 'pink',
        capacity: '20 Siswa',
        size: '80 m²',
        desc: 'Ruang khusus untuk mengembangkan bakat musik siswa.',
        descFull:
            'Studio musik dilengkapi berbagai alat musik dan peralatan rekaman sederhana untuk mendukung kegiatan ekstrakurikuler dan kreativitas siswa di bidang seni.',
        img: 'https://placehold.co/800x500/EC4899/FFFFFF?text=Studio+Musik',
        features: [
            'Alat Musik Lengkap',
            'Ruang Kedap Suara',
            'Peralatan Rekaman',
            'Ruang Latihan',
        ],
    },
];
