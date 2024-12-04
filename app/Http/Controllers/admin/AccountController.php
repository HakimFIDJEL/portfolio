<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

use Inertia\Inertia;

// Models
use App\Models\User;

// Requests
use App\Http\Requests\account\PasswordRequest;
use App\Http\Requests\account\ResumeRequest;
use App\Http\Requests\account\PfpRequest;


class AccountController extends Controller
{
    public function index() {
        return Inertia::render('admin/account/Index', [
            'user' => Auth::user()
        ]);
    }


    public function updatePassword(PasswordRequest $request) {
        $validated = $request->validated();

        $user = Auth::user();

        if(!Hash::check($validated['current_password'], $user->password)) {
            return redirect()->back()->withInput()->withErrors(['current_password' => 'The current password is incorrect']);
        }


        $user->update([
            'password' => Hash::make($validated['password'])
        ]);

        return redirect()->route('admin.account.index')->with(['success' => 'Password updated successfully']);
    }

    public function updatePfp(PfpRequest $request) {
        $user = Auth::user();
        $validated = $request->validated();

        // Delete old pfp if exists
        if($user->pfp_url) {
            Storage::delete($user->pfp_url);
            $user->update([
                'pfp_label'      => null,
                'pfp_url'       => null,
                'pfp_extension'  => null,
                'pfp_size'       => null,
                'pfp_mime'       => null,
            ]);
        }

        // Upload new pfp
        if($request->file('pfp')) {
            $pfp = $validated['pfp'];
            $file = $pfp['file'];
            $label = $pfp['label'];

            $fileName = $label . '-' . Str::random(10) . '.' . $file->getClientOriginalExtension();

            $user->update([
                'pfp_label'  => $label,
                'pfp_url'    => Storage::disk('public')->putFileAs('pfp', $file, $fileName),
                'pfp_extension' => $file->getClientOriginalExtension(),
                'pfp_size'  => $file->getSize(),
                'pfp_mime'  => $file->getClientMimeType(),
            ]);
        }

        return redirect()->back()->with(['success' => 'Profile picture updated successfully']);
    }

    public function deletePfp() {
        $user = Auth::user();

        if($user->pfp_url) {
            Storage::delete($user->pfp_url);
            $user->update([
                'pfp_label'      => null,
                'pfp_url'       => null,
                'pfp_extension'  => null,
                'pfp_size'       => null,
                'pfp_mime'       => null,
            ]);
        }

        return redirect()->route('admin.account.index')->with(['success' => 'Profile picture deleted successfully']);
    }
    
    public function updateResume(ResumeRequest $request) {

        $user = Auth::user();

        $validated = $request->validated();

        
        // Delete old resume if exists
        if($user->resume_path) {
            Storage::delete($user->resume_path);
            $user->update([
                'resume_label'      => null,
                'resume_path'       => null,
                'resume_ext'        => null,
                'resume_size'       => null,
                'resume_type'       => null,
            ]);
        }

        // Upload new resume    
        if($request->file('resume')) {

            $resume = $validated['resume'];
            $file   = $resume['file'];
            $label  = $resume['label'];

            $fileName   = $label . '-' . Str::random(10) . '.' . $file->getClientOriginalExtension();

            $user->update([
                'resume_label'  => $label,
                'resume_path'   => Storage::disk('public')->putFileAs('resumes', $file, $fileName),
                'resume_ext'    => $file->getClientOriginalExtension(),
                'resume_size'   => $file->getSize(),
                'resume_type'   => $file->getClientMimeType(),
            ]);
        }

        return redirect()->back()->with(['success' => 'Resume updated successfully']);
    }

    public function deleteResume() {

        
        $user = Auth::user();   
        
        if($user->resume_path) {
            Storage::delete($user->resume_path);
            $user->update([
                'resume_label'      => null,
                'resume_path'       => null,
                'resume_ext'        => null,
                'resume_size'       => null,
                'resume_type'       => null,
            ]);
        }


        return redirect()->route('admin.account.index')->with(['success' => 'Resume deleted successfully']);
    }

}
