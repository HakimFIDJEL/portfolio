<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ToolCategory extends Model
{
    protected $fillable = [
        'label'
    ];

    public function tools() {
        return $this->hasMany(Tool::class, 'category_id');
    }
}
