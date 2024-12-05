<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Stack;
use App\Models\ProjectTimeline;
use App\Models\ProjectImage;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title',
        'subtitle',
        'type',
        'end_date',
        'work_in_progress',
        'description',
        'feedback',

        'source_code_url',
        'live_demo_url',
        'timeline_url',
    ];

    public function stacks() {
        return $this->belongsToMany(Stack::class, 'project_stacks')->orderBy('id', 'asc') ?? null;
    }

    public function timeline() {
        return $this->hasMany(ProjectTimeline::class)->orderBy('date', 'asc') ?? null;
    }

    public function images() {
        return $this->hasMany(ProjectImage::class)->orderBy('id', 'asc') ?? null;
    }

}
