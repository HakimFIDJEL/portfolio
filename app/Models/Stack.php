<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\HasLocalizedFields;

class Stack extends Model
{
    use HasLocalizedFields;

    protected $fillable = ['sort_order', 'name_fr', 'name_en'];
    protected $localized = ['name'];

    public function items()
    {
        return $this->hasMany(StackItem::class);
    }
}
