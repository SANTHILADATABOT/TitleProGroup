<?php

namespace App\Models\Master;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionTypeCreation extends Model
{
    use HasFactory;
    protected $table = 'transaction_type_creation';
    protected $fillable = [
        'id', 'entry_date', 'transaction_type_name', 'cost_per_units', 'no_of_units', 'description', 'status', 'delete_status', 'created_user_id', 'updated_user_id', 'deleted_user_id', 'created_ipaddress', 'updated_ipaddress', 'deleted_ipaddress', 'created_at', 'updated_at'
    ];
}
