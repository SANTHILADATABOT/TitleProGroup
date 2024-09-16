<?php

namespace App\Models\Orders;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrdersTask extends Model
{
    use HasFactory;
    protected $table = 'orders_task';
    protected $fillable = [
        'id', 'entry_date', 'task_status', 'order_id', 'work_flow_group_id', 'work_flow_id', 'task_id', 'countdown_timer', 'start_time', 'stop_time', 'description', 'created_user_id', 'updated_user_id', 'deleted_user_id', 'created_ipaddress', 'updated_ipaddress', 'deleted_ipaddress', 'created_at', 'updated_at'
    ];
}
