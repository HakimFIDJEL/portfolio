<?php

namespace App\Models\Backoffice;

use Illuminate\Database\Eloquent\Model;
use App\Traits\HasLocalizedFields;

class Education extends Model
{
    use HasLocalizedFields;

    protected $fillable = [
        'sort_order', 'institution', 'type_fr', 'type_en', 
        'duration', 'description_fr', 'description_en'
    ];

    protected $localized = ['type', 'description'];
}
