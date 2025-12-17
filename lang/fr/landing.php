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
                        'terms' => 'CGU',
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

        'hero' => [
            'h2' => 'Projet',
        ],

        'sections' => [
            'tech_stack' => 'Stack Technologique',
            'description' => 'Description',
            'attachments' => 'Pièces jointes',
            'feedback' => "Retour d'expérience",
            'what_i_learned' => "Ce que j'ai appris",
            'ongoing' => 'En cours'
        ],
    ],

    'terms' => [
        'h1' => 'Conditions Générales d\'Utilisation',
        'last_updated' => 'Dernière mise à jour : 14 Décembre 2025',
        'sections' => [
            'introduction' => [
                'h2' => 'Introduction',
                'p_1' => 'Bienvenue sur le portfolio de Hakim Fidjel. En accédant à ce site web, vous acceptez d\'être lié par les présentes Conditions Générales d\'Utilisation. Si vous n\'êtes pas d\'accord avec une partie de ces termes, veuillez ne pas utiliser ce site.',
                'p_2' => 'Ce site est une vitrine de mon travail et de mes compétences en tant qu\'ingénieur Fullstack.',
            ],
            'intellectual_property' => [
                'h2' => 'Propriété Intellectuelle',
                'p_1' => 'Tout le contenu de ce portfolio (textes, images, projets, code source visible, etc.) est la propriété exclusive de Hakim Fidjel, sauf indication contraire.',
                'p_2' => 'L\'utilisation, la reproduction, ou la distribution de tout contenu sans autorisation écrite préalable est strictement interdite.',
                'p_3' => 'Le code source du portfolio lui-même est disponible sur GitHub à titre d\'exemple et de référence technique. Cependant, cela ne confère pas de droit d\'utilisation commerciale ou de re-publication sans autorisation explicite.',
            ],
            'limitation_of_liability' => [
                'h2' => 'Limitation de Responsabilité',
                'p_1' => 'Ce site web est fourni "tel quel", sans aucune garantie d\'aucune sorte. Je ne serai en aucun cas responsable des dommages directs, indirects, ou consécutifs découlant de l\'utilisation de ce site ou des informations qu\'il contient.',
            ],
            'contact' => [
                'h2' => 'Contact',
                'p_1' => 'Pour toute question concernant ces Conditions, vous pouvez me contacter via les méthodes listées dans la section Contact de la page d\'Accueil.',
            ],
        ],
    ],

    'seo' => [
        'toggle_accordion' => 'Basculer l’accordéon pour la section :section',
        'carousel_pagination' => 'Aller à la diapositive :slide_number',
        'carousel_next' => 'Aller à la diapositive suivante',
        'carousel_previous' => 'Aller à la diapositive précédente',
        'open_dialog' => 'Ouvrir la fenêtre',
        'close_dialog' => 'Fermer la fenêtre',
        'view_source_code' => 'Voir le code source',
        'view_live_demo' => 'Voir la démo en ligne',
        'discover_more_about_me' => 'En savoir plus sur moi',
        'toggle_appearance' => 'Basculer le mode d’apparence',
        'switch_language' => 'Changer la langue vers :language',
        'scroll_to_top' => 'Remonter en haut de la page',
        'scroll_to_content' => 'Aller au contenu',
        'scroll_to_section' => 'Aller à la section :section',
        'go_to_link' => 'Aller au lien :link',
        'go_to_dashboard' => 'Aller au tableau de bord',
        'toggle_menu' => 'Basculer le menu de navigation',
        'go_to_home' => 'Aller à la page d’accueil',
        'download_resume' => 'Télécharger mon CV',
    ],

];