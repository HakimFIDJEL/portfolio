<?php

namespace App\Models\Backoffice;

use Illuminate\Database\Eloquent\Model;
use App\Traits\HasLocalizedFields;

class Tool extends Model
{
    use HasLocalizedFields;

    protected $fillable = ['sort_order', 'name_fr', 'name_en'];
    protected $localized = ['name'];

    public function items()
    {
        return $this->hasMany(ToolItem::class);
    }
}
