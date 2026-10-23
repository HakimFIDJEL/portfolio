<?php

declare(strict_types=1);

return [

    /*
    |--------------------------------------------------------------------------
    | Flash messages
    |--------------------------------------------------------------------------
    |
    */

    /*
    |--------------------------------------------------------------------------
    | Pages content
    |--------------------------------------------------------------------------
    |
    */

    'layout' => [
        'sidebar' => [
            'menugroups' => [
                'platform' => [
                    'title' => 'Plateforme',
                    'items' => [
                        'dashboard' => 'Tableau de bord',
                    ],
                ],
                'footer' => [
                    'title' => '',
                    'items' => [
                        'repository' => 'Dépôt',
                        'documentation' => 'Documentation',
                    ],
                ],
            ],
            'usermenu' => [
                'items' => [
                    'notifications' => 'Notifications',
                    'settings' => 'Paramètres',
                    'logout' => 'Déconnexion',
                ],
            ],
        ],
    ],

];
