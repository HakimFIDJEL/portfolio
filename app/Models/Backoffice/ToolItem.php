<?php

namespace App\Models\Backoffice;

use Illuminate\Database\Eloquent\Model;
use App\Traits\HasLocalizedFields;

class ToolItem extends Model
{
    protected $fillable = ['tool_id', 'sort_order', 'name'];

    public function tool()
    {
        return $this->belongsTo(Tool::class);
    }
}
