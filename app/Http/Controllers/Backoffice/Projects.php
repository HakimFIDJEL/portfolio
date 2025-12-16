<?php

namespace App\Http\Controllers\Backoffice;

use App\Http\Controllers\Controller;
use App\Models\Attachment;
use Illuminate\Http\Request;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

// Models
use app\Models\Backoffice\Project;
use app\Models\Backoffice\StackItem;
use app\Models\Backoffice\Stack;
use app\Models\Backoffice\Tag;

// Requests
use app\Http\Requests\Projects\Store as RequestStore;
use app\Http\Requests\Projects\Update as RequestUpdate;

class Projects extends Controller
{
    public function index() {
        return Inertia::render('backoffice/projects/index', [
            'projects' => Project::orderBy('sort_order', 'asc')->with(['tags'])->get(),
        ]);
    }

    public function create() {

        $tags = Tag::orderBy('sort_order', 'asc')->get();
        $stacks = Stack::orderBy('sort_order', 'asc')->with('items')->get();

        return Inertia::render('backoffice/projects/create', [
            'tags' => $tags,
            'stacks' => $stacks,
        ]);
    }

    public function store(RequestStore $request) {
        $validated = $request->validated();

        // Create the project
        $project = Project::create($validated);

        // Attach tags if provided
        if (isset($validated['tags'])) {
            $project->tags()->attach(array_column($validated['tags'], 'id'));
        }

        // Attach stack items if provided
        if (isset($validated['stackItems'])) {
            $project->stackItems()->attach(array_column($validated['stackItems'], 'id'));
        }

        // Attachments
        if( isset($validated['attachments']) ) {
            foreach($validated['attachments'] as $attachmentData) {

                $file = $attachmentData['file'];
                $filePath = $file->store('attachments', 'public');

                $attachment = Attachment::create([
                    'title' => $attachmentData['title'] ?? null,
                    'description' => null,
                    'file_name' => $file->getClientOriginalName(),
                    'file_path' => $filePath,
                    'mime_type' => $file->getClientMimeType(),
                    'file_extension' => $file->getClientOriginalExtension(),
                    'file_size' => $file->getSize(),
                ]);

                $project->attachments()->attach($attachment->id);
            }
        }

        return redirect()->route('backoffice.projects.index')->with('success', 'Project created successfully.');
    }

    public function edit(Project $project) {

        $tags = Tag::orderBy('sort_order', 'asc')->get();
        $stacks = Stack::orderBy('sort_order', 'asc')->with('items')->get();

        return Inertia::render('backoffice/projects/edit', [
            'project' => $project->load(['tags', 'stackItems', 'attachments']),
            'tags' => $tags,
            'stacks' => $stacks,
        ]);
    }

    public function update(RequestUpdate $request, Project $project) {
        
        $validated = $request->validated();

        // Update the project
        $project->update($validated);

        // Sync tags
        if (isset($validated['tags'])) {
            $project->tags()->sync(array_column($validated['tags'], 'id'));
        } else {
            $project->tags()->detach();
        }

        // Sync stack items
        if (isset($validated['stackItems'])) {
            $project->stackItems()->sync(array_column($validated['stackItems'], 'id'));
        } else {
            $project->stackItems()->detach();
        }

        // Attachments
        if( isset($validated['attachments']) ) {
            $existingAttachmentsInRequest = [];
            $existingAttachmentsInModel = $project->attachments()->get();

            $index = 0;

            foreach($validated['attachments'] as $attachment) {
                if( !isset($attachment['file']) ) {
                    continue;
                }

                // New File
                if( $attachment['file'] instanceof UploadedFile ) {

                    // dd( 'new file', $attachment );

                    // validation for file
                    $validation = Validator::make(
                        ['file' => $attachment['file']],
                        ['file' => ['required', 'file', 'mimes:jpg,jpeg,png', 'max:5120']]
                    );

                    if ($validation->fails()) {
                        continue; // Skip invalid files
                    }

                    $file = $attachment['file'];
                    $filePath = $file->store('attachments', 'public');

                    $newAttachment = Attachment::create([
                        'title' => $attachment['title'] ?? null,
                        'description' => null,
                        'file_name' => $file->getClientOriginalName(),
                        'file_path' => $filePath,
                        'mime_type' => $file->getClientMimeType(),
                        'file_extension' => $file->getClientOriginalExtension(),
                        'file_size' => $file->getSize(),
                    ]);

                    $project->attachments()->attach($newAttachment->id);
                } 
                // Existing File
                else {
                    $existingAttachmentsInRequest[] = $attachment['id'];

                    // Update title & sort order (based on index) if changed
                    $project->attachments()->updateExistingPivot($attachment['id'], [
                        'sort_order' => $index,
                    ]);

                    Attachment::where('id', $attachment['id'])->update([
                        'title' => $attachment['title'] ?? null,
                    ]);
                }

                $index++;
            }

            // Detach removed attachments
            foreach($existingAttachmentsInModel as $attachment) {
                if( !in_array($attachment->id, $existingAttachmentsInRequest) ) {
                    Storage::delete($attachment->file_path);
                    $project->attachments()->detach($attachment->id);
                    $attachment->delete();
                }
            }
        }

        return redirect()->route('backoffice.projects.index')->with('success', 'Project updated successfully.');
    }

    public function sort(Request $request) {
        $validated = $request->validate([
            'projects' => 'required|array',
            'projects.*.id' => 'required|integer|exists:projects,id',
            'projects.*.sort_order' => 'required|integer',
        ]);

        // To avoid unique constraint issues, we set a high temporary sort_order first
        foreach ($validated['projects'] as $index => $project) {
            Project::where('id', $project['id'])->update(['sort_order' => $index + 9000]);
        }

        // Now set the correct sort_order
        foreach ($validated['projects'] as $index => $project) {
            Project::where('id', $project['id'])->update(['sort_order' => $index]);
        }

        return redirect()->back()->with('success', 'Projects sorted successfully.');
    }

    public function destroy(Project $project) {
        $project->delete();
        return redirect()->route('backoffice.projects.index')->with('success', 'Project deleted successfully.');
    }
}
