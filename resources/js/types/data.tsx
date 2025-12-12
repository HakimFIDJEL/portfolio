import type {
    Attachment,
    Contact,
    Project,
    Stacks,
    Tags,
    Tools,
} from '@/types';

// --------------------------------
// Mocks
// --------------------------------

export const mockTag: Tags = {
    id: 1,
    sort_order: 1,
    name: 'JavaScript',
};

export const mockStacks: Stacks[] = [
    {
        id: 1,
        sort_order: 1,
        name: 'Frontend',
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
        name: 'Backend',
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
        name: 'Databases',
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
        name: 'Software',
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
        name: 'Mobile',
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

export const mockTools: Tools[] = [
    {
        id: 1,
        sort_order: 1,
        name: 'Version Control',
        items: [
            {
                id: 1,
                sort_order: 1,
                name: 'Git',
            },
            {
                id: 2,
                sort_order: 2,
                name: 'GitHub',
            },
        ],
    },
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
        tags: [mockTag],
        stacks: mockStacks,
        end_date: null,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
    },
];

// const stack = [
//     {
//         category: 'Frontend',
//         technologies: [
//             'HTML',
//             'CSS',
//             'SCSS',
//             'Tailwind',
//             'JavaScript',
//             'TypeScript',
//             'React',
//             'jQuery',
//             'Next.js',
//         ],
//     },
//     {
//         category: 'Backend',
//         technologies: [
//             'PHP',
//             'Laravel',
//             'OctoberCMS',
//             'Node.js',
//             'NestJS',
//             'Express.js',
//             'Inertia.js',
//         ],
//     },
//     {
//         category: 'Databases',
//         technologies: [
//             'MySQL',
//             'PostgreSQL',
//             'PL/SQL',
//             'NoSQL',
//             'SQLite',
//             'MongoDB',
//         ],
//     },
//     {
//         category: 'Software',
//         technologies: ['C', 'Java', 'Python', 'Bash'],
//     },
//     {
//         category: 'Mobile',
//         technologies: ['React Native', 'Flutter'],
//     },
// ];

// const tools = [
//     {
//         category: 'IDE',
//         technologies: [
//             'VS Code',
//             'Visual Studio',
//             'Sublime Text',
//             'Notepad++',
//             'Nano',
//             'Vim',
//             'PhpStorm',
//             'IntelliJ IDEA',
//             'PyCharm',
//         ],
//     },
//     {
//         category: 'DevOps',
//         technologies: [
//             'Docker',
//             'Git',
//             'GitHub Actions',
//             'CI/CD',
//             'Nginx',
//             'Apache',
//             'Kafka',
//             'Nifi',
//         ],
//     },
//     {
//         category: 'Databases',
//         technologies: [
//             'PhpMyAdmin',
//             'PgAdmin',
//             'Datagrip',
//             'MongoDB',
//             'DataBricks',
//         ],
//     },
//     {
//         category: 'Tools',
//         technologies: [
//             'Postman',
//             'Figma',
//             'Docker Desktop',
//             'Docs',
//             'Sheets',
//             'Slides',
//             'Canva',
//             'Trello',
//             'Draw.io',
//             'ClickUp',
//         ],
//     },
// ];
