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
        Schema::create('customer_creation', function (Blueprint $table) {
            $table->id();
            $table->date('entry_date')->nullable();
            $table->string('customer_name', 100)->nullable();
            $table->enum('gender', ['male', 'female', 'others'])->default('male');
            $table->enum('marital_status', ['single', 'married', 'unmarried'])->default('single');
            $table->date('dob')->nullable();
            $table->string('email_id', 100)->nullable();
            $table->string('mobile_number', 100)->nullable();
            $table->string('emergency_mobile_number', 100)->nullable();
            $table->string('aadhar_number', 100)->nullable();
            $table->string('pan_number', 100)->nullable();
            $table->bigInteger('country_id')->nullable();
            $table->bigInteger('state_id')->nullable();
            $table->string('city_name', 100)->nullable();
            $table->text('address')->nullable();
            $table->string('zipcode', 100)->nullable();
            $table->string('image_name', 100)->nullable();
            $table->text('description')->nullable();
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->enum('delete_status', ['yes', 'no'])->default('no');
            $table->integer('created_user_id')->nullable();
            $table->integer('updated_user_id')->nullable();
            $table->integer('deleted_user_id')->nullable();
            $table->string('created_ipaddress', 100)->nullable();
            $table->string('updated_ipaddress', 100)->nullable();
            $table->string('deleted_ipaddress', 100)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customer_creation');
    }
};
