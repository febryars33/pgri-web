<?php

namespace Database\Factories;

use App\Enums\PostStatus;
use App\Models\Post;
use App\Models\PostCategory;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Post>
 */
class PostFactory extends Factory
{
    protected static ?array $categoryIds = null;

    public function definition(): array
    {
        static::$categoryIds ??= PostCategory::pluck('id')->toArray();

        $topics = ['Tips Sukses', 'Panduan Belajar', 'Rahasia Efisiensi', 'Penyebab Utama', 'Inovasi Terbaru', 'Cara Mudah'];
        $subjects = ['Laravel Octane', 'Bisnis Online', 'Kesehatan Mental', 'Investasi Kripto', 'Kecerdasan Buatan', 'Gaya Hidup Sehat'];

        $title = fake()->randomElement($topics) . ' ' .
                 fake()->randomElement($subjects) . ' ' .
                 fake()->unique()->words(3, true);

        $title = Str::title($title);

        return [
            'post_category_id' => fake()->randomElement(static::$categoryIds),
            'title'  => $title,
            'slug'   => Str::slug($title), // Pastikan slug ikut di-generate
            'body'   => fake()->realText(1000),
            'image'  => 'https://picsum.photos/' . Str::random(10) . '/800/600',
            'status' => fake()->randomElement(PostStatus::cases()),
            'created_at' => fake()->dateTimeBetween('-1 year', 'now'),
        ];
    }

    /**
     * Hook setelah model berhasil dibuat
     */
    public function configure()
    {
        return $this->afterCreating(function (Post $post) {
            // Ambil beberapa tag acak untuk tiap post
            $availableTags = [
                // Teknologi & Coding
                'Laravel', 'PHP', 'Javascript', 'Reactjs', 'Inertiajs', 'Meilisearch', 'Coding', 'Tutorial', 'Web Development',

                // Edukasi & Sekolah
                'Sekolah', 'Edukasi', 'Prestasi', 'Kurikulum Merdeka', 'Beasiswa', 'Tips Belajar', 'Parenting', 'Kegiatan Siswa',

                // Bisnis & Karir
                'Bisnis', 'Startup', 'UMKM', 'Karir', 'Investasi', 'Keuangan', 'Marketing Digital',

                // Gaya Hidup & Umum
                'Tips', 'Kesehatan', 'Berita Terkini', 'Opini', 'Teknologi', 'Lifestyle', 'Produktivitas', 'Self Improvement'
            ];


            // Ambil 2-3 tag secara acak dari list
            $tags = collect($availableTags)->random(rand(2, 3))->toArray();

            // Tempelkan tag menggunakan method Spatie Tags
            $post->attachTags($tags);
        });
    }
}
