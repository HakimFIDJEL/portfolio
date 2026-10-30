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
            'services' => 'Services',
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
                        'services' => 'Services',
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

        'meta_title' => 'Hakim Fidjel — Ingénieur Logiciel',
        'meta_description' => "Portfolio de Hakim Fidjel, ingénieur logiciel et ingénieur fullstack indépendant. Conception d'architectures applicatives robustes, systèmes agentiques, ingénierie web moderne et solutions logicielles évolutives.",

        'hero' => [
            'h2' => 'Ingénieur Logiciel',
            'circularText' => 'Bienvenue sur mon portfolio ~ ',
        ],

        'about' => [
            'h2' => 'À propos de moi',
            'skip' => 'Passer',

            'p_1' => "Salut, c'est Hakim",
            'p_2' => 'Je suis ingénieur logiciel,',
            'p_3' => "spécialisé dans la conception d'architectures applicatives robustes, l'automatisation et l'ingénierie backend. Je conçois des systèmes résilients, performants et pensés pour évoluer dans la durée.",
            'p_4' => "De la modélisation métier jusqu'à l'infrastructure conteneurisée, j'accorde une exigence constante à la rigueur du code, à la clarté des interfaces et à l'ergonomie utilisateur. Mon objectif est de bâtir des solutions logicielles",
            'p_5' => 'hautement fiables et visuellement soignées.',

            'tabs' => [
                'about' => [
                    'title' => 'À propos de moi',
                    'photo_alt' => 'Photo de Hakim Fidjel',
                    'status_badge' => 'Disponible',
                    'tag' => 'Manifeste & Démarche',
                    'statement' => 'Bâtir des architectures logicielles pérennes, où la clarté et la rigueur priment sur la complexité inutile.',
                    'bio_1' => "Ingénieur logiciel en poste et ingénieur fullstack indépendant, je conçois des systèmes web complets avec une vision de bout en bout. De la modélisation des données et la conteneurisation jusqu'au raffinement ergonomique de l'interface, chaque décision technique répond à un impératif de fiabilité et d'efficacité mesurable.",
                    'bio_2' => "Mon travail s'articule autour du pragmatisme : rejeter la sur-ingénierie, privilégier un code typé, testé et documenté, et livrer des applications immédiatement maintenables par n'importe quelle équipe technique sans accumuler de dette invisible.",
                    'principles' => [
                        'label' => 'Principes d\'ingénierie',
                        'p1_num' => '01',
                        'p1_title' => 'Rigueur de conception',
                        'p1_desc' => 'Typage strict de bout en bout, suites de tests automatisées et architecture modulaire.',
                        'p2_num' => '02',
                        'p2_title' => 'Sobriété & Vitesse',
                        'p2_desc' => 'Dépendances maîtrisées, bundles optimisés et conformité stricte aux standards web.',
                        'p3_num' => '03',
                        'p3_title' => 'Transparence totale',
                        'p3_desc' => 'Communication directe, cadrage réaliste des engagements et suivi continu sans promesses creuses.',
                    ],
                    'specs' => [
                        'status_label' => 'Statut',
                        'status_val' => 'Ingénieur Logiciel & Indépendant',
                        'location_label' => 'Localisation',
                        'location_val' => 'Lille',
                        'availability_label' => 'Disponibilité',
                        'availability_val' => 'Missions & Collaborations',
                        'stack_label' => 'Écosystème',
                        'stack_val' => 'Laravel · React · TypeScript · Docker',
                    ],
                    'button' => 'Consulter mon CV complet',
                ],
                'experience' => [
                    'title' => 'Expérience professionnelle',
                    'description' => "Des environnements variés allant de l'ingénierie logicielle avancée aux projets web sur mesure, forgeant rigueur opérationnelle et sens du produit.",
                ],
                'education' => [
                    'title' => 'Formation & Diplômes',
                    'description' => "Un cursus d'ingénieur rigoureux complété par des certifications internationales, forgeant une approche analytique et pragmatique de la résolution de problèmes.",
                ],
                'tech_stack' => [
                    'title' => 'Stack Technologique',
                ],
                'tools' => [
                    'title' => 'Outils & Logiciels',
                ],
            ],
        ],

        'services' => [
            'h2' => 'Services',
            'skip' => 'Passer',
            'items' => [
                'fullstack' => [
                    'title' => 'Applications & Plateformes Web',
                    'description' => "Conception et développement d'applications web complètes, rapides et sur-mesure. Des interfaces utilisateur soignées et réactives, soutenues par une architecture technique robuste, sécurisée et évolutive.",
                    'actions_label' => 'Réalisations & livrables',
                    'action_1' => 'Applications web métiers, portails clients et dashboards interactifs',
                    'action_2' => 'Conception d\'architectures backend sécurisées et intégration d\'APIs',
                    'action_3' => 'Expérience utilisateur fluide, responsive sans compromis et accessible',
                ],
                'devops' => [
                    'title' => 'Automatisation, CI/CD & Déploiement',
                    'description' => 'Fiabilisation de vos cycles de livraison et industrialisation de vos flux techniques. Mise en place de pipelines modernes pour livrer fréquemment, tester systématiquement et éliminer les erreurs manuelles en production.',
                    'actions_label' => 'Réalisations & livrables',
                    'action_1' => 'Déploiements continus fiabilisés et environnements prêts pour la production',
                    'action_2' => 'Automatisation des suites de tests et des contrôles de qualité logicielle',
                    'action_3' => 'Conception de scripts d\'automatisation sur-mesure et optimisation des workflows',
                ],
                'audit' => [
                    'title' => 'Audit, Résolution & Conseil Technique',
                    'description' => 'Diagnostic ciblé, remise à niveau et optimisation de projets existants. Intervention réactive sur des blocages critiques, refactorisation de code complexe et accompagnement pragmatique sur vos choix d\'architecture.',
                    'actions_label' => 'Réalisations & livrables',
                    'action_1' => 'Diagnostic rapide et correction d\'anomalies critiques en production',
                    'action_2' => 'Réduction de dette technique, modernisation de code et refactoring',
                    'action_3' => 'Optimisation des temps de chargement, audits de conformité et cadrage technique',
                ],
            ],
            'cta' => [
                'title' => 'Un projet à concrétiser ou un défi technique à relever ?',
                'description' => "Échangeons sur vos objectifs pour définir ensemble le périmètre d'intervention le plus adapté à vos besoins et à vos délais.",
                'button' => 'Démarrer un projet',
            ],
        ],

        'projects' => [
            'h2' => 'Mes Projets',
            'p_1' => 'Découvrez une sélection de mes réalisations logicielles.',
            'p_2' => 'Conception et mise en production de',
            'p_3' => 'projets applicatifs majeurs.',
            'skip' => 'Passer',
        ],

        'sandbox' => [
            'h2' => 'Le Bac à Sable',
            'p_1' => "Espace d'expérimentation technique, de prototypes et d'explorations conceptuelles :",
            'p_2' => "projets et bancs d'essai documentés.",
            'skip' => 'Passer',
        ],

        'contact' => [
            'h2' => 'Contact',
            'p_1' => 'Un projet ou un échange technique en perspective ?',
            'p_2' => "Disponible pour échanger autour d'architectures logicielles, d'opportunités d'ingénierie ou de collaborations techniques. Réponse assurée sous 24h.",
            'top' => 'Retour en haut',
            'mail_subject' => 'Prise de contact — Projet / Mission',
        ],
    ],

    'projects' => [
        'new' => 'Nouveau',

        'hero' => [
            'h2' => 'Projet',
        ],

        'sections' => [
            'tech_stack' => 'Stack Technologique',
            'description' => 'Description',
            'attachments' => 'Pièces jointes',
            'feedback' => "Retour d'expérience",
            'what_i_learned' => "Ce que j'ai appris",
            'ongoing' => 'En cours',
            'new' => 'Nouveau',
        ],

        'go_back' => 'Retour aux projets',
    ],

    'terms' => [
        'h1' => 'Conditions Générales d\'Utilisation',

        'meta_description' => 'Lisez les conditions générales d\'utilisation du site portfolio de Hakim Fidjel, qui décrivent les règles et directives pour accéder et utiliser le site.',

        'last_updated' => 'Dernière mise à jour : 25 Octobre 2026',
        'sections' => [
            'introduction' => [
                'h2' => 'Introduction',
                'p_1' => 'Bienvenue sur le portfolio de Hakim Fidjel. En accédant à ce site web, vous acceptez d\'être lié par les présentes Conditions Générales d\'Utilisation. Si vous n\'êtes pas d\'accord avec une partie de ces termes, veuillez ne pas utiliser ce site.',
                'p_2' => 'Ce site est une vitrine de mon travail et de mes compétences en tant qu\'ingénieur logiciel.',
            ],
            'legal_mentions' => [
                'h2' => 'Mentions Légales',
                'p_1' => 'Éditeur du site : Hakim Fidjel EI (Entrepreneur Individuel), immatriculé au RNE sous le numéro SIREN 131 784 266 (SIRET : 131 784 266 00010 — Code APE : 6201Z, Programmation informatique).',
                'p_2' => 'Siège social : 8 Rue Alfred Nobel, 59240 Dunkerque, France — Contact : hakimfidjel.pro@gmail.com / +33 (0)6 95 07 44 17.',
                'p_3' => 'Régime fiscal : Franchise en base de TVA (Article 293 B du Code Général des Impôts). TVA non applicable.',
                'p_4' => 'Hébergement : Site hébergé via architecture conteneurisée Docker sur infrastructure dédiée.',
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
        'toggle_mouse_pointer' => 'Activer/Désactiver les effets visuels du curseur',
        'switch_language' => 'Changer la langue vers :language',
        'scroll_to_top' => 'Remonter en haut de la page',
        'scroll_to_content' => 'Aller au contenu',
        'skip_to_content' => 'Passer au contenu principal',
        'scroll_to_section' => 'Aller à la section :section',
        'go_to_link' => 'Aller au lien :link',
        'go_to_dashboard' => 'Aller au tableau de bord',
        'toggle_menu' => 'Basculer le menu de navigation',
        'go_to_home' => 'Aller à la page d’accueil',
        'download_resume' => 'Télécharger mon CV',
    ],

];
