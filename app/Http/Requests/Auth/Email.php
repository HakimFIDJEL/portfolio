<?php

declare(strict_types=1);

namespace App\Http\Requests\Auth;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class Email extends FormRequest
{
    /**
     * Détermine si l'utilisateur est autorisé à exécuter cette requête.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Règles de validation pour la mise à jour d'email.
     *
     * @return array<string, array<int, mixed>>
     */
    public function rules(): array
    {
        return [
            'email' => ['required', 'string', 'email', Rule::unique(User::class)->ignore(Auth::id())],
            'password' => ['required', 'string'],
        ];
    }
}
