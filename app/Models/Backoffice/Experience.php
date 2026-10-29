<?php

declare(strict_types=1);

namespace App\Models\Backoffice;

use App\Traits\HasLocalizedFields;
use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    use HasLocalizedFields;

    /**
     * Les attributs assignables en masse.
     *
     * @var list<string>
     */
    protected $fillable = [
        'sort_order',
        'company',
        'job_fr',
        'job_en',
        'status_fr',
        'status_en',
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
        'job',
        'status',
        'description',
    ];

    public function getJobAttribute(): ?string
    {
        return $this->getLocalizedField('job');
    }

    public function getStatusAttribute(): ?string
    {
        return $this->getLocalizedField('status');
    }

    public function getDescriptionAttribute(): ?string
    {
        return $this->getLocalizedField('description');
    }
}
