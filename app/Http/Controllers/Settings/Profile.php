<?php

declare(strict_types=1);

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\Profile as RequestsProfile;
use App\Models\Attachment;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class Profile extends Controller
{
    /**
     * Afficher la page des paramètres de profil.
     */
    public function edit(): Response
    {
        return Inertia::render('settings/profile');
    }

    /**
     * Mettre à jour les informations du profil utilisateur.
     */
    public function update(RequestsProfile $request): RedirectResponse
    {
        $data = $request->validated();
        /** @var User $user */
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
        Cache::forget('public_user_profile');

        return redirect()
            ->route('settings.profile.edit')
            ->with(['success' => __('settings.flash.profile_updated')]);
    }

    /**
     * Gérer la persistance ou la suppression des pièces jointes de profil (avatar, CV).
     */
    private function handleAttachmentUpdate(User $user, string $relationName, string $requestKey, string $diskFolder, Request $request): void
    {
        /** @var Attachment|null $currentAttachment */
        $currentAttachment = $user->$relationName;

        if ($request->exists($requestKey) && $request->input($requestKey) === null && $currentAttachment) {
            Storage::disk('public')->delete($currentAttachment->file_path);
            $currentAttachment->delete();
            $user->$relationName()->dissociate();
        } elseif ($request->hasFile($requestKey)) {
            /** @var UploadedFile $file */
            $file = $request->file($requestKey);
            $storagePath = "users/{$user->id}/{$diskFolder}";

            if ($currentAttachment) {
                Storage::disk('public')->delete($currentAttachment->file_path);
                $currentAttachment->delete();
            }

            $path = Storage::disk('public')->putFile($storagePath, $file);

            if ($path !== false) {
                $attachment = Attachment::create([
                    'file_name' => $file->getClientOriginalName(),
                    'file_path' => $path,
                    'mime_type' => $file->getClientMimeType() ?: 'application/octet-stream',
                    'file_extension' => $file->getClientOriginalExtension() ?: pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION),
                    'file_size' => $file->getSize() ?: 0,
                ]);

                $user->$relationName()->associate($attachment);
            }
        }
    }
}
