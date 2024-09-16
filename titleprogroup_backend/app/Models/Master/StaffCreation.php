<?php

namespace App\Models\Master;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StaffCreation extends Model
{
    use HasFactory;
    protected $table = 'staff_creation';
    protected $fillable = [
        'id', 'entry_date', 'department_id', 'staff_category_id', 'staff_name', 'gender', 'marital_status', 'dob', 'email_id', 'mobile_number', 'emergency_mobile_number', 'aadhar_number', 'pan_number', 'country_id', 'state_id', 'city_name', 'address', 'zipcode', 'image_name', 'description', 'status', 'delete_status', 'created_user_id', 'updated_user_id', 'deleted_user_id', 'created_ipaddress', 'updated_ipaddress', 'deleted_ipaddress', 'created_at', 'updated_at'
    ];
}
