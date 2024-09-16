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
        Schema::create('orders_invoice_sublist', function (Blueprint $table) {
            $table->bigIncrements('id');  // `bigint NOT NULL` as the primary key
            $table->date('entry_date')->nullable();  // Nullable date column
            $table->bigInteger('orders_invoice_mainlist_id')->nullable();  // Nullable bigint column
            $table->bigInteger('payee_id')->nullable();  // Nullable bigint column
            $table->bigInteger('contact_id')->nullable();  // Nullable bigint column
            $table->bigInteger('expense_type_id')->nullable();  // Nullable bigint column
            $table->bigInteger('transaction_type_id')->nullable();  // Nullable bigint column
            $table->decimal('cost_per_units', 15, 2)->nullable();  // Nullable decimal column
            $table->decimal('no_of_units', 15, 2)->nullable();  // Nullable decimal column
            $table->decimal('total', 15, 2)->nullable();  // Nullable decimal column
            $table->enum('delete_status', ['yes', 'no'])->default('no');  // Enum column with default value
            $table->bigInteger('created_user_id')->nullable();  // Nullable bigint column
            $table->bigInteger('updated_user_id')->nullable();  // Nullable bigint column
            $table->bigInteger('deleted_user_id')->nullable();  // Nullable bigint column
            $table->string('created_ipaddress', 255)->nullable();  // Nullable varchar(255)
            $table->string('updated_ipaddress', 255)->nullable();  // Nullable varchar(255)
            $table->string('deleted_ipaddress', 255)->nullable();  // Nullable varchar(255)
            $table->timestamps(0);  // `created_at` and `updated_at` columns with precision 0
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders_invoice_sublist');
    }
};
