<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('customer_fees_sublist', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->date('entry_date')->nullable();
            $table->bigInteger('customer_fees_id')->nullable();
            $table->bigInteger('payee_id')->nullable();
            $table->bigInteger('contact_id')->nullable();
            $table->bigInteger('expense_type_id')->nullable();
            $table->bigInteger('transaction_type_id')->nullable();
            $table->decimal('cost_per_units', 15, 2)->nullable();
            $table->decimal('no_of_units', 15, 2)->nullable();
            $table->decimal('total', 15, 2)->nullable();
            $table->enum('delete_status', ['yes', 'no'])->default('no');
            $table->bigInteger('created_user_id')->nullable();
            $table->bigInteger('updated_user_id')->nullable();
            $table->bigInteger('deleted_user_id')->nullable();
            $table->string('created_ipaddress', 255)->nullable();
            $table->string('updated_ipaddress', 255)->nullable();
            $table->string('deleted_ipaddress', 255)->nullable();
            $table->timestamps(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customer_fees_sublist');
    }
};
