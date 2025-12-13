<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Pages content
    |--------------------------------------------------------------------------
    |
    */

    'layout' => [
        'loader' => [
            'loading' => 'Chargement...',
            'intro' => "Salut, c'est Hakim",
        ],
    
        'header' => [
            'contact' => 'Contact',
        ],
    
        'navigation' => [
            'home' => 'Accueil',
            'about' => 'À propos',
            'projects' => 'Projets',
            'sandbox' => 'Bac à sable',
            'contact' => 'Contact',
        ],
        'footer' => [
            'links' => [
                'sitemap' => [
                    'title' => 'Sitemap',
                    'items' => [
                        'home' => 'Accueil',
                        'about' => 'À propos',
                        'projects' => 'Projets',
                        'sandbox' => 'Bac à sable',
                        'contact' => 'Contact',
                    ],
                ],
                'contact' => [
                    'title' => 'Contact',
                    'items' => [
                        'email' => 'Email',
                        'linkedin' => 'LinkedIn',
                        'github' => 'GitHub',
                        'gitlab' => 'GitLab',
                    ],
                ],
                'resources' => [
                    'title' => 'Ressources',
                    'items' => [
                        'terms' => 'Conditions',
                        'source_code' => 'Code source',
                    ],
                ],
            ],
            'caption' => 'Conçu, développé, déployé et hébergé par',
            'copyright' => 'Tous droits réservés.',
        ],
    ],
    
    'landing' => [
        'hero' => [
            'h2' => 'Ingénieur Fullstack',
            'circularText' => 'Bienvenue sur mon portfolio ~ ',
        ],
    
        'about' => [
            'h2' => 'À propos de moi',
            'skip' => 'Passer',
    
            'p_1' => "Salut, c'est Hakim",
            'p_2' => "Je suis un ingénieur fullstack français",
            'p_3' => "avec une forte expertise en développement, infrastructure et automatisation. Je construis et gère des projets évolutifs, assurant des déploiements fluides et des flux de travail efficaces.",
            'p_4' => "Avec une approche pratique, je m'occupe de tout, de la logique backend à l'administration serveur, en accordant toujours une attention particulière au design et à l'utilisabilité. Je m'efforce de créer des solutions à la fois",
            'p_5' => "fonctionnelles et visuellement raffinées.",  
            
            'tabs' => [
                'about' => [
                    'title' => 'À propos de moi',
                    'my_philosophy' => 'Ma philosophie',
                    'quote_1' => "“Viser à construire l'avenir une ligne de code à la fois.”",
                    'quote_2' => "“Ce n'est jamais un bug, c'est une fonctionnalité.”",
                    'quote_3' => "“Mon parcours équilibre expertise dans les outils que je connais et enthousiasme pour ceux que je n'ai pas encore explorés.”",
                    'quote_4' => "“Si ce n'est pas cassé, ne le réparez pas.”",
                    'button' => "Télécharger mon CV",
                ],
                'experience' => [
                    'title' => 'Expérience professionnelle',
                    'description' => "Ces rôles ont affiné ma capacité à fournir des solutions efficaces et innovantes tout en m'adaptant à divers environnements professionnels.",
                ],
                'education' => [
                    'title' => 'Éducation & Diplômes',
                    'description' => "Ces expériences ont façonné mon esprit technique et analytique, me préparant aux défis futurs dans le monde de la technologie.",
                ],
                'tech_stack' => [
                    'title' => 'Stack Technologique',
                ],
                'tools' => [
                    'title' => 'Outils & Logiciels',
                ],
            ],
        ],
    
        'projects' => [
            'h2' => 'Mes Projets',
            'p_1' => "Jetez un œil à mes projets.",
            'p_2' => "J'ai actuellement travaillé sur",
            'p_3' => "projets impactants.",
            'skip' => 'Passer',
        ],
    
        'sandbox' => [
            'h2' => 'Le Bac à Sable',
            'p_1' => 'Mes travaux moins impactants mais tout de même instructifs, j’ai actuellement travaillé sur',
            'p_2' => 'petits projets ici.',
            'skip' => 'Passer',
        ],

        'contact' => [
            'h2' => 'Contact',
            'p_1' => "Faisons connaissance, non ?",
            'p_2' => "Contactez-moi pour parler de projets, d'offres d'emploi, ou même d'une bonne partie de jeu. Je réponds rapidement !",
            'top' => 'Retour en haut',
        ],
    ],

    'projects' => [
        'sections' => [
            'tech_stack' => 'Stack Technologique',
            'description' => 'Description',
            'attachments' => 'Pièces jointes',
            'feedback' => 'Retour',
            'what_i_learned' => "Ce que j'ai appris",
        ],
    ],

    

];