<?php

declare(strict_types=1);

namespace App\Traits;

use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;

trait HasLocalizedFields
{
    /**
     * Surcharge pour supporter la résolution dynamique des champs localisés.
     */
    public function getAttribute($key): mixed
    {
        if (in_array($key, $this->localized ?? [], true)) {
            $locale = (string) Session::get('locale', App::getLocale());
            $localizedKey = "{$key}_{$locale}";

            return parent::getAttribute($localizedKey);
        }

        return parent::getAttribute($key);
    }

    /**
     * Surcharge pour supporter la mutation dynamique des champs localisés.
     */
    public function setAttribute($key, $value): mixed
    {
        if (in_array($key, $this->localized ?? [], true)) {
            $locale = (string) Session::get('locale', App::getLocale());
            $localizedKey = "{$key}_{$locale}";

            return parent::setAttribute($localizedKey, $value);
        }

        return parent::setAttribute($key, $value);
    }

    /**
     * Récupérer la valeur brute du champ localisé selon la langue courante.
     */
    public function getLocalizedField(string $field): ?string
    {
        $locale = (string) Session::get('locale', App::getLocale());
        $localizedKey = "{$field}_{$locale}";

        $value = $this->attributes[$localizedKey] ?? null;

        return $value !== null ? (string) $value : null;
    }
}
