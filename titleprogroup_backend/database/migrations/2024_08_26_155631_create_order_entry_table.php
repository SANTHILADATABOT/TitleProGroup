<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('order_entry', function (Blueprint $table) {
            $table->id();
            $table->date('entry_date')->nullable();
            $table->string('order_number', 255)->nullable();
            $table->string('order_status', 255)->nullable();
            $table->bigInteger('contact_id')->nullable();
            $table->string('open_date', 255)->nullable();
            $table->string('close_date', 255)->nullable();
            $table->string('due_date', 255)->nullable();
            $table->string('arrival_date', 255)->nullable();
            $table->string('delivery_date', 255)->nullable();
            $table->string('active_workflow', 255)->nullable();
            $table->string('assigned_to', 255)->nullable();
            $table->text('street_address')->nullable();
            $table->string('unit', 255)->nullable();
            $table->string('city_name', 255)->nullable();
            $table->bigInteger('state_id')->nullable();
            $table->bigInteger('county_id')->nullable();
            $table->string('zipcode', 255)->nullable();
            $table->string('parcel_id', 255)->nullable();
            $table->string('sub_division', 255)->nullable();
            $table->string('block', 255)->nullable();
            $table->string('lot', 255)->nullable();
            $table->string('section', 255)->nullable();
            $table->string('land_value', 255)->nullable();
            $table->string('improvement_value', 255)->nullable();
            $table->string('total_assessed_value', 255)->nullable();
            $table->string('product_type', 255)->nullable();
            $table->bigInteger('transaction_type_id')->nullable();
            $table->bigInteger('work_flow_group_id')->nullable();
            $table->bigInteger('work_flow_id')->nullable();
            $table->string('property_type', 255)->nullable();
            $table->bigInteger('data_source_id')->nullable();
            $table->string('add_in_product', 255)->nullable();
            $table->string('customer_name', 255)->nullable();
            $table->text('customer_address')->nullable();
            $table->string('customer_branch_code', 255)->nullable();
            $table->string('lender_name', 255)->nullable();
            $table->text('lender_address')->nullable();
            $table->string('lender_branch_code', 255)->nullable();
            $table->string('file', 255)->nullable();
            $table->string('loan', 255)->nullable();
            $table->string('sales_price', 255)->nullable();
            $table->string('loan_type', 255)->nullable();
            $table->string('loan_date', 255)->nullable();
            $table->string('loan_amount', 255)->nullable();
            $table->string('borrower_name', 255)->nullable();
            $table->string('borrower_ssn', 255)->nullable();
            $table->string('borrower_dob', 255)->nullable();
            $table->string('seller_name', 255)->nullable();
            $table->string('seller_ssn', 255)->nullable();
            $table->string('seller_dob', 255)->nullable();
            $table->text('description')->nullable();
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->enum('delete_status', ['yes', 'no'])->default('no');
            $table->bigInteger('created_user_id')->nullable();
            $table->bigInteger('updated_user_id')->nullable();
            $table->bigInteger('deleted_user_id')->nullable();
            $table->string('created_ipaddress', 255)->nullable();
            $table->string('updated_ipaddress', 255)->nullable();
            $table->string('deleted_ipaddress', 255)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_entry');
    }
};
