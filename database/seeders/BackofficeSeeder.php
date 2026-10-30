<?php

namespace Database\Seeders;

use App\Models\Backoffice\Contact;
use App\Models\Backoffice\Education;
use App\Models\Backoffice\Experience;
use App\Models\Backoffice\Stack;
use App\Models\Backoffice\StackItem;
use App\Models\Backoffice\Tag;
use App\Models\Backoffice\Tool;
use App\Models\Backoffice\ToolItem;
use Illuminate\Database\Seeder;

class BackofficeSeeder extends Seeder
{
    public function run(): void
    {
        // ---------------------------
        // Tags
        // ---------------------------
        $mockTags = [
            ['sort_order' => 1, 'name_fr' => 'Application Mobile', 'name_en' => 'Mobile Application'],
            ['sort_order' => 2, 'name_fr' => 'Application Web', 'name_en' => 'Web Application'],
            ['sort_order' => 3, 'name_fr' => 'Site Web', 'name_en' => 'Website'],
            ['sort_order' => 4, 'name_fr' => 'API', 'name_en' => 'API'],
            ['sort_order' => 5, 'name_fr' => 'Script', 'name_en' => 'Script'],
            ['sort_order' => 6, 'name_fr' => 'Système Agentique', 'name_en' => 'Agentic System'],
            ['sort_order' => 7, 'name_fr' => 'Architecture Cloud', 'name_en' => 'Cloud Architecture'],
            ['sort_order' => 8, 'name_fr' => 'Apprentissage', 'name_en' => 'Learning'],
            ['sort_order' => 9, 'name_fr' => 'DevOps', 'name_en' => 'DevOps'],
            ['sort_order' => 10, 'name_fr' => 'Open Source', 'name_en' => 'Open Source'],
        ];

        foreach ($mockTags as $tag) {
            Tag::updateOrCreate(['name_fr' => $tag['name_fr']], $tag);
        }

        // ---------------------------
        // Stacks & StackItems
        // ---------------------------
        $mockStacks = [
            [
                'sort_order' => 1,
                'name_fr' => 'Frontend',
                'name_en' => 'Frontend',
                'items' => [
                    ['sort_order' => 1, 'name' => 'Vue.js'],
                    ['sort_order' => 2, 'name' => 'Vike'],
                    ['sort_order' => 3, 'name' => 'Pinia'],
                    ['sort_order' => 4, 'name' => 'TypeScript'],
                    ['sort_order' => 5, 'name' => 'React'],
                    ['sort_order' => 6, 'name' => 'Next.js'],
                    ['sort_order' => 7, 'name' => 'Inertia.js'],
                    ['sort_order' => 8, 'name' => 'Tailwind CSS'],
                    ['sort_order' => 9, 'name' => 'JavaScript'],
                    ['sort_order' => 10, 'name' => 'HTML5 / CSS3'],
                ],
            ],
            [
                'sort_order' => 2,
                'name_fr' => 'Backend',
                'name_en' => 'Backend',
                'items' => [
                    ['sort_order' => 1, 'name' => 'Fastify'],
                    ['sort_order' => 2, 'name' => 'Node.js'],
                    ['sort_order' => 3, 'name' => 'PHP'],
                    ['sort_order' => 4, 'name' => 'Laravel'],
                    ['sort_order' => 5, 'name' => 'Python'],
                    ['sort_order' => 6, 'name' => 'BullMQ'],
                    ['sort_order' => 7, 'name' => 'REST APIs'],
                    ['sort_order' => 8, 'name' => 'WebSockets'],
                    ['sort_order' => 9, 'name' => 'NestJS'],
                    ['sort_order' => 10, 'name' => 'Express.js'],
                    ['sort_order' => 11, 'name' => 'Inertia.js'],
                    ['sort_order' => 12, 'name' => 'OctoberCMS'],
                ],
            ],
            [
                'sort_order' => 3,
                'name_fr' => 'IA & Systèmes Agentiques',
                'name_en' => 'AI & Agentic Systems',
                'items' => [
                    ['sort_order' => 1, 'name' => 'LangGraph'],
                    ['sort_order' => 2, 'name' => 'LangChain'],
                    ['sort_order' => 3, 'name' => 'MCP'],
                    ['sort_order' => 4, 'name' => 'Weaviate'],
                    ['sort_order' => 5, 'name' => 'RAG Multi-Agents'],
                    ['sort_order' => 6, 'name' => 'Inférence LLM'],
                ],
            ],
            [
                'sort_order' => 4,
                'name_fr' => 'Bases de données',
                'name_en' => 'Databases',
                'items' => [
                    ['sort_order' => 1, 'name' => 'PostgreSQL'],
                    ['sort_order' => 2, 'name' => 'MySQL'],
                    ['sort_order' => 3, 'name' => 'MongoDB'],
                    ['sort_order' => 4, 'name' => 'Redis'],
                    ['sort_order' => 5, 'name' => 'SQLite'],
                    ['sort_order' => 6, 'name' => 'PL/SQL'],
                ],
            ],
            [
                'sort_order' => 5,
                'name_fr' => 'Logiciel',
                'name_en' => 'Software',
                'items' => [
                    ['sort_order' => 1, 'name' => 'Python'],
                    ['sort_order' => 2, 'name' => 'C'],
                    ['sort_order' => 3, 'name' => 'Java'],
                    ['sort_order' => 4, 'name' => 'Bash'],
                ],
            ],
            [
                'sort_order' => 6,
                'name_fr' => 'Mobile',
                'name_en' => 'Mobile',
                'items' => [
                    ['sort_order' => 1, 'name' => 'React Native'],
                    ['sort_order' => 2, 'name' => 'Flutter'],
                    ['sort_order' => 3, 'name' => 'Kotlin'],
                ],
            ],
        ];

        // Nettoyer les stacks obsolètes qui n'ont pas de projets attachés
        $activeStackNames = array_column($mockStacks, 'name_fr');
        Stack::whereNotIn('name_fr', $activeStackNames)
            ->whereDoesntHave('items.projects')
            ->delete();

        foreach ($mockStacks as $stackData) {
            $stack = Stack::updateOrCreate(
                ['name_fr' => $stackData['name_fr']],
                ['sort_order' => $stackData['sort_order'], 'name_en' => $stackData['name_en']]
            );

            $itemNames = [];
            foreach ($stackData['items'] as $itemData) {
                $itemNames[] = $itemData['name'];
                StackItem::updateOrCreate(
                    ['name' => $itemData['name'], 'stack_id' => $stack->id],
                    array_merge($itemData, ['stack_id' => $stack->id])
                );
            }

            StackItem::where('stack_id', $stack->id)
                ->whereNotIn('name', $itemNames)
                ->whereDoesntHave('projects')
                ->delete();
        }

        // ---------------------------
        // Tools & ToolItems
        // ---------------------------
        $mockTools = [
            [
                'sort_order' => 1,
                'name_fr' => 'IDE & Éditeurs',
                'name_en' => 'IDEs & Editors',
                'items' => [
                    ['sort_order' => 1, 'name' => 'VS Code'],
                    ['sort_order' => 2, 'name' => 'Cursor'],
                    ['sort_order' => 3, 'name' => 'PhpStorm'],
                    ['sort_order' => 4, 'name' => 'IntelliJ IDEA'],
                    ['sort_order' => 5, 'name' => 'PyCharm'],
                    ['sort_order' => 6, 'name' => 'Vim'],
                ],
            ],
            [
                'sort_order' => 2,
                'name_fr' => 'DevOps & Test',
                'name_en' => 'DevOps & Testing',
                'items' => [
                    ['sort_order' => 1, 'name' => 'Docker Compose'],
                    ['sort_order' => 2, 'name' => 'GitHub Actions'],
                    ['sort_order' => 3, 'name' => 'Git Flow'],
                    ['sort_order' => 4, 'name' => 'Vitest'],
                    ['sort_order' => 5, 'name' => 'Playwright'],
                    ['sort_order' => 6, 'name' => 'Linux Ubuntu'],
                    ['sort_order' => 7, 'name' => 'CI/CD'],
                    ['sort_order' => 8, 'name' => 'Nginx'],
                    ['sort_order' => 9, 'name' => 'Apache'],
                    ['sort_order' => 10, 'name' => 'Makefile'],
                ],
            ],
            [
                'sort_order' => 3,
                'name_fr' => 'Bases de données & Vectoriel',
                'name_en' => 'Databases & Vector Tools',
                'items' => [
                    ['sort_order' => 1, 'name' => 'TablePlus'],
                    ['sort_order' => 2, 'name' => 'MongoDB Compass'],
                    ['sort_order' => 3, 'name' => 'PgAdmin'],
                    ['sort_order' => 4, 'name' => 'DataGrip'],
                    ['sort_order' => 5, 'name' => 'DBeaver'],
                    ['sort_order' => 6, 'name' => 'PhpMyAdmin'],
                ],
            ],
            [
                'sort_order' => 4,
                'name_fr' => 'Outils & Organisation',
                'name_en' => 'Tools & Organization',
                'items' => [
                    ['sort_order' => 1, 'name' => 'Linear'],
                    ['sort_order' => 2, 'name' => 'Obsidian'],
                    ['sort_order' => 3, 'name' => 'Postman'],
                    ['sort_order' => 4, 'name' => 'Figma'],
                    ['sort_order' => 5, 'name' => 'Docker Desktop'],
                    ['sort_order' => 6, 'name' => 'GitHub'],
                    ['sort_order' => 7, 'name' => 'GitLab'],
                ],
            ],
        ];

        // Nettoyer les catégories d'outils obsolètes
        $activeToolNames = array_column($mockTools, 'name_fr');
        Tool::whereNotIn('name_fr', $activeToolNames)->delete();

        foreach ($mockTools as $toolData) {
            $tool = Tool::updateOrCreate(
                ['name_fr' => $toolData['name_fr']],
                ['sort_order' => $toolData['sort_order'], 'name_en' => $toolData['name_en']]
            );

            $itemNames = [];
            foreach ($toolData['items'] as $itemData) {
                $itemNames[] = $itemData['name'];
                ToolItem::updateOrCreate(
                    ['name' => $itemData['name'], 'tool_id' => $tool->id],
                    array_merge($itemData, ['tool_id' => $tool->id])
                );
            }

            ToolItem::where('tool_id', $tool->id)
                ->whereNotIn('name', $itemNames)
                ->delete();
        }

        // ---------------------------
        // Experiences
        // ---------------------------
        $mockExperiences = [
            [
                'sort_order' => 1,
                'company' => 'TenderCrunch',
                'job_fr' => 'Ingénieur Logiciel', 'job_en' => 'Software Engineer',
                'status_fr' => 'CDI', 'status_en' => 'Full-time',
                'duration' => '09/26 - Present',
                'description_fr' => 'Ingénierie logicielle et conception de systèmes agentiques, architectures d\'automatisation avancées et développement fullstack d\'applications à haute valeur ajoutée.',
                'description_en' => 'Software engineering and agentic systems design, advanced automation architectures, and fullstack development of high-impact applications.',
            ],
            [
                'sort_order' => 2,
                'company' => 'Réservoir Digital',
                'job_fr' => 'Ingénieur Fullstack', 'job_en' => 'Fullstack Engineer',
                'status_fr' => 'Apprentissage', 'status_en' => 'Apprenticeship',
                'duration' => '09/23 - 08/26',
                'description_fr' => 'Conception et pilotage de projets web complexes de l\'analyse fonctionnelle à la mise en production. Garantie de conformité aux besoins métier, optimisation des workflows de développement et modernisation des processus internes.',
                'description_en' => 'Led end-to-end web project development from requirements analysis to production deployment. Ensured alignment with business goals, streamlined workflows, and modernized internal processes.',
            ],
            [
                'sort_order' => 3,
                'company' => 'Réservoir Digital',
                'job_fr' => 'Ingénieur Fullstack', 'job_en' => 'Fullstack Engineer',
                'status_fr' => 'Stage', 'status_en' => 'Internship',
                'duration' => '05/23 - 08/23',
                'description_fr' => 'Développement d\'applications web et de solutions numériques sur mesure. Montée en compétences sur l\'écosystème web moderne et collaboration au sein d\'une équipe agile.',
                'description_en' => 'Developed custom web applications and tailored digital solutions. Rapid onboarding on modern software stacks within an agile team environment.',
            ],
            [
                'sort_order' => 4,
                'company' => 'Hôpital Maritime de Zuydcoote',
                'job_fr' => 'Développeur Web & Technicien Informatique', 'job_en' => 'Web Developer & IT Technician',
                'status_fr' => 'Stage', 'status_en' => 'Internship',
                'duration' => '06/22 - 08/22',
                'description_fr' => 'Maintenance et fiabilisation de l\'infrastructure informatique et réseau. Conception et déploiement d\'une application web interne dédiée au suivi centralisé des dossiers patients.',
                'description_en' => 'Maintained and secured IT infrastructure and network continuity. Designed and deployed an internal web platform for centralized patient file management.',
            ],
        ];

        foreach ($mockExperiences as $exp) {
            Experience::updateOrCreate(
                ['company' => $exp['company'], 'duration' => $exp['duration']],
                $exp
            );
        }

        // ---------------------------
        // Education
        // ---------------------------
        $mockEducations = [
            [
                'sort_order' => 1,
                'institution' => 'IG2I de Centrale Lille Institut',
                'type_fr' => 'École',
                'type_en' => 'School',
                'duration' => '09/21 - 08/26',
                'description_fr' => 'Diplôme d\'ingénieur spécialisé en informatique et génie industriel. Le programme combine l\'excellence académique avec des applications concrètes via des projets pratiques, de l\'architecture logicielle et de la formation professionnelle.',
                'description_en' => 'Engineering degree specializing in industrial and computer science. The program combines academic excellence with real-world applications through practical projects, software architecture, and professional training.',
            ],
            [
                'sort_order' => 2,
                'institution' => 'TOEIC',
                'type_fr' => 'Diplôme',
                'type_en' => 'Diploma',
                'duration' => '01/25',
                'description_fr' => 'Obtention du score parfait au TOEIC (990/990) en 2025, démontrant une maîtrise complète de l\'anglais professionnel.',
                'description_en' => 'Achieved a perfect score on the TOEIC (990/990) in 2025, demonstrating complete mastery of professional English.',
            ],
            [
                'sort_order' => 3,
                'institution' => 'Baccalauréat Scientifique',
                'type_fr' => 'Diplôme',
                'type_en' => 'Diploma',
                'duration' => '07/21',
                'description_fr' => 'Obtention du Baccalauréat Scientifique avec Mention au Lycée Auguste Angellier en 2021. La spécialisation en Mathématiques et Physique a fourni une base analytique solide, alimentant mon intérêt pour la technologie et la résolution de problèmes complexes.',
                'description_en' => 'I completed my high school studies at Lycée Auguste Angellier, earning a Scientific Baccalaureate with Honors in 2021. My specialization in Mathematics and Physics provided a strong analytical foundation, fueling my interest in technology and complex problem-solving.',
            ],
            [
                'sort_order' => 4,
                'institution' => 'Cambridge First Certificate (FCE)',
                'type_fr' => 'Diplôme',
                'type_en' => 'Diploma',
                'duration' => '06/20',
                'description_fr' => 'Obtention du Cambridge First Certificate en 2020, validant ma maîtrise de l\'anglais au niveau B2. Cette certification reflète ma capacité à communiquer efficacement dans des environnements professionnels et académiques.',
                'description_en' => 'Earned the Cambridge First Certificate in 2020, validating my English proficiency at a B2 level. This certification reflects my ability to communicate effectively in professional and academic environments.',
            ],
        ];

        $activeInstitutions = array_column($mockEducations, 'institution');
        Education::whereNotIn('institution', $activeInstitutions)->delete();

        foreach ($mockEducations as $edu) {
            Education::updateOrCreate(
                ['institution' => $edu['institution'], 'type_fr' => $edu['type_fr']],
                $edu
            );
        }

        // ---------------------------
        // Contacts
        // ---------------------------
        $mockContacts = [
            ['sort_order' => 1, 'icon' => 'mail', 'label' => 'Email', 'name_fr' => 'hakimfidjel.pro@gmail.com', 'name_en' => 'hakimfidjel.pro@gmail.com', 'link' => 'mailto:hakimfidjel.pro@gmail.com'],
            ['sort_order' => 2, 'icon' => 'linkedin', 'label' => 'LinkedIn', 'name_fr' => 'Hakim Fidjel', 'name_en' => 'Hakim Fidjel', 'link' => 'https://www.linkedin.com/in/hakim-fidjel/'],
            ['sort_order' => 3, 'icon' => 'github', 'label' => 'GitHub', 'name_fr' => 'HakimFIDJEL', 'name_en' => 'HakimFIDJEL', 'link' => 'https://github.com/hakimfidjel'],
            ['sort_order' => 4, 'icon' => 'gitlab', 'label' => 'GitLab', 'name_fr' => 'HakimFIDJEL', 'name_en' => 'HakimFIDJEL', 'link' => 'https://gitlab.com/hakimfidjel'],
        ];

        foreach ($mockContacts as $contact) {
            Contact::firstOrCreate(
                ['sort_order' => $contact['sort_order']],
                $contact
            );
        }

        // ---------------------------
        // Projects & Sandbox
        // ---------------------------
        $this->call(ProjectSeeder::class);
        $this->call(AttachmentSeeder::class);
    }
}
