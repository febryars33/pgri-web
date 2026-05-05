<?php

use App\Enums\PostStatus;
use App\Models\PostCategory;
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
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(PostCategory::class)
                ->nullable()
                ->constrained()
                ->nullOnDelete();
            $table->string('title');
            $table->mediumText('body')->nullable();
            $table->string('image')->nullable();
            $table->enum('status', PostStatus::cases())->default(PostStatus::DRAFT);
            $table->string('slug')->unique();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
