<?php

namespace App\Models\Backoffice;

use Illuminate\Database\Eloquent\Model;
use App\Traits\HasLocalizedFields;

class Stack extends Model
{
    use HasLocalizedFields;

    protected $fillable = ['sort_order', 'name_fr', 'name_en'];
    protected $appends = ['name'];

    public function items()
    {
        return $this->hasMany(StackItem::class);
    }

    // Accessor for localized 'name' field
    public function getNameAttribute() {
        return $this->getLocalizedField('name');
    }
}
