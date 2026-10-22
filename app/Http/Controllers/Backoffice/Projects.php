<?php

declare(strict_types=1);

namespace App\Http\Controllers\Backoffice;

use App\Http\Controllers\Controller;
use App\Http\Requests\Projects\Store as RequestStore;
use App\Http\Requests\Projects\Update as RequestUpdate;
use App\Models\Backoffice\Project;
use App\Models\Backoffice\Stack;
use App\Models\Backoffice\Tag;
use App\Services\ProjectService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class Projects extends Controller
{
    public function __construct(
        private readonly ProjectService $projectService
    ) {}

    /**
     * Liste des projets ordonnés.
     */
    public function index(): Response
    {
        return Inertia::render('backoffice/projects/index', [
            'projects' => Project::orderBy('sort_order', 'asc')->with(['tags'])->get(),
        ]);
    }

    /**
     * Formulaire de création d'un projet.
     */
    public function create(): Response
    {
        $tags = Tag::orderBy('sort_order', 'asc')->get();
        $stacks = Stack::orderBy('sort_order', 'asc')->with('items')->get();

        return Inertia::render('backoffice/projects/create', [
            'tags' => $tags,
            'stacks' => $stacks,
        ]);
    }

    /**
     * Persister un nouveau projet.
     *
     * @throws Throwable
     */
    public function store(RequestStore $request): RedirectResponse
    {
        $validated = $request->validated();

        $this->projectService->create(
            attributes: $validated,
            tags: $validated['tags'] ?? null,
            stackItems: $validated['stackItems'] ?? null,
            attachments: $validated['attachments'] ?? null
        );

        return redirect()->route('backoffice.projects.index')->with('success', 'Project created successfully.');
    }

    /**
     * Formulaire d'édition d'un projet.
     */
    public function edit(Project $project): Response
    {
        $tags = Tag::orderBy('sort_order', 'asc')->get();
        $stacks = Stack::orderBy('sort_order', 'asc')->with('items')->get();

        return Inertia::render('backoffice/projects/edit', [
            'project' => $project->load(['tags', 'stackItems', 'attachments']),
            'tags' => $tags,
            'stacks' => $stacks,
        ]);
    }

    /**
     * Mettre à jour un projet existant.
     *
     * @throws Throwable
     */
    public function update(RequestUpdate $request, Project $project): RedirectResponse
    {
        $validated = $request->validated();

        $this->projectService->update(
            project: $project,
            attributes: $validated,
            tags: $validated['tags'] ?? null,
            stackItems: $validated['stackItems'] ?? null,
            attachments: $validated['attachments'] ?? null
        );

        return redirect()->route('backoffice.projects.index')->with('success', 'Project updated successfully.');
    }

    /**
     * Réordonner les projets de la liste.
     *
     * @throws Throwable
     */
    public function sort(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'projects' => ['required', 'array'],
            'projects.*.id' => ['required', 'integer', 'exists:projects,id'],
            'projects.*.sort_order' => ['required', 'integer'],
        ]);

        $this->projectService->sort($validated['projects']);

        return redirect()->back()->with('success', 'Projects sorted successfully.');
    }

    /**
     * Supprimer un projet et ses médias associés.
     *
     * @throws Throwable
     */
    public function destroy(Project $project): RedirectResponse
    {
        $this->projectService->delete($project);

        return redirect()->route('backoffice.projects.index')->with('success', 'Project deleted successfully.');
    }
}
