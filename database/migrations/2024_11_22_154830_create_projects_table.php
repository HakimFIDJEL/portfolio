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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('slug', 100)->unique()->index();
            $table->string('title', 100);
            $table->string('subtitle', 100);
            $table->date('end_date');
            $table->text('description')->nullable();
            $table->text('feedback')->nullable();

            $table->string('source_code_url', 100)->nullable();
            $table->string('live_demo_url', 100)->nullable();
            $table->string('timeline_url', 100)->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
