<?php

namespace App\Traits;

use Illuminate\Support\Facades\Session;

trait HasLocalizedFields
{
    public function getAttribute($key)
    {
        if (in_array($key, $this->localized ?? [])) {
            $locale = Session::get('locale', 'en'); // récupère la langue de session
            $localizedKey = "{$key}_{$locale}";
            return parent::getAttribute($localizedKey);
        }

        return parent::getAttribute($key);
    }

    public function setAttribute($key, $value)
    {
        if (in_array($key, $this->localized ?? [])) {
            $locale = Session::get('locale', 'en');
            $localizedKey = "{$key}_{$locale}";
            return parent::setAttribute($localizedKey, $value);
        }

        return parent::setAttribute($key, $value);
    }
}
