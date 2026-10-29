<?php

declare(strict_types=1);

namespace App\Http\Requests\Settings;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class Password extends FormRequest
{
    /**
     * Détermine si l'utilisateur est autorisé à exécuter cette requête.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Règles de validation pour la modification du mot de passe.
     *
     * @return array<string, array<int, string>>
     */
    public function rules(): array
    {
        return [
            'current_password' => ['required', 'string', 'current_password'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ];
    }
}
