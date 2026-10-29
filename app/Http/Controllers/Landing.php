<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Backoffice\Contact;
use App\Models\Backoffice\Education;
use App\Models\Backoffice\Experience;
use App\Models\Backoffice\Project;
use App\Models\Backoffice\Stack;
use App\Models\Backoffice\Tool;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Inertia\Response;

class Landing extends Controller
{
    /**
     * Rendu de la page d'accueil principale avec injection directe des données SSR.
     */
    public function landing(): Response
    {
        $contacts = Contact::orderBy('sort_order', 'asc')->get();
        $experiences = Experience::orderBy('sort_order', 'asc')->get();
        $educations = Education::orderBy('sort_order', 'asc')->get();
        $stacks = Stack::orderBy('sort_order', 'asc')->with('items')->get();
        $tools = Tool::orderBy('sort_order', 'asc')->with('items')->get();
        $projects = Project::where('type', 'project')->orderBy('sort_order', 'asc')->get();
        $sandbox = Project::where('type', 'sandbox')
            ->orderBy('sort_order', 'asc')
            ->with(['tags', 'stackItems', 'attachments'])
            ->get();

        return Inertia::render('landing', [
            'contacts' => $contacts,
            'experiences' => $experiences,
            'educations' => $educations,
            'stacks' => $stacks,
            'tools' => $tools,
            'projects' => $projects,
            'sandbox' => $sandbox,
        ]);
    }

    /**
     * Rendu de la page détaillée d'un projet avec navigation précédent/suivant et redirection linguistique.
     */
    public function project(string $slug): Response|RedirectResponse
    {
        $locale = (string) Session::get('locale', App::getLocale());

        $project = Project::where('slug_'.$locale, $slug)
            ->where('type', 'project')
            ->with(['tags', 'stackItems', 'attachments'])
            ->first();

        if (! $project) {
            $alternateLocale = $locale === 'en' ? 'fr' : 'en';

            $project = Project::where('slug_'.$alternateLocale, $slug)
                ->where('type', 'project')
                ->with(['tags', 'stackItems', 'attachments'])
                ->first();

            if ($project) {
                return redirect()->route('project', ['slug' => $project->{'slug_'.$locale}]);
            }

            abort(404);
        }

        $previousProject = Project::where('sort_order', '<', $project->sort_order)
            ->where('type', 'project')
            ->orderBy('sort_order', 'desc')
            ->first();

        $nextProject = Project::where('sort_order', '>', $project->sort_order)
            ->where('type', 'project')
            ->orderBy('sort_order', 'asc')
            ->first();

        return Inertia::render('project', [
            'project' => $project,
            'previous_project' => $previousProject,
            'next_project' => $nextProject,
        ]);
    }

    /**
     * Basculer la langue active de l'application (fr <-> en) ou définir une langue spécifique.
     */
    public function toggle_language(Request $request): RedirectResponse
    {
        $requested = (string) $request->query('locale');
        if (in_array($requested, ['fr', 'en'], true)) {
            $newLocale = $requested;
        } else {
            $newLocale = App::getLocale() === 'en' ? 'fr' : 'en';
        }

        Session::put('locale', $newLocale);
        App::setLocale($newLocale);

        return redirect()->back();
    }

    /**
     * Rendu de la page des mentions légales.
     */
    public function terms(): Response
    {
        return Inertia::render('terms');
    }
}
