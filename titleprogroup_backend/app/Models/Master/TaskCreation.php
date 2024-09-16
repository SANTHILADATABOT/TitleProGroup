<?php

namespace App\Models\Master;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskCreation extends Model
{
    use HasFactory;
    protected $table = 'task_creation';
    protected $fillable = [
        'id', 'entry_date','work_flow_group_id','work_flow_id', 'task_name', 'when_1','specific_task','assign_type_id','assign_task_group','assign_user_id','due_days','vendor_management','task_guidance','description', 'status', 'delete_status', 'created_user_id', 'updated_user_id', 'deleted_user_id', 'created_ipaddress', 'updated_ipaddress', 'deleted_ipaddress', 'created_at', 'updated_at'
    ];
}
