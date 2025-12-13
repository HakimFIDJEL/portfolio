<?php

namespace App\Models\Backoffice;

use Illuminate\Database\Eloquent\Model;
use App\Traits\HasLocalizedFields;

class Contact extends Model
{
    use HasLocalizedFields;

    protected $fillable = ['sort_order', 'icon', 'label', 'link', 'name_fr', 'name_en'];
    protected $localized = ['name'];
}
