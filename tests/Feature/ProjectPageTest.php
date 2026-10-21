<?php

use App\Models\Backoffice\Project;
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

test('une page projet est accessible avec son slug et rend le composant project', function () {
    $project = Project::where('type', 'project')->first();
    expect($project)->not->toBeNull();

    $response = $this->withSession(['locale' => 'fr'])->get(route('project', ['slug' => $project->slug_fr]));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('project')
        ->has('project')
    );
});

test('un slug dans une autre langue redirige vers le slug de la langue active', function () {
    $project = Project::where('type', 'project')->first();
    expect($project)->not->toBeNull();

    // Session en français, mais requête avec le slug anglais
    $response = $this->withSession(['locale' => 'fr'])->get(route('project', ['slug' => $project->slug_en]));

    $response->assertRedirect(route('project', ['slug' => $project->slug_fr]));
});

test('un slug inexistant retourne une erreur 404', function () {
    $response = $this->get('/slug-inexistant-totalement-inconnu');

    $response->assertNotFound();
});
