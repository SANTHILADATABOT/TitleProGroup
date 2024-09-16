<?php

namespace App\Models\Orders;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrdersInvoiceMainlist extends Model
{
    use HasFactory;
    protected $table = 'orders_invoice_mainlist';
    protected $fillable = [
        'id', 'entry_date', 'order_id', 'order_number', 'invoice_number', 'description', 'delete_status', 'created_user_id', 'updated_user_id', 'deleted_user_id', 'created_ipaddress', 'updated_ipaddress', 'deleted_ipaddress', 'created_at', 'updated_at'
    ];
}
