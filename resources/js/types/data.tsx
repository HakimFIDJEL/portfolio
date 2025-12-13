import type {
    Attachment,
    Contact,
    Education,
    Experience,
    Project,
    Stack,
    Tag,
    Tool,
} from '@/types';

// --------------------------------
// Mocks
// --------------------------------

export const mockTags: Tag[] = [
    {
        id: 1,
        sort_order: 1,
        name: 'Mobile Application',
    },
    {
        id: 2,
        sort_order: 2,
        name: 'Web Application',
    },
    {
        id: 3,
        sort_order: 3,
        name: 'Website',
    },
    {
        id: 4,
        sort_order: 4,
        name: 'API',
    },
    {
        id: 5,
        sort_order: 5,
        name: 'Script',
    }
];

export const mockStacks: Stack[] = [
    {
        id: 1,
        sort_order: 1,
        name: '',
        name_fr: 'Frontend',
        name_en: 'Frontend',
        items: [
            {
                id: 1,
                sort_order: 1,
                name: 'HTML',
            },
            {
                id: 2,
                sort_order: 2,
                name: 'CSS',
            },
            {
                id: 3,
                sort_order: 3,
                name: 'SCSS',
            },
            {
                id: 4,
                sort_order: 4,
                name: 'Tailwind',
            },
            {
                id: 5,
                sort_order: 5,
                name: 'JavaScript',
            },
            {
                id: 6,
                sort_order: 6,
                name: 'TypeScript',
            },
            {
                id: 7,
                sort_order: 7,
                name: 'React',
            },
            {
                id: 8,
                sort_order: 8,
                name: 'jQuery',
            },
            {
                id: 9,
                sort_order: 9,
                name: 'Next.js',
            },
        ],
    },
    {
        id: 2,
        sort_order: 2,
        name: '',
        name_fr: 'Backend',
        name_en: 'Backend',
        items: [
            {
                id: 1,
                sort_order: 1,
                name: 'PHP',
            },
            {
                id: 2,
                sort_order: 2,
                name: 'Laravel',
            },
            {
                id: 3,
                sort_order: 3,
                name: 'OctoberCMS',
            },
            {
                id: 4,
                sort_order: 4,
                name: 'Node.js',
            },
            {
                id: 5,
                sort_order: 5,
                name: 'NestJS',
            },
            {
                id: 6,
                sort_order: 6,
                name: 'Express.js',
            },
            {
                id: 7,
                sort_order: 7,
                name: 'Inertia.js',
            },
        ],
    },
    {
        id: 3,
        sort_order: 3,
        name: '',
        name_en: 'Databases',
        name_fr: 'Bases de données',
        items: [
            {
                id: 1,
                sort_order: 1,
                name: 'MySQL',
            },
            {
                id: 2,
                sort_order: 2,
                name: 'PostgreSQL',
            },
            {
                id: 3,
                sort_order: 3,
                name: 'PL/SQL',
            },
            {
                id: 4,
                sort_order: 4,
                name: 'NoSQL',
            },
            {
                id: 5,
                sort_order: 5,
                name: 'SQLite',
            },
            {
                id: 6,
                sort_order: 6,
                name: 'MongoDB',
            },
        ],
    },
    {
        id: 4,
        sort_order: 4,
        name: '',
        name_en: 'Software',
        name_fr: 'Logiciel',
        items: [
            {
                id: 1,
                sort_order: 1,
                name: 'C',
            },
            {
                id: 2,
                sort_order: 2,
                name: 'Java',
            },
            {
                id: 3,
                sort_order: 3,
                name: 'Python',
            },
            {
                id: 4,
                sort_order: 4,
                name: 'Bash',
            },
        ],
    },
    {
        id: 5,
        sort_order: 5,
        name: '',
        name_en: 'Mobile',
        name_fr: 'Mobile',
        items: [
            {
                id: 1,
                sort_order: 1,
                name: 'React Native',
            },
            {
                id: 2,
                sort_order: 2,
                name: 'Flutter',
            },
            {
                id: 3,
                sort_order: 3,
                name: 'Kotlin',
            },
        ],
    },
];

export const mockTools: Tool[] = [
    {
        id: 1,
        sort_order: 1,
        name: '',
        name_en: 'IDE',
        name_fr: 'IDE',
        items: [
            {
                id: 1,
                sort_order: 1,
                name: 'VS Code',
            },
            {
                id: 2,
                sort_order: 2,
                name: 'Visual Studio',
            },
            {
                id: 3,
                sort_order: 3,
                name: 'Sublime Text',
            },
            {
                id: 4,
                sort_order: 4,
                name: 'Notepad++',
            },
            {
                id: 5,
                sort_order: 5,
                name: 'Nano',
            },
            {
                id: 6,
                sort_order: 6,
                name: 'Vim',
            },
            {
                id: 7,
                sort_order: 7,
                name: 'PhpStorm',
            },
            {
                id: 8,
                sort_order: 8,
                name: 'IntelliJ IDEA',
            },
            {
                id: 9,
                sort_order: 9,
                name: 'PyCharm',
            },
        ],
    },
    {
        id: 2,
        sort_order: 2,
        name: '',
        name_en: 'DevOps',
        name_fr: 'DevOps',
        items: [
            {
                id: 1,
                sort_order: 1,
                name: 'Docker',
            },
            {
                id: 2,
                sort_order: 2,
                name: 'Git',
            },
            {
                id: 3,
                sort_order: 3,
                name: 'GitHub Actions',
            },
            {
                id: 4,
                sort_order: 4,
                name: 'CI/CD',
            },
            {
                id: 5,
                sort_order: 5,
                name: 'Nginx',
            },
            {
                id: 6,
                sort_order: 6,
                name: 'Apache',
            },
            {
                id: 7,
                sort_order: 7,
                name: 'Kafka',
            },
            {
                id: 8,
                sort_order: 8,
                name: 'Nifi',
            },
        ],
    },
    {
        id: 3,
        sort_order: 3,
        name: '',
        name_en: 'Databases',
        name_fr: 'Bases de données',
        items: [
            {
                id: 1,
                sort_order: 1,
                name: 'PhpMyAdmin',
            },
            {
                id: 2,
                sort_order: 2,
                name: 'PgAdmin',
            },
            {
                id: 3,
                sort_order: 3,
                name: 'Datagrip',
            },
            {
                id: 4,
                sort_order: 4,
                name: 'MongoDB Compass',
            },
            {
                id: 5,
                sort_order: 5,
                name: 'DataBricks',
            },
        ],
    },
    {
        id: 4,
        sort_order: 4,
        name: '',
        name_en: 'Tools',
        name_fr: 'Outils',
        items: [
            {
                id: 1,
                sort_order: 1,
                name: 'Postman',
            },
            {
                id: 2,
                sort_order: 2,
                name: 'Figma',
            },
            {
                id: 3,
                sort_order: 3,
                name: 'Docker Desktop',
            },
            {
                id: 4,
                sort_order: 4,
                name: 'Docs',
            },
            {
                id: 5,
                sort_order: 5,
                name: 'Sheets',
            },
            {
                id: 6,
                sort_order: 6,
                name: 'Slides',
            },
            {
                id: 7,
                sort_order: 7,
                name: 'Canva',
            },
            {
                id: 8,
                sort_order: 8,
                name: 'Trello',
            },
            {
                id: 9,
                sort_order: 9,
                name: 'Draw.io',
            },
            {
                id: 10,
                sort_order: 10,
                name: 'ClickUp',
            },
        ],
    },
];

export const mockExperiences: Experience[] = [
    {
        id: 1,
        sort_order: 1,
        company: 'Réservoir Digital',
        job: 'Fullstack Engineer',
        status: 'Apprenticeship',
        duration: '09/23 - Present',
        description: 'I oversee the development of web projects from analysis to production. My role includes ensuring compliance with business needs, streamlining workflows, and modernizing internal processes.',
    },
    {
        id: 2,
        sort_order: 2,
        company: 'Réservoir Digital',
        job: 'Fullstack Developer',
        status: 'Internship',
        duration: '05/23 - 08/23',
        description: 'During my internship at Réservoir Digital, I improved my skills in new technologies while contributing to digital solution development. Collaborating within a team was a key part of this experience.',
    },
    {
        id: 3,
        sort_order: 3,
        company: 'Hôpital Maritime de Zuydcoote',
        job: 'Web Developer & IT Technician',
        status: 'Internship',
        duration: '06/22 - 08/22',
        description: 'I managed IT infrastructure to ensure system connectivity and reliability. I also developed an internal website that optimized patient file management, replacing outdated Excel processes.',
    }
]

export const mockEducations: Education[] = [
    {
        id: 1,
        sort_order: 1,
        institution: 'IG2I de Centrale Lille Institut',
        type: 'School',
        duration: '09/21 - Present',
        description: 'Currently in my 4th year at IG2I Centrale Lille, I am pursuing an engineering degree specializing in industrial and computer science. The program combines academic excellence with real-world applications through hands-on projects and professional training.',
    },
    {
        id: 2,
        sort_order: 2,
        institution: 'TOEIC',
        type: 'Diploma',
        duration: '01/25',
        description: 'Achieved a perfect score on the TOEIC (990/990) in 2025, demonstrating complete mastery of professional English.',
    },
    {
        id: 3,
        sort_order: 3,
        institution: 'Baccalaureate',
        type: 'Diploma',
        duration: '07/21',
        description: 'I completed my high school studies at Lycée Auguste Angellier, earning a Scientific Baccalaureate with Honors in 2021. My specialization in Mathematics and Physics provided a strong analytical foundation, fueling my interest in technology and complex problem-solving.',
    },
    {
        id: 4,
        sort_order: 4,
        institution: 'Cambridge First Certificate',
        type: 'Diploma',
        duration: '06/20',
        description: 'Earned the Cambridge First Certificate in 2020, validating my English proficiency at a B2 level. This certification reflects my ability to communicate effectively in professional and academic environments.',
    },
    {
        id: 5,
        sort_order: 5,
        institution: 'Lycée Auguste Angellier',
        type: 'School',
        duration: '09/18 - 07/21',
        description: 'I completed my high school studies at Lycée Auguste Angellier, earning a Scientific Baccalaureate in 2021. This solid foundation in mathematics and sciences sparked my passion for technology and problem-solving.',
    }
];

export const mockContacts: Contact[] = [
    {
        id: 1,
        sort_order: 1,
        icon: 'mail',
        label: 'Email',
        name: 'hakimfidjel.pro@gmail.com',
        link: 'mailto:hakimfidjel.pro@gmail.com',
    },
    {
        id: 2,
        sort_order: 2,
        icon: 'linkedin',
        label: 'LinkedIn',
        name: 'Hakim Fidjel',
        link: 'https://www.linkedin.com/in/hakim-fidjel/',
    },
    {
        id: 3,
        sort_order: 3,
        icon: 'github',
        label: 'GitHub',
        name: 'HakimFIDJEL',
        link: 'https://github.com/HakimFIDJEL',
    },
    {
        id: 4,
        sort_order: 4,
        icon: 'gitlab',
        label: 'GitLab',
        name: 'HakimFIDJEL',
        link: 'https://gitlab.com/HakimFIDJEL',
    },
];

export const mockAttachments: Attachment[] = [
    {
        file_name: 'My file',
        file_path: '',
        url: '',
    },
];

export const mockProjects: Project[] = [
    {
        id: '1',
        sort_order: 1,
        slug: 'sample-project',
        title: 'Sample project',
        subtitle: 'This is a sample project',
        date: '2024-01-01',
        source_code_url: '',
        live_demo_url: '',
        description: 'A brief description of the sample project.',
        feedback: 'Some feedback about the project.',
        what_i_learned: 'Key learnings from the project.',
        attachments: mockAttachments,
        tags: mockTags,
        stacks: mockStacks[0].items.concat(mockStacks[1].items),
        end_date: null,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
    },
];