<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserCreation extends Model
{
    use HasFactory;
    protected $table = 'user_creation';
    protected $fillable = [
        'id', 'entry_date', 'user_type_id', 'staff_id', 'assign_type_id', 'mobile_number','mail_id', 'user_name', 'password', 'confirm_password', 'description', 'status', 'delete_status', 'created_user_id', 'updated_user_id', 'deleted_user_id', 'created_ipaddress', 'updated_ipaddress', 'deleted_ipaddress', 'created_at', 'updated_at'
    ];
}
