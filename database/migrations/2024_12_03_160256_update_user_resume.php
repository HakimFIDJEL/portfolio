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
        Schema::table('users', function (Blueprint $table) {
            $table->text('resume_label')->nullable();
            $table->text('resume_path')->nullable();
            $table->text('resume_ext')->nullable();
            $table->text('resume_size')->nullable();
            $table->text('resume_type')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('resume_label');
            $table->dropColumn('resume_path');
            $table->dropColumn('resume_ext');
            $table->dropColumn('resume_size');
            $table->dropColumn('resume_type');
        });
    }
};
