<?php

declare(strict_types=1);

use App\Models\Backoffice\Project;
use App\Models\User;
use Database\Seeders\BackofficeSeeder;

beforeEach(function () {
    User::factory()->create([
        'name' => 'Hakim Fidjel',
        'email' => 'hakimfidjel.pro@gmail.com',
    ]);
    $this->seed(BackofficeSeeder::class);
});

test('le code html de base contient les balises seo, opengraph et twitter cards', function () {
    $response = $this->get(route('home'));

    $response->assertOk();
    $response->assertSee('<meta property="og:site_name"', false);
    $response->assertSee('<meta property="og:type" content="website"', false);
    $response->assertSee('<meta name="twitter:card" content="summary_large_image"', false);
    $response->assertSee('<meta name="author" content="Hakim Fidjel"', false);
    $response->assertSee('rel="preload"', false);
    $response->assertSee('as="font"', false);
    $response->assertSee('type="font/woff2"', false);
});

test('la page projet retourne un statut 200 avec le composant inertia project', function () {
    $project = Project::first();
    expect($project)->not->toBeNull();

    $response = $this->get(route('project', ['slug' => $project->slug]));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('project')
        ->has('project')
    );
});
