<?php

namespace App\Models\Master;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmailTemplateCreation extends Model
{
    use HasFactory;
    protected $table = 'email_template_creation';
    protected $fillable = [
        'id', 'entry_date', 'email_template_name', 'email_subject', 'email_content', 'description', 'status', 'delete_status', 'created_user_id', 'updated_user_id', 'deleted_user_id', 'created_ipaddress', 'updated_ipaddress', 'deleted_ipaddress', 'created_at', 'updated_at'
    ];
}
