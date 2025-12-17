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

    protected $appends = ['job', 'status', 'description'];

    // Accessor for localized 'job' field
    public function getJobAttribute() {
        return $this->getLocalizedField('job');
    }

    // Accessor for localized 'status' field
    public function getStatusAttribute() {
        return $this->getLocalizedField('status');
    }

    // Accessor for localized 'description' field
    public function getDescriptionAttribute() {
        return $this->getLocalizedField('description');
    }
}
