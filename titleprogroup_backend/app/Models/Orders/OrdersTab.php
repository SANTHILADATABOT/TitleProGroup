<?php

namespace App\Models\Orders;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrdersTab extends Model
{
    use HasFactory;
    protected $table = 'orders_tab';
    protected $fillable = [
        'id', 'last_changes_datetime', 'user_id', 'tab_id', 'created_ipaddress', 'updated_ipaddress', 'deleted_ipaddress', 'created_at', 'updated_at'
    ];
}
