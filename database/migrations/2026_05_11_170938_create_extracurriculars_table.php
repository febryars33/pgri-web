<?php

use App\Models\ExtracurricularCategory;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('extracurricular_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('icon')
                ->nullable()
                ->comment('Lucide Icons');
        });

        Schema::create('extracurriculars', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(ExtracurricularCategory::class)
                ->nullable();
            $table->string('name');
            $table->string('slug')->unique();
            $table->longText('description')->nullable();
            $table->string('icon')
                ->comment('Lucide Icons')
                ->nullable();
            $table->json('mentors')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->fullText(['name', 'description']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('extracurricular_categories');
        Schema::dropIfExists('extracurriculars');
    }
};
