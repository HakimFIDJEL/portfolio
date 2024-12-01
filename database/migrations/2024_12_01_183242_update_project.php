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
        Schema::table('projects', function (Blueprint $table) {
            $table->text('feedback')->nullable()->change();
            $table->string('source_code_url')->nullable()->change();
            $table->string('live_demo_url')->nullable()->change();
            $table->string('timeline_url')->nullable()->change();
            $table->date('end_date')->nullable()->change();


        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->text('feedback')->nullable(false)->change();
            $table->string('source_code_url')->nullable(false)->change();
            $table->string('live_demo_url')->nullable(false)->change();
            $table->string('timeline_url')->nullable(false)->change();
            $table->date('end_date')->nullable(false)->change();
        });
    }
};
