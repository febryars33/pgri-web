<?php

namespace Database\Factories;

use App\Models\Extracurricular;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Extracurricular>
 */
class ExtracurricularFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id' => $this->faker->numberBetween(1, 1000),
            'extracurricular_category_id' => $this->faker->numberBetween(1, 1000),
            'name' => fake()->name(),
            'slug' => $this->faker->text(),
            'description' => $this->faker->paragraph(),
            'icon' => $this->faker->text(),
            'is_active' => fake()->text(),
        ];
    }
}
