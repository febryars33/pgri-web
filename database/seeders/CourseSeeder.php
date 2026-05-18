<?php

namespace Database\Seeders;

use App\Models\Course;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    protected array $courses = [
        [
            'code'          =>  'MTK',
            'name'          =>  'Matematika',
            'description'   =>  'Matematika adalah bidang studi yang menemukan dan mengorganisasikan metode, teori dan teorema yang dikembangkan dan dibuktikan untuk kebutuhan ilmu-ilmu empiris (sains) dan matematika itu sendiri. Area matematika mencakup: teori bilangan (studi tentang bilangan), aljabar (studi tentang rumus dan struktur terkait), geometri (studi tentang bentuk dan ruang), analisis (studi tentang perubahan berkelanjutan), dan teori himpunan (sekarang digunakan sebagai fondasi matematika).',
        ],
        [
            'code'          =>  'BHS-INDO',
            'name'          =>  'Bahasa Indonesia',
            'description'   =>  'Bahasa Indonesia ([baˈhasa indoˈnesija]) adalah bahasa resmi dan nasional Indonesia.[16] Bahasa Indonesia merupakan varietas yang dibakukan dari bahasa Melayu,[17] sebuah bahasa rumpun Austronesia yang digolongkan ke dalam rumpun Melayik yang sendirinya merupakan cabang turunan dari cabang Melayu-Polinesia. Bahasa Indonesia telah sejak lama digunakan sebagai basantara di wilayah kepulauan Indonesia yang rata-rata memiliki kemajemukan linguistika. Dengan lebih dari 280 juta penduduk,[18] Indonesia menempati peringkat sebagai negara terpadat keempat di dunia. Menurut sensus tahun 2020, lebih dari 97% orang Indonesia fasih berbahasa Indonesia,[19] ditambah dengan populasi diaspora yang tinggal di luar negeri, menjadikan bahasa Indonesia sebagai bahasa terbesar berdasarkan jumlah penutur di Asia Tenggara dan salah satu bahasa yang paling banyak digunakan atau dituturkan di seluruh dunia.',
        ],
        [
            'code'          =>  'FISIKA',
            'name'          =>  'Fisika',
            'description'   =>  'Fisika adalah ilmu alam yang mempelajari materi[1] beserta gerak dan perilakunya dalam lingkup ruang dan waktu, bersamaan dengan konsep yang berkaitan seperti energi dan gaya.[2] Sebagai salah satu ilmu sains paling dasar, tujuan utama fisika adalah memahami bagaimana alam semesta bekerja.[a][3][4][5] Orang atau ilmuwan yang ahli dalam bidang fisika disebut sebagai ahli fisika atau fisikawan.',
        ],
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach ($this->courses as $course) {
            Course::create($course);
        }
    }
}
