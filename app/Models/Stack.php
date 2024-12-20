<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stack extends Model
{
    use HasFactory;

    protected $fillable = [
        'label',
        'category_id'
    ];

    public function projects() {
        return $this->belongsToMany(Project::class, 'project_stacks') ?? null;
    }

    public function category() {
        return $this->belongsTo(StackCategory::class);
    }
}
