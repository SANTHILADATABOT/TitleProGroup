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
        Schema::create('orders_invoice_mainlist', function (Blueprint $table) {
            $table->bigIncrements('id');  // `bigint NOT NULL` as the primary key
            $table->date('entry_date')->nullable();  // Nullable date column
            $table->bigInteger('order_id')->nullable();  // Nullable bigint column
            $table->string('order_number', 255)->nullable();  // Nullable varchar(255)
            $table->string('invoice_number', 255)->nullable();  // Nullable varchar(255)
            $table->text('description')->nullable();  // Nullable text column
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
        Schema::dropIfExists('orders_invoice_mainlist');
    }
};
