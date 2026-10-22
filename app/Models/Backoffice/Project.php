<?php

declare(strict_types=1);

namespace App\Models\Backoffice;

use App\Models\Attachment;
use App\Traits\HasLocalizedFields;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Project extends Model
{
    use HasLocalizedFields;

    /**
     * Les attributs assignables en masse.
     *
     * @var list<string>
     */
    protected $fillable = [
        'sort_order',
        'slug_fr',
        'slug_en',
        'title_fr',
        'title_en',
        'subtitle_fr',
        'subtitle_en',
        'description_fr',
        'description_en',
        'feedback_fr',
        'feedback_en',
        'what_i_learned_fr',
        'what_i_learned_en',
        'source_code_url',
        'live_demo_url',
        'end_date',
        'is_new',
        'type',
    ];

    /**
     * Les accesseurs traduits injectés dans la sérialisation.
     *
     * @var list<string>
     */
    protected $appends = [
        'slug',
        'title',
        'subtitle',
        'description',
        'feedback',
        'what_i_learned',
    ];

    /**
     * Étiquettes associées au projet.
     */
    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class, 'project_tags');
    }

    /**
     * Technologies de la stack utilisées dans le projet.
     */
    public function stackItems(): BelongsToMany
    {
        return $this->belongsToMany(StackItem::class, 'project_stack_items');
    }

    /**
     * Captures et pièces jointes associées au projet.
     */
    public function attachments(): BelongsToMany
    {
        return $this->belongsToMany(Attachment::class, 'attachment_projects')
            ->withPivot('sort_order')
            ->orderBy('pivot_sort_order', 'asc');
    }

    public function getSlugAttribute(): ?string
    {
        return $this->getLocalizedField('slug');
    }

    public function getTitleAttribute(): ?string
    {
        return $this->getLocalizedField('title');
    }

    public function getSubtitleAttribute(): ?string
    {
        return $this->getLocalizedField('subtitle');
    }

    public function getDescriptionAttribute(): ?string
    {
        return $this->getLocalizedField('description');
    }

    public function getFeedbackAttribute(): ?string
    {
        return $this->getLocalizedField('feedback');
    }

    public function getWhatILearnedAttribute(): ?string
    {
        return $this->getLocalizedField('what_i_learned');
    }
}
