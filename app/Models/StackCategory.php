<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StackCategory extends Model
{
    protected $fillable = [
        'label'
    ];

    public function stacks() {
        return $this->hasMany(Stack::class, 'category_id');
    }
}
