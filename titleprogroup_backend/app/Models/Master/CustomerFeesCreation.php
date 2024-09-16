<?php

namespace App\Models\Master;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomerFeesCreation extends Model
{
    use HasFactory;
    protected $table = 'customer_fees_creation';
    protected $fillable = [
        'id', 'entry_date', 'state_id', 'county_id', 'customer_fees', 'description', 'status', 'delete_status', 'created_user_id', 'updated_user_id', 'deleted_user_id', 'created_ipaddress', 'updated_ipaddress', 'deleted_ipaddress', 'created_at', 'updated_at'
    ];
}
