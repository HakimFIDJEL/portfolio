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

test('la route toggle-language bascule la session de langue', function () {
    $response = $this->withSession(['locale' => 'en'])->get(route('toggle_language'));

    $response->assertRedirect();
    $response->assertSessionHas('locale', 'fr');

    $response2 = $this->withSession(['locale' => 'fr'])->get(route('toggle_language'));

    $response2->assertRedirect();
    $response2->assertSessionHas('locale', 'en');
});

test('la route toggle-language permet de definir une langue specifique', function () {
    $response = $this->withSession(['locale' => 'fr'])->get(route('toggle_language', ['locale' => 'fr']));
    $response->assertRedirect();
    $response->assertSessionHas('locale', 'fr');

    $response2 = $this->withSession(['locale' => 'fr'])->get(route('toggle_language', ['locale' => 'en']));
    $response2->assertRedirect();
    $response2->assertSessionHas('locale', 'en');
});
