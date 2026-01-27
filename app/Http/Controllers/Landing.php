<?php

// app/Http/Controllers/Landing.php

namespace App\Http\Controllers;

use App\Models\Backoffice\Contact;
use App\Models\Backoffice\Education;
use App\Models\Backoffice\Experience;
// Models
use App\Models\Backoffice\Project;
use App\Models\Backoffice\Stack;
use App\Models\Backoffice\Tool;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

/**
 * Landing Page Controller
 *
 * Handles requests related to the landing page.
 */
class Landing extends Controller
{
    public function landing()
    {
        return Inertia::render('landing');
    }

    public function data()
    {
        $contacts = Contact::orderBy('sort_order', 'asc')->get();
        $experiences = Experience::orderBy('sort_order', 'asc')->get();
        $educations = Education::orderBy('sort_order', 'asc')->get();
        $stacks = Stack::orderBy('sort_order', 'asc')->with('items')->get();
        $tools = Tool::orderBy('sort_order', 'asc')->with('items')->get();
        $projects = Project::where('type', 'project')->orderBy('sort_order', 'asc')->get();
        $sandbox = Project::where('type', 'sandbox')->orderBy('sort_order', 'asc')->with(['tags', 'stackItems', 'attachments'])->get();

        return response()->json([
            'contacts' => $contacts,
            'experiences' => $experiences,
            'educations' => $educations,
            'stacks' => $stacks,
            'tools' => $tools,
            'projects' => $projects,
            'sandbox' => $sandbox,
        ]);
    }

    public function project(string $slug)
    {
        $locale = Session::get('locale', App::getLocale());

        $project = Project::where('slug_'.$locale, $slug)->with(['tags', 'stackItems', 'attachments'])->first();

        if (!$project) {

            if($locale === 'en') {
                $alternateLocale = 'fr';
            } else {
                $alternateLocale = 'en';
            }

            $project = Project::where('slug_'.$alternateLocale, $slug)->with(['tags', 'stackItems', 'attachments'])->first();

            if ($project) {
                return redirect()->route('project', ['slug' => $project->{'slug_'.$locale}]);
            }


            abort(404);
        }

        $previous_project = Project::where('sort_order', '<', $project->sort_order)
            ->orderBy('sort_order', 'desc')
            ->first();

        $next_project = Project::where('sort_order', '>', $project->sort_order)
            ->orderBy('sort_order', 'asc')
            ->first();

        return Inertia::render('project', ['project' => $project, 'previous_project' => $previous_project, 'next_project' => $next_project]);
    }

    public function toggle_language()
    {
        $newLocale = App::getLocale() === 'en' ? 'fr' : 'en';

        Session::put('locale', $newLocale);
        App::setLocale($newLocale);

        return redirect()->back();
    }

    public function terms()
    {
        return Inertia::render('terms');
    }
}
