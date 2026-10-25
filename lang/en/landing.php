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
            'caption' => 'Designed, Developed, Deployed and Hosted by',
            'copyright' => 'All rights reserved.',
        ],
    ],

    'landing' => [

        'meta_description' => "Hakim Fidjel's portfolio, Software Engineer. Designing robust software architectures, agentic systems, modern web engineering, and scalable platforms.",

        'hero' => [
            'h2' => 'Software Engineer',
            'circularText' => 'Welcome to my portfolio ~ ',
        ],

        'about' => [
            'h2' => 'About Me',
            'skip' => 'Skip',

            'p_1' => "Hi I'm Hakim",
            'p_2' => "I'm a software engineer,",
            'p_3' => 'specialized in robust application architecture, backend engineering, and system automation. I build scalable, resilient platforms designed to evolve seamlessly over time.',
            'p_4' => 'From domain modeling to containerized infrastructure, I bring continuous rigor to code quality, interface clarity, and user experience. I strive to engineer software solutions that are both',
            'p_5' => 'technically sound and visually refined.',

            'tabs' => [
                'about' => [
                    'title' => 'About me',
                    'my_philosophy' => 'My Philosophy',
                    'quote_1' => '“Aiming to build the future one line of code at a time.”',
                    'quote_2' => "“It's never a bug, it's a feature.”",
                    'quote_3' => '“My journey balances expertise in tools I know and excitement for those I’ve yet to explore.”',
                    'quote_4' => '“If it’s not broken, do not fix it.”',
                    'button' => 'Download my resume',
                ],
                'experience' => [
                    'title' => 'Work Experience',
                    'description' => 'Diverse environments ranging from advanced software engineering to tailored web platforms, driving operational rigor and product mindset.',
                ],
                'education' => [
                    'title' => 'Education & Degrees',
                    'description' => 'A rigorous engineering curriculum complemented by international certifications, shaping an analytical and pragmatic approach to problem-solving.',
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
            'p_1' => 'Explore a curated selection of my software accomplishments.',
            'p_2' => "Architected and delivered",
            'p_3' => 'major production projects.',
            'skip' => 'Skip',
        ],

        'sandbox' => [
            'h2' => 'The Sand Box',
            'p_1' => 'Experimental grounds, technical proofs of concept, and exploratory tools:',
            'p_2' => 'documented lab projects.',
            'skip' => 'Skip',
        ],

        'contact' => [
            'h2' => 'Contact',
            'p_1' => "Have a project or a technical challenge to discuss?",
            'p_2' => "Open to discussing software architectures, engineering opportunities, and technical collaborations. I typically respond within 24 hours.",
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

        'go_back' => 'Go back to projects',
    ],

    'terms' => [
        'h1' => 'Terms of Use',
        'meta_description' => 'Read the terms of use for Hakim Fidjel\'s portfolio website, outlining the rules and guidelines for accessing and using the site.',
        'last_updated' => 'Last updated: October 25, 2026',
        'sections' => [
            'introduction' => [
                'h2' => 'Introduction',
                'p_1' => 'Welcome to Hakim Fidjel\'s portfolio. By accessing this website, you agree to be bound by these Terms of Use. If you disagree with any part of the terms, please do not use this website.',
                'p_2' => 'This website is a showcase of my work and skills as a Software Engineer.',
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
        'toggle_mouse_pointer' => 'Toggle cursor visual effects',
        'switch_language' => 'Switch language to :language',
        'scroll_to_top' => 'Scroll to top of the page',
        'scroll_to_content' => 'Scroll to content',
        'skip_to_content' => 'Skip to main content',
        'scroll_to_section' => 'Scroll to :section section',
        'go_to_link' => 'Go to :link link',
        'go_to_dashboard' => 'Go to dashboard',
        'toggle_menu' => 'Toggle navigation menu',
        'go_to_home' => 'Go to home page',
        'download_resume' => 'Download my resume',
    ],
];
