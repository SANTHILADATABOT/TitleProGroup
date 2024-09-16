<?php

namespace App\Models\Master;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkFlowCreation extends Model
{
    use HasFactory;
    protected $table = 'work_flow_creation';
    protected $fillable = [
        'id', 'entry_date', 'work_flow_group_id', 'work_flow_name', 'place_after', 'description', 'status', 'delete_status', 'created_user_id', 'updated_user_id', 'deleted_user_id', 'created_ipaddress', 'updated_ipaddress', 'deleted_ipaddress', 'created_at', 'updated_at'
    ];
}
