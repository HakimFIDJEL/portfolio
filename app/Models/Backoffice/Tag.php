<?php

declare(strict_types=1);

namespace App\Models\Backoffice;

use App\Traits\HasLocalizedFields;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Tag extends Model
{
    use HasLocalizedFields;

    /**
     * Les attributs assignables en masse.
     *
     * @var list<string>
     */
    protected $fillable = [
        'sort_order',
        'name_fr',
        'name_en',
    ];

    /**
     * Attributs calculés inclus dans la sérialisation.
     *
     * @var list<string>
     */
    protected $appends = ['name'];

    /**
     * Projets utilisant ce tag.
     */
    public function projects(): BelongsToMany
    {
        return $this->belongsToMany(Project::class, 'project_tags');
    }

    public function getNameAttribute(): ?string
    {
        return $this->getLocalizedField('name');
    }
}
