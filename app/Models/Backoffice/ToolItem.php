<?php

namespace App\Models\Backoffice;

use Illuminate\Database\Eloquent\Model;
use App\Traits\HasLocalizedFields;

class ToolItem extends Model
{
    use HasLocalizedFields;

    protected $fillable = ['tool_id', 'sort_order', 'name_fr', 'name_en'];
    protected $appends = ['name'];

    public function tool()
    {
        return $this->belongsTo(Tool::class);
    }

    // Accessor for localized 'name' field
    public function getNameAttribute() {
        return $this->getLocalizedField('name');
    }
}
