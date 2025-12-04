<?php

// app/Http/Controllers/Settings/Profile.php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\UploadedFile; // Ajouté
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request; // Ajouté pour le type-hinting de la requête dans la méthode privée

// Requests
use App\Http\Requests\Settings\Profile as RequestsProfile;
use App\Http\Requests\Settings\Lang as RequestsLang;
use App\Http\Requests\Settings\DeleteAccount as RequestsDeleteAccount;

// Models
use App\Models\User;
use App\Models\Attachment;

class Profile extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function edit(): Response
    {
        return Inertia::render('settings/profile');
    }

    /**
     * Update the user's profile settings.
     *
     * @param \App\Http\Requests\Settings\Profile $request
     */
    public function update(RequestsProfile $request): RedirectResponse
    {
        $data = $request->validated();
        $user = Auth::user();

        $emailChanged = array_key_exists('email', $data) && $data['email'] !== $user->email;

        unset($data['avatar'], $data['resume']);

        $user->fill($data);

        if ($emailChanged) {
            $user->email_verified_at = null;
        }

        $this->handleAttachmentUpdate($user, 'avatar', 'avatar', 'avatars', $request);

        $this->handleAttachmentUpdate($user, 'resume', 'resume', 'resumes', $request);

        $user->save();
        
        Auth::setUser($user->fresh(['avatar', 'resume']));

        return redirect()
            ->route('settings.profile.edit')
            ->with(['success' => __('settings.flash.profile_updated')]);
    }
    /**
     * Handle attachment update logic for avatar and resume.
     *
     * @param User $user
     * @param string $relationName The name of the relation on the User model ('avatar' or 'resume')
     * @param string $requestKey The key in the request ('avatar' or 'resume')
     * @param string $diskFolder The folder on disk to store the files ('avatars' or 'resumes')
     * @param Request $request The incoming request
     */
    private function handleAttachmentUpdate(User $user, string $relationName, string $requestKey, string $diskFolder, Request $request): void
    {
        $currentAttachment = $user->$relationName;
        
        if ($request->exists($requestKey) && $request->input($requestKey) === null && $currentAttachment) {
            Storage::disk('public')->delete($currentAttachment->file_path);
            $currentAttachment->delete();
            $user->$relationName()->dissociate();
        }

        elseif ($request->hasFile($requestKey)) {
            /** @var UploadedFile $file */
            $file = $request->file($requestKey);
            $storagePath = "users/{$user->id}/{$diskFolder}";
            if ($currentAttachment) {
                Storage::disk('public')->delete($currentAttachment->file_path);
                $currentAttachment->delete();
            }

            $path = Storage::disk('public')->putFile($storagePath, $file);

            $attachment = Attachment::create([
                'file_name'      => $file->getClientOriginalName(),
                'file_path'      => $path,
                'mime_type'      => $file->getMimeType(),
                'file_extension' => $file->getClientOriginalExtension(),
                'file_size'      => $file->getSize(),
            ]);

            $user->$relationName()->associate($attachment);
        }
    }
}