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
            'new' => 'New',
        ],
    ],

    'terms' => [
        'h1' => 'Terms of Use',
        'last_updated' => 'last Updated: December 14, 2025',
        'sections' => [
            'introduction' => [
                'h2' => 'Introduction',
                'p_1' => 'Welcome to Hakim Fidjel\'s portfolio. By accessing this website, you agree to be bound by these Terms of Use. If you disagree with any part of the terms, please do not use this website.',
                'p_2' => 'This site is a showcase of my work and skills as a Fullstack engineer.',
            ],
            'intellectual_property' => [
                'h2' => 'Intellectual Property',
                'p_1' => 'All content on this portfolio (texts, images, projects, visible source code, etc.) is the exclusive property of Hakim Fidjel, unless otherwise indicated.',
                'p_2' => 'The use, reproduction, or distribution of any content without prior written permission is strictly prohibited.',
                'p_3' => 'The source code of the portfolio itself is available on GitHub as an example and technical reference. However, this does not grant rights for commercial use or republication without explicit authorization.',
            ],
            'limitation_of_liability' => [
                'h2' => 'Limitation of Liability',
                'p_1' => 'This website is provided "as is", without any warranties of any kind. I shall not be held responsible for any direct, indirect, or consequential damages arising from the use of this site or the information it contains.',
            ],
            'contact' => [
                'h2' => 'Contact',
                'p_1' => 'For any questions regarding these Terms, you can contact me through the methods listed on the Contact section of the Landing Page.',
            ],
        ],
    ],

    'seo' => [
        'toggle_accordion' => 'Toggle accordion for :section section',
        'carousel_pagination' => 'Go to slide :slide_number',
        'carousel_next' => 'Go to next slide',
        'carousel_previous' => 'Go to previous slide',
        'open_dialog' => 'Open dialog',
        'close_dialog' => 'Close dialog',
        'view_source_code' => 'View source code',
        'view_live_demo' => 'View live demo',
        'discover_more_about_me' => 'Discover more about me',
        'toggle_appearance' => 'Toggle appearance mode',
        'switch_language' => 'Switch language to :language',
        'scroll_to_top' => 'Scroll to top of the page',
        'scroll_to_content' => 'Scroll to content',
        'scroll_to_section' => 'Scroll to :section section',
        'go_to_link' => 'Go to :link link',
        'go_to_dashboard' => 'Go to dashboard',
        'toggle_menu' => 'Toggle navigation menu',
        'go_to_home' => 'Go to home page',
        'download_resume' => 'Download my resume',
    ],
];