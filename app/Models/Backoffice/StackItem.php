<?php

namespace App\Models\Backoffice;

use Illuminate\Database\Eloquent\Model;
use App\Traits\HasLocalizedFields;

class StackItem extends Model
{
    protected $fillable = ['stack_id', 'sort_order', 'name'];

    public function stack()
    {
        return $this->belongsTo(Stack::class);
    }
}
