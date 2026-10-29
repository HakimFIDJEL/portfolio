<?php

declare(strict_types=1);

namespace App\Models\Backoffice;

use App\Traits\HasLocalizedFields;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Stack extends Model
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
     * Technologies rattachées à cette stack.
     */
    public function items(): HasMany
    {
        return $this->hasMany(StackItem::class);
    }

    public function getNameAttribute(): ?string
    {
        return $this->getLocalizedField('name');
    }
}
