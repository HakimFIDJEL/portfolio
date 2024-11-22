<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

// Models
use App\Models\User;

// Requests
use App\Http\Requests\auth\LoginRequest;
use App\Http\Requests\auth\PasswordForgetRequest;
use App\Http\Requests\auth\PasswordResetRequest;
use App\Http\Requests\auth\PasswordChangeRequest;

// Mails
use App\Mail\auth\PasswordReset;

// Jobs
use App\Jobs\SendEmailJob;



class AuthController extends Controller
{
    // Get Login
    public function login()
    {
        // If user is already logged in, redirect to home
        if(Auth::check()) {

            // If the password expired
            $user = Auth::user();
            if($user->password_expires_at < now()) {
                return redirect()->route('auth.password.change')->with(['error' => 'Votre mot de passe a expiré']);
            }

            return redirect()->route('admin.home')->with(['success' => 'Vous êtes connecté']);
            
        }

        // If user is not logged in,
        return Inertia::render('auth/Login');
    }

  
    // Get Logout
    public function logout()
    {
        $user = Auth::user();
        if($user) {
            Auth::logout();
            return redirect()->route('auth.login')->with(['success' => 'Vous êtes maintenant déconnecté']);
        } else {
            return redirect()->route('auth.login')->with(['error' => 'Vous n\'êtes pas connecté']);
        }
    }

   
    // Post Login
    public function loginPost(LoginRequest $request)
    {
        $data = $request->all();

        $remember = $request->has('remember');

        if(Auth::attempt(['email' => $data['email'], 'password' => $data['password']], $remember)) {

            $user = Auth::user();

            if(!$user->email_verified_at) {
                $user->user_token = Str::random(30);
                $user->user_token_expires_at = now()->addHours(24);

                $this->sendEmailVerification();
                return redirect()->route('auth.email-verification', ['user_token' => $user->user_token]);
            }

            return redirect()->route('auth.login')->with(['success' => 'Vous êtes maintenant connecté']);
        } else{
            return redirect()->route('auth.login')->with(['error' => 'Email ou mot de passe incorrect']);
        }

    }

   

    // Post Logout
    public function logoutPost()
    {
        $user = Auth::user();
        if($user) {
            Auth::logout();
            return redirect()->route('main.index')->with(['success' => 'Vous êtes maintenant déconnecté']);
        } else {
            return redirect()->route('auth.login')->with(['error' => 'Vous n\'êtes pas connecté']);
        }
    }

   

   


    // Get Forgot Password
    public function forget()
    {
        return view('auth.password.forget');
    }

    // Get Reset Password
    public function reset(String $password_token = null)
    {
        if(!$password_token) {
            return redirect()->route('auth.password.forget')->with(['error' => 'Token invalide']);
        }

        $user = User::where('password_token', $password_token)->first();

        if(!$user) {
            return redirect()->route('auth.password.forget')->with(['error' => 'Token invalide']);
        }

        if($user->password_token_expires_at < now()) {
            return redirect()->route('auth.password.forget')->with(['error' => 'Token expiré']);
        }

        return view('auth.password.reset')->with(['password_token' => $password_token]);
    }

    // Get Change Password
    public function change()
    {
        $user = Auth::user();

        if(!$user) {
            return redirect()->route('auth.login')->with(['error' => 'Vous n\'êtes pas connecté']);
        }

        if($user->password_expires_at > now()) {
            return redirect()->route('auth.login')->with(['error' => 'Votre mot de passe n\'a pas expiré']);
        }

        return view('auth.password.change');
    }

    // Post Forgot Password
    public function forgetPost(PasswordForgetRequest $request)
    {
        $data = $request->all();
        $email = $data['email'];

        $user = User::where('email', $email)->first();

        if($user) {

            $user->generatePasswordToken();

            // Send email with token
            $mail = new PasswordReset($user);
            SendEmailJob::dispatch($mail);

        }
        
        return redirect()->route('auth.password.forget')->with(['success' => 'Si un compte existe avec cet email, un email de réinitialisation de mot de passe vous a été envoyé']);
    }

    // Post Reset Password
    public function resetPost(PasswordResetRequest $request)
    {
        $data = $request->all();
        $password_token = $data['password_token'];
        $password = $data['password'];

        $user = User::where('password_token', $password_token)->first();

        if(!$user) {
            return redirect()->route('auth.password.forget')->with(['error' => 'Token invalide']);
        }

        if($user->password_token_expires_at < now()) {
            return redirect()->route('auth.password.forget')->with(['error' => 'Token expiré']);
        }

        $user->password = Hash::make($password);
        $user->save();

        $user->removePasswordToken();

        return redirect()->route('auth.login')->with(['success' => 'Mot de passe réinitialisé']);
    }

    // Post Change Password
    public function changePost(PasswordChangeRequest $request)
    {
        $data = $request->all();
        $password = $data['password'];

        $user = Auth::user();

        if(!$user) {
            return redirect()->route('auth.login')->with(['error' => 'Vous n\'êtes pas connecté']);
        }

        if($user->password_expires_at > now()) {
            return redirect()->route('auth.login')->with(['error' => 'Votre mot de passe n\'a pas expiré']);
        }

        if(Hash::check($password, $user->password)) {
            return redirect()->route('auth.password.change')->with(['error' => 'Le nouveau mot de passe doit être différent de l\'ancien']);
        }

        $user->password = Hash::make($password);
        $user->password_expires_at = now()->addYear();

        $user->save();

        return redirect()->route('auth.login')->with(['success' => 'Mot de passe changé']);
    }
}
