<?php

namespace App\Models\Backoffice;

use Illuminate\Database\Eloquent\Model;
use App\Traits\HasLocalizedFields;

class StackItem extends Model
{
    use HasLocalizedFields;

    protected $fillable = ['stack_id', 'sort_order', 'name_fr', 'name_en'];
    protected $appends = ['name'];

    public function stack()
    {
        return $this->belongsTo(Stack::class);
    }

    // Accessor for localized 'name' field
    public function getNameAttribute() {
        return $this->getLocalizedField('name');
    }
}
