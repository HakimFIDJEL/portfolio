<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\HasLocalizedFields;

class Project extends Model
{
    use HasLocalizedFields;

    protected $fillable = [
        'sort_order', 'slug_fr', 'slug_en',
        'title_fr', 'title_en', 'subtitle_fr', 'subtitle_en',
        'description_fr', 'description_en', 'feedback_fr', 'feedback_en',
        'what_i_learned_fr', 'what_i_learned_en',
        'source_code_url', 'live_demo_url', 'end_date'
    ];

    protected $localized = [
        'slug', 'title', 'subtitle', 'description', 'feedback', 'what_i_learned'
    ];

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }

    public function stackItems()
    {
        return $this->belongsToMany(StackItem::class);
    }

    public function attachments()
    {
        return $this->belongsToMany(Attachment::class);
    }
}
