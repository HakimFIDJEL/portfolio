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
            'services' => 'Services',
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
                        'services' => 'Services',
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

        'meta_title' => 'Hakim Fidjel — Software Engineer',
        'meta_description' => 'Portfolio of Hakim Fidjel, Software Engineer and independent fullstack engineer. Designing robust software architectures, agentic systems, modern web engineering, and scalable platforms.',

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
                    'photo_alt' => 'Photo of Hakim Fidjel',
                    'status_badge' => 'Available',
                    'tag' => 'Manifesto & Approach',
                    'statement' => 'Building resilient software architectures where clarity and craftsmanship prevail over unnecessary complexity.',
                    'bio_1' => 'Software engineer and independent fullstack engineer, I design end-to-end web systems with an exhaustive technical scope. From database modeling and containerization to refined UI engineering, every technical choice serves measurable reliability and efficiency.',
                    'bio_2' => 'My approach is grounded in pragmatism: avoiding over-engineering, favoring typed, tested, and documented codebases, and delivering applications that remain instantly maintainable without latent technical debt.',
                    'principles' => [
                        'label' => 'Engineering Principles',
                        'p1_num' => '01',
                        'p1_title' => 'Design Rigor',
                        'p1_desc' => 'Strict end-to-end typing, automated testing suites, and modular architecture.',
                        'p2_num' => '02',
                        'p2_title' => 'Performance & Restraint',
                        'p2_desc' => 'Lean dependencies, optimized bundles, and strict adherence to web standards.',
                        'p3_num' => '03',
                        'p3_title' => 'Clear Transparency',
                        'p3_desc' => 'Direct technical communication, realistic milestones, and continuous tracking.',
                    ],
                    'specs' => [
                        'status_label' => 'Status',
                        'status_val' => 'Software Engineer & Independent',
                        'location_label' => 'Location',
                        'location_val' => 'Lille, France',
                        'availability_label' => 'Availability',
                        'availability_val' => 'Select Projects & Advisory',
                        'stack_label' => 'Core Ecosystem',
                        'stack_val' => 'Laravel · React · TypeScript · Docker',
                    ],
                    'button' => 'View Full Resume',
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

        'services' => [
            'h2' => 'Services',
            'skip' => 'Skip',
            'items' => [
                'fullstack' => [
                    'title' => 'Web Applications & Platforms',
                    'description' => 'Engineering comprehensive, fast, and custom web applications. Polished and responsive user interfaces backed by robust, secure, and scalable technical architecture.',
                    'actions_label' => 'Deliverables & capabilities',
                    'action_1' => 'Custom business web apps, client portals, and interactive dashboards',
                    'action_2' => 'Secure backend architecture design and RESTful API integrations',
                    'action_3' => 'Seamless, uncompromised responsive UX with accessibility standards',
                ],
                'devops' => [
                    'title' => 'Automation, CI/CD & Deployment',
                    'description' => 'Streamlining delivery lifecycles and standardizing technical workflows. Building modern deployment pipelines to release frequently, test systematically, and eliminate manual production errors.',
                    'actions_label' => 'Deliverables & capabilities',
                    'action_1' => 'Reliable continuous deployment and production-ready environments',
                    'action_2' => 'Automated test suites and continuous software quality checks',
                    'action_3' => 'Custom automation scripts and workflow optimization',
                ],
                'audit' => [
                    'title' => 'Audit, Resolution & Technical Advisory',
                    'description' => 'Targeted diagnosis, codebase upgrading, and performance tuning. Swift intervention on critical blockers, complex code refactoring, and pragmatic architecture consulting.',
                    'actions_label' => 'Deliverables & capabilities',
                    'action_1' => 'Rapid diagnosis and resolution of critical production defects',
                    'action_2' => 'Technical debt reduction, code modernization, and refactoring',
                    'action_3' => 'Load time optimization, compliance audits, and architectural scoping',
                ],
            ],
            'cta' => [
                'title' => 'A project to build or a technical challenge to solve?',
                'description' => 'Let’s discuss your goals to define the optimal scope of work aligned with your needs and timeline.',
                'button' => 'Start a project',
            ],
        ],

        'projects' => [
            'h2' => 'My Projects',
            'p_1' => 'Explore a curated selection of my software accomplishments.',
            'p_2' => 'Architected and delivered',
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
            'p_1' => 'Have a project or a technical challenge to discuss?',
            'p_2' => 'Open to discussing software architectures, engineering opportunities, and technical collaborations. I typically respond within 24 hours.',
            'top' => 'Back to top',
            'mail_subject' => 'Contact Inquiry — Project / Mission',
        ],
    ],

    'projects' => [
        'new' => 'New',

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
            'legal_mentions' => [
                'h2' => 'Legal Mentions',
                'p_1' => 'Website Publisher: Hakim Fidjel EI (Sole Proprietorship), registered at the French RNE under SIREN 131 784 266 (SIRET: 131 784 266 00010 — APE Code: 6201Z, Computer programming).',
                'p_2' => 'Headquarters: 8 Rue Alfred Nobel, 59240 Dunkerque, France — Contact: hakimfidjel.pro@gmail.com / +33 (0)6 95 07 44 17.',
                'p_3' => 'Tax regime: VAT exemption under Article 293 B of the French General Tax Code (CGI). VAT not applicable.',
                'p_4' => 'Hosting: Hosted through Docker containerized architecture on dedicated production infrastructure.',
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
