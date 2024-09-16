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
        Schema::create('transaction_type_creation', function (Blueprint $table) {
            $table->id();
            $table->date('entry_date')->nullable();
            $table->string('transaction_type_name', 100)->nullable();
            $table->decimal('cost_per_units', 15, 2)->nullable(); // Decimal type for monetary values
            $table->decimal('no_of_units', 15, 2)->nullable(); // Decimal type for precise quantities
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
        Schema::dropIfExists('transaction_type_creation');
    }
};
