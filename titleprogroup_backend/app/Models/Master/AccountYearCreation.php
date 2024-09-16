<?php

namespace App\Models\Master;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AccountYearCreation extends Model
{
    use HasFactory;
    protected $table = 'account_year_creation';
    protected $fillable = [
        'id', 'entry_date', 'from_year', 'to_year', 'status', 'delete_status', 'created_user_id', 'updated_user_id', 'deleted_user_id', 'created_ipaddress', 'updated_ipaddress', 'deleted_ipaddress', 'created_at', 'updated_at'
    ];
}
