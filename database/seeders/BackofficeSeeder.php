<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Backoffice\{
    Tag, Stack, StackItem, Tool, ToolItem, Project, Contact, Experience, Education
};
use App\Models\Attachment;

class BackofficeSeeder extends Seeder
{
    public function run(): void
    {
        // ---------------------------
        // Tags
        // ---------------------------
        $mockTags = [
            ['sort_order'=>1,'name_fr'=>'Application Mobile','name_en'=>'Mobile Application'],
            ['sort_order'=>2,'name_fr'=>'Application Web','name_en'=>'Web Application'],
            ['sort_order'=>3,'name_fr'=>'Site Web','name_en'=>'Website'],
            ['sort_order'=>4,'name_fr'=>'API','name_en'=>'API'],
            ['sort_order'=>5,'name_fr'=>'Script','name_en'=>'Script'],
        ];

        foreach ($mockTags as $tag) {
            Tag::firstOrCreate(['name_fr'=>$tag['name_fr']], $tag);
        }

        // ---------------------------
        // Stacks & StackItems
        // ---------------------------
        $mockStacks = [
            ['sort_order'=>1,'name_fr'=>'Frontend','name_en'=>'Frontend','items'=>[
                ['sort_order'=>1,'name_fr'=>'HTML','name_en'=>'HTML'],
                ['sort_order'=>2,'name_fr'=>'CSS','name_en'=>'CSS'],
                ['sort_order'=>3,'name_fr'=>'SCSS','name_en'=>'SCSS'],
                ['sort_order'=>4,'name_fr'=>'Tailwind','name_en'=>'Tailwind'],
                ['sort_order'=>5,'name_fr'=>'JavaScript','name_en'=>'JavaScript'],
                ['sort_order'=>6,'name_fr'=>'TypeScript','name_en'=>'TypeScript'],
                ['sort_order'=>7,'name_fr'=>'React','name_en'=>'React'],
                ['sort_order'=>8,'name_fr'=>'jQuery','name_en'=>'jQuery'],
                ['sort_order'=>9,'name_fr'=>'Next.js','name_en'=>'Next.js'],
            ]],
            ['sort_order'=>2,'name_fr'=>'Backend','name_en'=>'Backend','items'=>[
                ['sort_order'=>1,'name_fr'=>'PHP','name_en'=>'PHP'],
                ['sort_order'=>2,'name_fr'=>'Laravel','name_en'=>'Laravel'],
                ['sort_order'=>3,'name_fr'=>'OctoberCMS','name_en'=>'OctoberCMS'],
                ['sort_order'=>4,'name_fr'=>'Node.js','name_en'=>'Node.js'],
                ['sort_order'=>5,'name_fr'=>'NestJS','name_en'=>'NestJS'],
                ['sort_order'=>6,'name_fr'=>'Express.js','name_en'=>'Express.js'],
                ['sort_order'=>7,'name_fr'=>'Inertia.js','name_en'=>'Inertia.js'],
            ]],
            ['sort_order'=>3,'name_fr'=>'Bases de données','name_en'=>'Databases','items'=>[
                ['sort_order'=>1,'name_fr'=>'MySQL','name_en'=>'MySQL'],
                ['sort_order'=>2,'name_fr'=>'PostgreSQL','name_en'=>'PostgreSQL'],
                ['sort_order'=>3,'name_fr'=>'PL/SQL','name_en'=>'PL/SQL'],
                ['sort_order'=>4,'name_fr'=>'NoSQL','name_en'=>'NoSQL'],
                ['sort_order'=>5,'name_fr'=>'SQLite','name_en'=>'SQLite'],
                ['sort_order'=>6,'name_fr'=>'MongoDB','name_en'=>'MongoDB'],
            ]],
        ];

        foreach ($mockStacks as $stackData) {
            $stack = Stack::firstOrCreate(
                ['name_fr'=>$stackData['name_fr']],
                ['sort_order'=>$stackData['sort_order'],'name_en'=>$stackData['name_en']]
            );

            foreach ($stackData['items'] as $itemData) {
                StackItem::firstOrCreate(
                    ['name_fr'=>$itemData['name_fr'],'stack_id'=>$stack->id],
                    array_merge($itemData,['stack_id'=>$stack->id])
                );
            }
        }

        // ---------------------------
        // Tools & ToolItems
        // ---------------------------
        $mockTools = [
            ['sort_order'=>1,'name_fr'=>'IDE','name_en'=>'IDE','items'=>[
                ['sort_order'=>1,'name_fr'=>'VS Code','name_en'=>'VS Code'],
                ['sort_order'=>2,'name_fr'=>'Visual Studio','name_en'=>'Visual Studio'],
                ['sort_order'=>3,'name_fr'=>'Sublime Text','name_en'=>'Sublime Text'],
            ]],
            ['sort_order'=>2,'name_fr'=>'DevOps','name_en'=>'DevOps','items'=>[
                ['sort_order'=>1,'name_fr'=>'Docker','name_en'=>'Docker'],
                ['sort_order'=>2,'name_fr'=>'Git','name_en'=>'Git'],
            ]],
        ];

        foreach ($mockTools as $toolData) {
            $tool = Tool::firstOrCreate(
                ['name_fr'=>$toolData['name_fr']],
                ['sort_order'=>$toolData['sort_order'],'name_en'=>$toolData['name_en']]
            );

            foreach ($toolData['items'] as $itemData) {
                ToolItem::firstOrCreate(
                    ['name_fr'=>$itemData['name_fr'],'tool_id'=>$tool->id],
                    array_merge($itemData,['tool_id'=>$tool->id])
                );
            }
        }

        // ---------------------------
        // Experiences
        // ---------------------------
        $mockExperiences = [
            [
                'sort_order'=>1,
                'company'=>'Réservoir Digital',
                'job_fr'=>'Ingénieur Fullstack','job_en'=>'Fullstack Engineer',
                'status_fr'=>'Apprentissage','status_en'=>'Apprenticeship',
                'duration'=>'09/23 - Present',
                'description_fr'=>'Je supervise le développement de projets web, de l\'analyse à la production. Mon rôle inclut d\'assurer la conformité aux besoins métier, de rationaliser les flux de travail et de moderniser les processus internes.',
                'description_en'=>'I oversee the development of web projects from analysis to production. My role includes ensuring compliance with business needs, streamlining workflows, and modernizing internal processes.',
            ],
            [
                'sort_order'=>2,
                'company'=>'Réservoir Digital',
                'job_fr'=>'Développeur Fullstack','job_en'=>'Fullstack Developer',
                'status_fr'=>'Stage','status_en'=>'Internship',
                'duration'=>'05/23 - 08/23',
                'description_fr'=>'Durant mon stage chez Réservoir Digital, j\'ai amélioré mes compétences dans les nouvelles technologies tout en contribuant au développement de solutions numériques. La collaboration en équipe a été un élément clé de cette expérience.',
                'description_en'=>'During my internship at Réservoir Digital, I improved my skills in new technologies while contributing to digital solution development. Collaborating within a team was a key part of this experience.',
            ],
            [
                'sort_order'=>3,
                'company'=>'Hôpital Maritime de Zuydcoote',
                'job_fr'=>'Développeur Web & Technicien Informatique','job_en'=>'Web Developer & IT Technician',
                'status_fr'=>'Stage','status_en'=>'Internship',
                'duration'=>'06/22 - 08/22',
                'description_fr'=>'J\'ai géré l\'infrastructure informatique pour assurer la connectivité et la fiabilité des systèmes. J\'ai également développé un site web interne qui a optimisé la gestion des dossiers patients, remplaçant les processus obsolètes basés sur Excel.',
                'description_en'=>'I managed IT infrastructure to ensure system connectivity and reliability. I also developed an internal website that optimized patient file management, replacing outdated Excel processes.',
            ],
        ];

        foreach ($mockExperiences as $exp) {
            Experience::firstOrCreate(
                ['company'=>$exp['company'],'job_fr'=>$exp['job_fr']],
                $exp
            );
        }

        // ---------------------------
        // Education
        // ---------------------------
        $mockEducations = [
            [
                'sort_order'=>1,'institution'=>'IG2I de Centrale Lille Institut',
                'type_fr'=>'École','type_en'=>'School',
                'duration'=>'09/21 - Present',
                'description_fr'=>'Actuellement en 4e année à l\'IG2I Centrale Lille, je poursuis un diplôme d\'ingénieur spécialisé en informatique et génie industriel.',
                'description_en'=>'Currently in my 4th year at IG2I Centrale Lille, I am pursuing an engineering degree specializing in industrial and computer science.',
            ]
        ];

        foreach ($mockEducations as $edu) {
            Education::firstOrCreate(
                ['institution'=>$edu['institution'],'type_fr'=>$edu['type_fr']],
                $edu
            );
        }

        // ---------------------------
        // Contacts
        // ---------------------------
        $mockContacts = [
            ['sort_order'=>1,'icon'=>'mail','label'=>'Email','name_fr'=>'hakimfidjel.pro@gmail.com','name_en'=>'hakimfidjel.pro@gmail.com','link'=>'mailto:hakimfidjel.pro@gmail.com'],
            ['sort_order'=>2,'icon'=>'linkedin','label'=>'LinkedIn','name_fr'=>'Hakim Fidjel','name_en'=>'Hakim Fidjel','link'=>'https://www.linkedin.com/in/hakim-fidjel/'],
            ['sort_order'=>3,'icon'=>'github','label'=>'GitHub','name_fr'=>'HakimFIDJEL','name_en'=>'HakimFIDJEL','link'=>'https://github.com/hakimfidjel'],
            ['sort_order'=>4,'icon'=>'gitlab','label'=>'GitLab','name_fr'=>'HakimFIDJEL','name_en'=>'HakimFIDJEL','link'=>'https://gitlab.com/hakimfidjel'],
        ];

        foreach ($mockContacts as $contact) {
            Contact::firstOrCreate(
                ['sort_order'=>$contact['sort_order']],
                $contact
            );
        }
    }
}