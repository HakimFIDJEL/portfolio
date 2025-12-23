<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;
use Illuminate\Support\Facades\App;

// Models
use App\Models\Backoffice\Project;

class GenerateSitemap extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sitemap:generate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate the website sitemap';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting sitemap generation...');

        $sitemap = Sitemap::create(config('app.url'));

        $sitemap->add(
            Url::create(route('home', [], absolute: true))
                ->setLastModificationDate(now())
                ->setChangeFrequency(Url::CHANGE_FREQUENCY_DAILY)
                ->setPriority(1.0)
        );

        $sitemap->add(
            Url::create(route('terms', [], absolute: true))
                ->setLastModificationDate(now())
                ->setChangeFrequency(Url::CHANGE_FREQUENCY_YEARLY)
                ->setPriority(0.5)
        );

        $projects = Project::where('type', 'project')->orderBy('sort_order', 'asc')->get();

        foreach ($projects as $project) {
            $slugFr = $project->slug_fr;
            $slugEn = $project->slug_en;
            $routeFr = $slugFr ? route('project', ['slug' => $slugFr], absolute: true) : null;
            $routeEn = $slugEn ? route('project', ['slug' => $slugEn], absolute: true) : null;
            
            $lastModified = $project->updated_at ?? now();

            if ($routeFr) {
                $frTag = Url::create($routeFr)
                    ->setLastModificationDate($lastModified)
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY)
                    ->setPriority(0.8);

                if($routeEn) {
                    $frTag->addAlternate($routeEn, 'en');
                }

                $sitemap->add($frTag);
            }

            if ($routeEn) {
                $enTag = Url::create($routeEn)
                    ->setLastModificationDate($lastModified)
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY)
                    ->setPriority(0.8);

                if($routeFr) {
                    $enTag->addAlternate($routeFr, 'fr');
                }
                $sitemap->add($enTag);
            }
        }

        $sitemap->writeToFile(public_path('sitemap.xml'));

        $this->info('Sitemap generated successfully at: ' . public_path('sitemap.xml'));

        return Command::SUCCESS;
    }
}
