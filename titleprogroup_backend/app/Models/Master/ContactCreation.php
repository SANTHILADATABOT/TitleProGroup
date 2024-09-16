<?php

namespace App\Models\Master;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactCreation extends Model
{
    use HasFactory;
    protected $table = 'contact_creation';
    protected $fillable = [
        'id', 'entry_date', 'contact_name', 'contact_type_name', 'customer_fees_id', 'address', 'branch_code', 'unit', 'city_name', 'state_id', 'county_id', 'zipcode', 'mobile_number', 'alternate_mobile_number', 'email_id', 'ein', 'service_date', 'service_expiration_date', 'eo_exp_date', 'status', 'delete_status', 'created_user_id', 'updated_user_id', 'deleted_user_id', 'created_ipaddress', 'updated_ipaddress', 'deleted_ipaddress', 'created_at', 'updated_at'
    ];
}
