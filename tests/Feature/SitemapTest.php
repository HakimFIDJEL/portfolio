<?php

use App\Models\User;
use Database\Seeders\BackofficeSeeder;

beforeEach(function () {
    User::factory()->create([
        'name' => 'Hakim Fidjel',
        'email' => 'hakimfidjel.pro@gmail.com',
    ]);
    $this->seed(BackofficeSeeder::class);
});

test('la commande artisan sitemap generate s execute avec succes', function () {
    $this->artisan('sitemap:generate')
        ->assertSuccessful();
});
