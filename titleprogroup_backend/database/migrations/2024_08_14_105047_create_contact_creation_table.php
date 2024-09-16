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
        Schema::create('contact_creation', function (Blueprint $table) {
            $table->id();
            $table->date('entry_date')->nullable();
            $table->string('contact_name', 255)->nullable();
            $table->string('contact_type_name', 255)->nullable();
            $table->bigInteger('customer_fees_id')->nullable();
            $table->text('address')->nullable();
            $table->string('branch_code', 255)->nullable();
            $table->string('unit', 255)->nullable();
            $table->string('city_name', 255)->nullable();
            $table->bigInteger('state_id')->nullable();
            $table->bigInteger('county_id')->nullable();
            $table->string('zipcode', 255)->nullable();
            $table->string('mobile_number', 255)->nullable();
            $table->string('alternate_mobile_number', 255)->nullable();
            $table->string('email_id', 255)->nullable();
            $table->string('ein', 255)->nullable();
            $table->string('service_date', 255)->nullable();
            $table->string('service_expiration_date', 255)->nullable();
            $table->text('eo_exp_date')->nullable();
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
        Schema::dropIfExists('contact_creation');
    }
};
