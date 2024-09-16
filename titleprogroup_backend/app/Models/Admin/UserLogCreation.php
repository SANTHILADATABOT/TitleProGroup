<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserLogCreation extends Model
{
    use HasFactory;
    protected $table = 'user_log_creation';
    protected $fillable = [
        'id', 'entry_date', 'user_id', 'login_at', 'description', 'status', 'delete_status', 'created_user_id', 'updated_user_id', 'deleted_user_id', 'created_ipaddress', 'updated_ipaddress', 'deleted_ipaddress', 'created_at', 'updated_at'
    ];
}
