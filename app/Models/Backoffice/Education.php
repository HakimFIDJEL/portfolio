<?php

declare(strict_types=1);

namespace App\Models\Backoffice;

use App\Traits\HasLocalizedFields;
use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    use HasLocalizedFields;

    protected $table = 'educations';

    /**
     * Les attributs assignables en masse.
     *
     * @var list<string>
     */
    protected $fillable = [
        'sort_order',
        'institution',
        'type_fr',
        'type_en',
        'duration',
        'description_fr',
        'description_en',
    ];

    /**
     * Attributs calculés inclus dans la sérialisation.
     *
     * @var list<string>
     */
    protected $appends = [
        'type',
        'description',
    ];

    public function getTypeAttribute(): ?string
    {
        return $this->getLocalizedField('type');
    }

    public function getDescriptionAttribute(): ?string
    {
        return $this->getLocalizedField('description');
    }
}
