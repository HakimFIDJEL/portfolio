<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\Hash;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $user = User::where('email', 'hakimfidjel.pro@gmail.com')->first();

        if(!$user) {

            User::create([
                'firstname' => 'Hakim',
                'lastname' => 'Fidjel',
                'email' => 'hakimfidjel.pro@gmail.com',
                'password' => Hash::make('password'),
                'password_expires_at' => now()->addyear(),
            ]);
        }

    }
}
