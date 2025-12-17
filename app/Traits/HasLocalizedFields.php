<?php

namespace App\Traits;

use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\App;

trait HasLocalizedFields
{
    public function getAttribute($key)
    {
        if (in_array($key, $this->localized ?? [])) {
            $locale = Session::get('locale', App::getLocale()); // récupère la langue de session
            $localizedKey = "{$key}_{$locale}";
            return parent::getAttribute($localizedKey);
        }

        return parent::getAttribute($key);
    }

    public function setAttribute($key, $value)
    {
        if (in_array($key, $this->localized ?? [])) {
            $locale = Session::get('locale', App::getLocale());
            $localizedKey = "{$key}_{$locale}";
            return parent::setAttribute($localizedKey, $value);
        }

        return parent::setAttribute($key, $value);
    }

    public function getLocalizedField($field)
    {
        $locale = Session::get('locale', App::getLocale());
        $localizedKey = "{$field}_{$locale}";
        return $this->attributes[$localizedKey] ?? null;
    }
}
