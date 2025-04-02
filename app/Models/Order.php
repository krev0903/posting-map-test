<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = ['user_id', 'total_price',];
    // 注文が1人のユーザーに属している
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // 注文が複数のエリアに関連している
    public function areas()
    {
        return $this->belongsToMany(Area::class, 'order_areas', 'order_id', 'area_id')->withTimestamps();
    }
}