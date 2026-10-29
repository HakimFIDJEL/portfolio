<?php

declare(strict_types=1);

use App\Models\User;
use Database\Seeders\BackofficeSeeder;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    User::factory()->create([
        'name' => 'Hakim Fidjel',
        'email' => 'hakimfidjel.pro@gmail.com',
    ]);
    $this->seed(BackofficeSeeder::class);
});

test('tous les fichiers de langue en et fr sont parfaitement symetriques', function () {
    $files = ['app', 'auth', 'common', 'dashboard', 'landing', 'pagination', 'settings', 'validation'];

    foreach ($files as $file) {
        $enPath = lang_path("en/{$file}.php");
        $frPath = lang_path("fr/{$file}.php");

        expect(file_exists($enPath))->toBeTrue("Le fichier {$enPath} doit exister");
        expect(file_exists($frPath))->toBeTrue("Le fichier {$frPath} doit exister");

        $en = require $enPath;
        $fr = require $frPath;

        $flatEn = array_keys(Arr::dot($en));
        $flatFr = array_keys(Arr::dot($fr));

        $missingInFr = array_diff($flatEn, $flatFr);
        $missingInEn = array_diff($flatFr, $flatEn);

        expect($missingInFr)->toBeEmpty("Cles manquantes en FR pour {$file}: ".implode(', ', $missingInFr));
        expect($missingInEn)->toBeEmpty("Cles en trop en FR non presentes en EN pour {$file}: ".implode(', ', $missingInEn));
    }
});

test('le middleware HandleInertiaRequests optimise les props de traductions et le cache serveur', function () {
    Cache::flush();

    // 1. Requete en session anglaise (locale == fallback_locale)
    $responseEn = $this->withSession(['locale' => 'en'])->get(route('home'));

    $responseEn->assertOk();
    $responseEn->assertInertia(fn (Assert $page) => $page
        ->component('landing')
        ->where('locale', 'en')
        ->where('fallback_locale', 'en')
        ->has('translations.landing')
        ->has('translations.common')
        ->has('translations.auth')
        ->where('translations_fallback', [])
    );

    expect(Cache::has('translations_en'))->toBeTrue();

    // 2. Requete en session francaise (locale != fallback_locale)
    $responseFr = $this->withSession(['locale' => 'fr'])->get(route('home'));

    $responseFr->assertOk();
    $responseFr->assertInertia(fn (Assert $page) => $page
        ->component('landing')
        ->where('locale', 'fr')
        ->where('fallback_locale', 'en')
        ->has('translations.landing')
        ->has('translations.common')
        ->has('translations.auth')
        ->has('translations_fallback.landing')
        ->has('translations_fallback.common')
    );

    expect(Cache::has('translations_fr'))->toBeTrue();
    expect(Cache::has('translations_fallback_en'))->toBeTrue();
});
