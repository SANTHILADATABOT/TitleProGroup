<?php

namespace App\Models\Master;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanyCreation extends Model
{
    use HasFactory;
    protected $table = 'company_creation';
    protected $fillable = [
        'id', 'entry_date', 'company_name', 'address', 'mobile_number', 'phone_number', 'gst_number', 'tin_number', 'email_id', 'image_name', 'status', 'delete_status', 'created_user_id', 'updated_user_id', 'deleted_user_id', 'created_ipaddress', 'updated_ipaddress', 'deleted_ipaddress', 'created_at', 'updated_at'
    ];
}
