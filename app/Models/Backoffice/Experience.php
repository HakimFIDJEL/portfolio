<?php

namespace App\Models\Backoffice;

use Illuminate\Database\Eloquent\Model;
use App\Traits\HasLocalizedFields;

class Experience extends Model
{
    use HasLocalizedFields;

    protected $fillable = [
        'sort_order', 'company', 'job_fr', 'job_en', 
        'status_fr', 'status_en', 'duration', 'description_fr', 'description_en'
    ];

    protected $localized = ['job', 'status', 'description'];
}
