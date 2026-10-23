<?php

use App\Models\User;
use Database\Seeders\BackofficeSeeder;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    User::factory()->create([
        'name' => 'Hakim Fidjel',
        'email' => 'hakimfidjel.pro@gmail.com',
    ]);
    $this->seed(BackofficeSeeder::class);
});

test('la landing page est accessible et rend le composant Inertia landing avec toutes ses props ssr', function () {
    $response = $this->get(route('home'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('landing')
        ->has('contacts')
        ->has('experiences')
        ->has('educations')
        ->has('stacks')
        ->has('tools')
        ->has('projects')
        ->has('sandbox')
    );
});

test('la route landing data retourne la structure json attendue', function () {
    $response = $this->get(route('landing.data'));

    $response->assertOk();
    $response->assertJsonStructure([
        'contacts',
        'experiences',
        'educations',
        'stacks',
        'tools',
        'projects',
        'sandbox',
    ]);
});

test('la page des mentions légales est accessible', function () {
    $response = $this->get(route('terms'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('terms')
    );
});
