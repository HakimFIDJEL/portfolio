<?php

namespace App\Models\Backoffice;

use Illuminate\Database\Eloquent\Model;
use App\Traits\HasLocalizedFields;

class Tag extends Model
{
    use HasLocalizedFields;

    protected $fillable = [
        'sort_order',
        'name_fr',
        'name_en',
    ];

    protected $appends = ['name'];

    public function projects()
    {
        return $this->belongsToMany(Project::class);
    }

    // Accessor for localized 'name' field
    public function getNameAttribute() {
        return $this->getLocalizedField('name');
    }
}
