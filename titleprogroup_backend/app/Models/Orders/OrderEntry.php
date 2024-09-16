<?php

namespace App\Models\Orders;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderEntry extends Model
{
    use HasFactory;
    protected $table = 'order_entry';
    protected $fillable = [
        'id', 'entry_date', 'order_number', 'contact_id', 'open_date', 'close_date', 'due_date', 'arrival_date', 'delivery_date', 'active_workflow', 'assigned_to', 'street_address', 'unit', 'city_name', 'state_id', 'county_id', 'zipcode', 'parcel_id', 'sub_division', 'block', 'lot', 'section', 'land_value', 'improvement_value', 'total_assessed_value', 'product_type', 'transaction_type_id', 'work_flow_group_id', 'work_flow_id', 'property_type', 'data_source_id', 'add_in_product', 'customer_name', 'customer_address', 'customer_branch_code', 'lender_name', 'lender_address', 'lender_branch_code', 'file', 'loan', 'sales_price', 'loan_type', 'loan_date', 'loan_amount', 'borrower_name', 'borrower_ssn', 'borrower_dob', 'description', 'status', 'delete_status', 'created_user_id', 'updated_user_id', 'deleted_user_id', 'created_ipaddress', 'updated_ipaddress', 'deleted_ipaddress', 'created_at', 'updated_at'
    ];
}
