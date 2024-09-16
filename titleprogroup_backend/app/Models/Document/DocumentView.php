<?php

namespace App\Models\Document;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocumentView extends Model
{
    use HasFactory;
    protected $table = 'document_view';
    protected $fillable = [
        'id', 'entry_date', 'file_name', 'type', 'extension', 'size','saved_file', 'folder_id', 'order_id', 'status', 'delete_status', 'created_dt', 'updated_dt', 'deleted_dt', 'created_user_id', 'updated_user_id', 'deleted_user_id', 'created_ipaddress', 'updated_ipaddress', 'deleted_ipaddress', 'created_at', 'updated_at'
    ];
}
