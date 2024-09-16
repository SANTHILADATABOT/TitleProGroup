<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserPermissionCreation extends Model
{
    use HasFactory;
    protected $table = 'user_permission_creation';
    protected $fillable = [
        'id', 'entry_date', 'user_type_id', 'user_screen_id', 'view_rights', 'add_rights', 'edit_rights', 'delete_rights', 'more_rights', 'description', 'status', 'delete_status', 'created_user_id', 'updated_user_id', 'deleted_user_id', 'created_ipaddress', 'updated_ipaddress', 'deleted_ipaddress', 'created_at', 'updated_at'
    ];
}
