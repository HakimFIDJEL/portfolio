<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectTimeline extends Model
{
    protected $fillable = [
        'project_id',
        'date',
        'duration',
        'title',
    ];

    public function project() {
        return $this->belongsTo(Project::class);
    }
}
