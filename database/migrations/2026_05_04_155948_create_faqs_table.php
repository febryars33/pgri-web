<?php

use App\Models\FaqCategory;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('faq_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
        });

        Schema::create('faqs', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(FaqCategory::class)
                ->nullable()
                ->constrained()
                ->nullOnDelete();
            $table->string('title');
            $table->longText('description')->nullable();
            $table->timestamps();

            if (DB::getDriverName() !== 'sqlite') {
                $table->fullText(['title', 'description']);
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('faq_categories');
        Schema::dropIfExists('faqs');
    }
};
