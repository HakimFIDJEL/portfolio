<?php

namespace App\Models\Backoffice;

use Illuminate\Database\Eloquent\Model;
use App\Traits\HasLocalizedFields;

class Education extends Model
{
    use HasLocalizedFields;

    protected $table = 'educations';

    protected $fillable = [
        'sort_order', 'institution', 'type_fr', 'type_en', 
        'duration', 'description_fr', 'description_en'
    ];

    protected $appends = ['type', 'description'];

    // Accessor for localized 'type' field
    public function getTypeAttribute() {
        return $this->getLocalizedField('type');
    }

    // Accessor for localized 'description' field
    public function getDescriptionAttribute() {
        return $this->getLocalizedField('description');
    }

}