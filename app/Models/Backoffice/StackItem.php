<?php

declare(strict_types=1);

namespace App\Models\Backoffice;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class StackItem extends Model
{
    /**
     * Les attributs assignables en masse.
     *
     * @var list<string>
     */
    protected $fillable = [
        'stack_id',
        'sort_order',
        'name',
    ];

    /**
     * Stack parente.
     */
    public function stack(): BelongsTo
    {
        return $this->belongsTo(Stack::class);
    }

    /**
     * Projets associés à cette technologie.
     */
    public function projects(): BelongsToMany
    {
        return $this->belongsToMany(Project::class, 'project_stack_items');
    }
}
