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
        Schema::create('tool_categories', function (Blueprint $table) {
            $table->id();
            $table->string('label', 50);
            $table->timestamps();
        });

        Schema::create('tools', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained('tool_categories')->cascadeOnDelete();
            $table->string('label', 50);
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tools');
        Schema::dropIfExists('tool_categories');
    }
};
