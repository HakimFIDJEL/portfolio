<?php

declare(strict_types=1);

namespace App\Models\Backoffice;

use App\Traits\HasLocalizedFields;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasLocalizedFields;

    /**
     * Les attributs assignables en masse.
     *
     * @var list<string>
     */
    protected $fillable = [
        'sort_order',
        'icon',
        'label',
        'link',
        'name_fr',
        'name_en',
    ];

    /**
     * Attributs calculés inclus dans la sérialisation.
     *
     * @var list<string>
     */
    protected $appends = ['name'];

    public function getNameAttribute(): ?string
    {
        return $this->getLocalizedField('name');
    }
}
