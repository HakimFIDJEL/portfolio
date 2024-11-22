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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('firstname', 50);
            $table->string('lastname', 50);
            $table->string('email', 100)->unique()->index();
            $table->string('password', 60);
            $table->timestamp('password_expires_at')->nullable();
            $table->rememberToken();
            $table->string('user_token', 100)->nullable();
            $table->timestamp('user_token_expires_at')->nullable();
            $table->string('password_token', 100)->nullable();
            $table->timestamp('password_token_expires_at')->nullable();

            $table->string('pfp_url', 200)->nullable();
            $table->string('pfp_extension', 100)->nullable();
            $table->string('pfp_mime', 100)->nullable();
            $table->string('pfp_size', 100)->nullable();


            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        // Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
