<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Area extends Model
{
    // エリアが複数の注文に関連している
    public function orders()
    {
        return $this->belongsToMany(Order::class, 'order_areas', 'area_id', 'order_id')->withTimestamps();
    }
}
