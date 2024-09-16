<?php

namespace App\Models\Orders;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderEntryBorrowerOrSeller extends Model
{
    use HasFactory;
    protected $table = 'order_entry_borrower_or_seller';
    protected $fillable = [
        'id', 'entry_date', 'order_id', 'borrower_or_seller', 'name', 'ssn', 'dob', 'description', 'status', 'delete_status', 'created_user_id', 'updated_user_id', 'deleted_user_id', 'created_ipaddress', 'updated_ipaddress', 'deleted_ipaddress', 'created_at', 'updated_at'
    ];
}
