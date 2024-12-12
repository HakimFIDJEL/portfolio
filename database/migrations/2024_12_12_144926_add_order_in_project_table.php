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
        Schema::table('project_images', function (Blueprint $table) {
            $table->integer('index')->default(0)->after('project_id');
        });
        Schema::table('project_timelines', function (Blueprint $table) {
            $table->integer('index')->default(0)->after('project_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('project_images', function (Blueprint $table) {
            $table->dropColumn('index');
        });
        Schema::table('project_timelines', function (Blueprint $table) {
            $table->dropColumn('index');
        });
    }
};
