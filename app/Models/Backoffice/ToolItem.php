<?php

declare(strict_types=1);

namespace App\Models\Backoffice;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ToolItem extends Model
{
    /**
     * Les attributs assignables en masse.
     *
     * @var list<string>
     */
    protected $fillable = [
        'tool_id',
        'sort_order',
        'name',
    ];

    /**
     * Catégorie d'outils parente.
     */
    public function tool(): BelongsTo
    {
        return $this->belongsTo(Tool::class);
    }
}
