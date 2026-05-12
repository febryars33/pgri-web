<?php

namespace Database\Seeders;

use App\Models\PostCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PostCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Technology', 'Lifestyle', 'Business', 'Education', 'Entertainment', 'Health'
        ];

        foreach ($categories as $category) {
            PostCategory::create([
                'name' => $category,
                'description' => "All about " . $category,
            ]);
        }
    }
}
