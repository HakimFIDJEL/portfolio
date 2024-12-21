<?php
namespace App\Http\Controllers;

use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;
use Illuminate\Http\Request;
use App\Models\Project;

class SitemapController extends Controller
{
    public function showSitemap() {
        $sitemap = Sitemap::create();

        // Ajouter la page d'accueil avec priorité
        $sitemap->add($this->customUrl('/')->setPriority(1));

        // Ajouter les projets
        $projects = Project::where('type', 'project')->get();
        foreach ($projects as $project) {
            $sitemap->add(
                $this->customUrl('/project/' . $project->slug . '/' . $project->id)
                    ->setPriority(0.9)
            );
        }

        // Ajouter les labs
        $labs = Project::where('type', 'lab')->get();
        foreach ($labs as $lab) {
            $sitemap->add(
                $this->customUrl('/project/' . $lab->slug . '/' . $lab->id)
                    ->setPriority(0.8)
            );
        }

        // Retourner directement le contenu XML avec le bon header
        return response($this->renderWithPriority($sitemap), 200)
            ->header('Content-Type', 'application/xml');
    }

    // Méthode pour personnaliser l'URL avec une balise <priority>
    private function customUrl($url)
    {
        return Url::create($url);
    }

    // Méthode pour inclure explicitement <priority> dans le XML généré
    private function renderWithPriority(Sitemap $sitemap): string
    {
        $xml = $sitemap->render();

        // Ajouter les balises <priority> manuellement pour chaque <url>
        $xml = preg_replace_callback('/<url>(.*?)<\/url>/s', function ($matches) {
            $urlBlock = $matches[1];
            if (strpos($urlBlock, '<priority>') === false) {
                if (preg_match('/<loc>(.*?)<\/loc>/', $urlBlock, $locMatch)) {
                    $priority = '1.0'; // Définir une priorité par défaut
                    if (strpos($locMatch[1], '/project/') !== false) {
                        $priority = '0.9';
                    } elseif (strpos($locMatch[1], '/lab/') !== false) {
                        $priority = '0.8';
                    }

                    return "<url>{$urlBlock}<priority>{$priority}</priority></url>";
                }
            }
            return $matches[0];
        }, $xml);

        return $xml;
    }
}
