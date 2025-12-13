<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\HasLocalizedFields;

class StackItem extends Model
{
    use HasLocalizedFields;

    protected $fillable = ['stack_id', 'sort_order', 'name_fr', 'name_en'];
    protected $localized = ['name'];

    public function stack()
    {
        return $this->belongsTo(Stack::class);
    }
}
