<?php

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
        Schema::create('stack_categories', function (Blueprint $table) {
            $table->id();
            $table->string('label', 50);
            $table->timestamps();
        });

        Schema::table('stacks', function (Blueprint $table) {
            $table->foreignId('category_id')->constrained('stack_categories')->cascadeOnDelete();
            $table->dropColumn('category');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stack_categories');

        Schema::table('stacks', function (Blueprint $table) {
            $table->string('category', 100);
            $table->dropForeign(['category_id']);
            $table->dropColumn('category_id');
        });
    }
};
