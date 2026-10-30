<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SecurityHeaders
{
    /**
     * Appliquer les en-têtes HTTP de sécurité et masquer les signatures serveur.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Masquer l'en-tête de version PHP
        if (function_exists('header_remove')) {
            header_remove('X-Powered-By');
        }
        $response->headers->remove('X-Powered-By');

        // En environnement local (ex: Vite HMR), autoriser les origines du serveur de dev Vite
        $isLocal = app()->environment('local');
        $viteOrigins = $isLocal ? ' http://localhost:5173 http://127.0.0.1:5173' : '';

        // En-têtes de sécurité HTTP (CentralCSP / OWASP / ANSSI)
        $csp = [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'{$viteOrigins}",
            "style-src 'self' 'unsafe-inline'{$viteOrigins}",
            "img-src 'self' data: https:{$viteOrigins}",
            "font-src 'self' data:{$viteOrigins}",
            "connect-src 'self' ws: wss:{$viteOrigins}",
            "frame-ancestors 'self'",
            "base-uri 'self'",
            "form-action 'self'",
            "object-src 'none'",
        ];

        $response->headers->set('Content-Security-Policy', implode('; ', $csp));
        $response->headers->set('X-Frame-Options', 'SAMEORIGIN');
        $response->headers->set('X-Content-Type-Options', 'nosniff');
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');
        $response->headers->set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

        if ($request->isSecure()) {
            $response->headers->set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
        }

        return $response;
    }
}
