<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class ProjectImage extends Model
{
    protected $fillable = [
        'project_id',
        'url',
        'caption',
        'order',
        'size',
        'type',
        'extension',
        'mime_type',
    ];

    public function project() {
        return $this->belongsTo(Project::class);
    }

    public function getImageUrl() {
        return Storage::url($this->url);
    }


}
