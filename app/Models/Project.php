<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Stack;
use App\Models\Timeline;
use App\Models\ProjectImage;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'type',
        'title',
        'subtitle',
        'end_date',
        'description',
        'work_in_progress',
        'feedback',
        'source_code_url',
        'live_demo_url',
        'timeline_url',
    ];

    public function stacks() {
        return $this->belongsToMany(Stack::class, 'project_stacks') ?? null;
    }

    public function timeline() {
        return $this->hasMany(Timeline::class) ?? null;
    }

    public function images() {
        return $this->hasMany(ProjectImage::class) ?? null;
    }

}
