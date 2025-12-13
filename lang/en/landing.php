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
            'loading' => 'Loading...',
            'intro' => "Hi, I'm Hakim",
        ],
    
        'header' => [
            'contact' => 'Contact',
        ],
    
        'navigation' => [
            'home' => 'Home',
            'about' => 'About',
            'projects' => 'Projects',
            'sandbox' => 'Sandbox',
            'contact' => 'Contact',
        ],
        'footer' => [
            'links' => [
                'sitemap' => [
                    'title' => 'Sitemap',
                    'items' => [
                        'home' => 'Home',
                        'about' => 'About',
                        'projects' => 'Projects',
                        'sandbox' => 'Sandbox',
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
                    'title' => 'Resources',
                    'items' => [
                        'terms' => 'Terms',
                        'source_code' => 'Source Code',
                    ],
                ],
            ],
            'caption' => 'Designed, Developped, Deployed and Hosted by',
            'copyright' => 'All rights reserved.',
        ],
    ],

    'landing'=> [

        'hero' => [
            'h2' => 'Fullstack Engineer',
            'circularText' => 'Welcome to my portfolio ~ ',
        ],
    
        'about' => [
            'h2' => 'About Me',
            'skip' => 'Skip',
    
            'p_1' => "Hi I'm Hakim",
            'p_2' => "I'm a french fullstack engineer",
            'p_3' => "with a strong focus on development, infrastructure, and automation. I build and manage scalable projects, ensuring smooth deployments and efficient workflows.",
            'p_4' => "With a hands-on approach, I handle everything from backend logic to server administration, always paying attention to design and usability. I strive to create solutions that are both",
            'p_5' => "functional and visually refined.",     
            
            'tabs' => [
                'about' => [
                    'title' => 'About me',
                    'my_philosophy' => 'My Philosophy',
                    'quote_1' => "“Aiming to build the future one line of code at a time.”",
                    'quote_2' => "“It's never a bug, it's a feature.”",
                    'quote_3' => "“My journey balances expertise in tools I know and excitement for those I’ve yet to explore.”",
                    'quote_4' => "“If it’s not broken, do not fix it.”",
                    'button' => "Download my resume",
                ], 
                'experience' => [
                    'title' => 'Work Experience',
                    'description' => 'These roles have sharpened my ability to deliver efficient, innovative solutions while adapting to diverse professional environments.',
                ],
                'education' => [
                    'title' => 'School & Diplomas',
                    'description' => 'These experiences have shaped my technical and analytical mindset, preparing me for future challenges in the tech world.',
                ],
                'tech_stack' => [
                    'title' => 'Tech Stack',
                ],
                'tools' => [
                    'title' => 'Tools & Software',
                ],
            ],
        ],
    
        'projects' => [
            'h2' => 'My Projects',
            'p_1' => "Take a look at my projects.",
            'p_2' => "I've currently worked on",
            'p_3' => "impactful ones.",
            'skip' => 'Skip',
        ],
    
        'sandbox' => [
            'h2' => 'The Sand Box',
            'p_1' => 'My less impactful but still taughtful works, I’ve currently worked on',
            'p_2' => 'small projects here.',
            'skip' => 'Skip',
        ],

        'contact' => [
            'h2' => 'Contact',
            'p_1' => "Let's get in touch shall we ?",
            'p_2' => "Reach out to talk projects, job offers, or even a good game. I'm quick to reply!",
            'top' => 'Back to top',
        ],
    ],

    'projects' => [

        'hero' => [
            'h2' => 'Project',
        ],

        'sections' => [
            'tech_stack' => 'Tech Stack',
            'description' => 'Description',
            'attachments' => 'Attachments',
            'feedback' => 'Feedback',
            'what_i_learned' => 'What I Learned',
            'ongoing' => 'Ongoing',
        ],
    ],
];