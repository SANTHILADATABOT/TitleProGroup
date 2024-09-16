<?php

namespace App\Models\Orders;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrdersFileHistory extends Model
{
    use HasFactory;
    protected $table = 'orders_file_history';
    protected $fillable = [
        'id', 'entry_date', 'order_id', 'user_id', 'entry_name', 'action', 'created_datetime', 'created_user_id', 'updated_user_id', 'deleted_user_id', 'created_ipaddress', 'updated_ipaddress', 'deleted_ipaddress', 'created_at', 'updated_at'
    ];
}
