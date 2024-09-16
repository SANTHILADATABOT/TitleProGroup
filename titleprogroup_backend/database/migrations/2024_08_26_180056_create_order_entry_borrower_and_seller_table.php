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
        Schema::create('order_entry_borrower_and_seller', function (Blueprint $table) {
            $table->id();
            $table->string('borrower_or_seller', 255)->nullable();
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
        Schema::dropIfExists('order_entry_borrower_and_seller');
    }
};
