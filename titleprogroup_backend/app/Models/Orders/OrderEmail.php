<?php

namespace App\Models\Orders;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderEmail extends Model
{
    use HasFactory;
    protected $table = 'order_email';
    protected $fillable = [
        'id','entry_date','to_mail','cc_mail','email_template_id','subject','body','order_id','saved_file','created_user_id','updated_user_id','deleted_user_id','created_ipaddress','updated_ipaddress','deleted_ipaddress','created_at','updated_at'
    ];
}
