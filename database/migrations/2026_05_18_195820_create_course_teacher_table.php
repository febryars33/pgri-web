<?php

use App\Models\Course;
use App\Models\Teacher;
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
        Schema::create('course_teacher', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Course::class)
                ->constrained()
                ->cascadeOnDelete();
            $table->foreignIdFor(Teacher::class)
                ->constrained()
                ->cascadeOnDelete();
            $table->string('code', 20)->unique();
            $table->timestamps();

            $table->unique(['course_id', 'teacher_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('course_teacher');
    }
};
