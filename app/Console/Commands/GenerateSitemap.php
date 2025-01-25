<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;
use App\Models\Project;

class GenerateSitemap extends Command
{
    protected $signature = 'sitemap:generate';
    protected $description = 'Generate the sitemap for the website';

    public function handle()
    {
        $sitemap = Sitemap::create();

        // Ajouter la page d'accueil
        $sitemap->add(
            Url::create('/')
                ->setPriority(1.0)
                ->setChangeFrequency(Url::CHANGE_FREQUENCY_DAILY)
        );

        // Ajouter les projets
        $projects = Project::where('type', 'project')->get();
        foreach ($projects as $project) {
            $sitemap->add(
                Url::create('/project/' . $project->slug . '/' . $project->id)
                    ->setPriority(0.9)
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)
            );
        }

        // Ajouter les labs
        $labs = Project::where('type', 'lab')->get();
        foreach ($labs as $lab) {
            $sitemap->add(
                Url::create('/project/' . $lab->slug . '/' . $lab->id)
                    ->setPriority(0.8)
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)
            );
        }

        // Personnaliser le rendu du sitemap pour inclure <priority> et <changefreq>
        $sitemapXml = $this->renderWithPriority($sitemap);

        // Écrire la sitemap personnalisée dans un fichier
        file_put_contents(public_path('sitemap.xml'), $sitemapXml);

        $this->info('Sitemap generated successfully.');
    }

    // Méthode pour inclure explicitement <priority> et <changefreq> dans le XML généré
    private function renderWithPriority(Sitemap $sitemap): string
    {
        $xml = $sitemap->render();

        // Ajouter les balises <priority> et <changefreq> manuellement
        $xml = preg_replace_callback('/<url>(.*?)<\/url>/s', function ($matches) {
            $urlBlock = $matches[1];

            // Ajouter <priority> et <changefreq> si manquants
            $priority = '1.0'; // Définir une priorité par défaut
            $changefreq = 'daily'; // Définir une fréquence de changement par défaut

            // Vérifier la priorité et la fréquence des pages
            if (strpos($urlBlock, '/project/') !== false) {
                $priority = '0.9';
                $changefreq = 'weekly';
            } elseif (strpos($urlBlock, '/lab/') !== false) {
                $priority = '0.8';
                $changefreq = 'weekly';
            }

            return "<url>{$urlBlock}<priority>{$priority}</priority><changefreq>{$changefreq}</changefreq></url>";
        }, $xml);

        return $xml;
    }
}
