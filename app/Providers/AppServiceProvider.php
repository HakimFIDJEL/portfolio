<?php

declare(strict_types=1);

namespace App\Providers;

use Illuminate\Auth\Middleware\Authenticate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Enregistrer les services de l'application.
     */
    public function register(): void
    {
        //
    }

    /**
     * Amorcer les services de l'application.
     */
    public function boot(): void
    {
        Schema::defaultStringLength(191);

        // Personnalisation de la redirection d'authentification
        Authenticate::redirectUsing(function (Request $request): string {
            return redirect()->route('auth.login')->with([
                'error' => [
                    'title' => __('common.flash.error'),
                    'description' => __('auth.flash.middleware.auth_required'),
                ],
            ])->getTargetUrl();
        });

        // Forcer HTTPS en environnement de production
        if (App::environment('production')) {
            URL::forceScheme('https');
        }
    }
}
