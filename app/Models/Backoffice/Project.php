<?php

namespace App\Models\Backoffice;

use Illuminate\Database\Eloquent\Model;
use App\Traits\HasLocalizedFields;

use App\Models\Attachment;

class Project extends Model
{
    use HasLocalizedFields;

    protected $fillable = [
        'sort_order', 'slug_fr', 'slug_en',
        'title_fr', 'title_en', 'subtitle_fr', 'subtitle_en',
        'description_fr', 'description_en', 'feedback_fr', 'feedback_en',
        'what_i_learned_fr', 'what_i_learned_en',
        'source_code_url', 'live_demo_url', 'end_date', 'is_new',
    ];

    protected $appends = [
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

    // Accessor for localized 'slug' field
    public function getSlugAttribute() {
        return $this->getLocalizedField('slug');    
    }

    // Accessor for localized 'title' field
    public function getTitleAttribute() {
        return $this->getLocalizedField('title');
    }

    // Accessor for localized 'subtitle' field
    public function getSubtitleAttribute() {
        return $this->getLocalizedField('subtitle');
    }

    // Accessor for localized 'description' field
    public function getDescriptionAttribute() {
        return $this->getLocalizedField('description');
    }

    // Accessor for localized 'feedback' field
    public function getFeedbackAttribute() {
        return $this->getLocalizedField('feedback');
    }

    // Accessor for localized 'what_i_learned' field
    public function getWhatILearnedAttribute() {
        return $this->getLocalizedField('what_i_learned');
    }
}
