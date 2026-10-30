<?php

declare(strict_types=1);

test('les en-tetes http de securite sont presents sur les reponses applicatives', function () {
    $response = $this->get('/');

    $response->assertStatus(200);

    // Vérification de la présence des en-têtes HTTP recommandés
    $response->assertHeader('X-Frame-Options', 'SAMEORIGIN');
    $response->assertHeader('X-Content-Type-Options', 'nosniff');
    $response->assertHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    $response->assertHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

    // Vérification du Content-Security-Policy
    $csp = $response->headers->get('Content-Security-Policy');
    expect($csp)->not->toBeNull()
        ->and($csp)->toContain("default-src 'self'")
        ->and($csp)->toContain("frame-ancestors 'self'")
        ->and($csp)->toContain("base-uri 'self'")
        ->and($csp)->toContain("object-src 'none'");

    // Vérification de l'absence de divulgation de version PHP
    expect($response->headers->has('X-Powered-By'))->toBeFalse();
});

test('les origines vite dev sont autorisees dans le csp en environnement local', function () {
    app()->detectEnvironment(fn () => 'local');

    $response = $this->get('/');
    $csp = $response->headers->get('Content-Security-Policy');

    expect($csp)->toContain('http://localhost:5173')
        ->and($csp)->toContain('http://127.0.0.1:5173');
});
