<?php

namespace App\Models\Contacts;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomerFeesSublist extends Model
{
    use HasFactory;
    protected $table = 'customer_fees_sublist';
    protected $fillable = [
        'id', 'entry_date', 'customer_fees_id', 'payee_id', 'contact_id', 'expense_type_id', 'transaction_type_id', 'cost_per_units', 'no_of_units', 'total', 'delete_status', 'created_user_id', 'updated_user_id', 'deleted_user_id', 'created_ipaddress', 'updated_ipaddress', 'deleted_ipaddress', 'created_at', 'updated_at'
    ];
}
