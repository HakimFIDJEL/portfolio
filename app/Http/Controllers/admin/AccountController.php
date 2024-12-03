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


class AccountController extends Controller
{
    public function index() {
        return Inertia::render('admin/account/Index', [
            'user' => Auth::user()
        ]);
    }


    public function updatePassword(User $user, PasswordRequest $request) {
        $validated = $request->validated();

        if($user->id != Auth::id()) {
            return redirect()->route('admin.account.index')->with(['error' => 'You are not authorized to update this password']);
        }

        $user->update([
            'password' => Hash::make($validated['password'])
        ]);

        return redirect()->route('admin.account.index')->with(['success' => 'Password updated successfully']);
    }


    public function updateResume(User $user, ResumeRequest $request) {
        $validated = $request->validated();

        if($user->id != Auth::id()) {
            return redirect()->route('admin.account.index')->with(['error' => 'You are not authorized to update this resume']);
        }
        
        // Delete old resume
        if($user->resume_path) {
            Storage::delete($user->resume);
            $user->update([
                'resume_path'       => null,
                'resume_extension'  => null,
                'resume_size'       => null,
                'resume_type'       => null,
            ]);
        }
        
        // Upload new resume    
        if($request->file('resume')) {
            $resume     = $request->file('resume');
            $fileName   = Str::random(20) . '.' . $resume->getClientOriginalExtension();

            $user->update([
                'resume_path' => Storage::disk('public')->putFileAs('resumes', $resume, $fileName),
                'resume_extension' => $resume->getClientOriginalExtension(),
                'resume_size' => $resume->getSize(),
                'resume_type' => $resume->getClientMimeType(),
            ]);
        }

        return redirect()->route('admin.account.index')->with(['success' => 'Resume updated successfully']);
    }

}
