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
        Schema::create('order_email', function (Blueprint $table) {
            $table->bigIncrements('id');  // `bigint NOT NULL` as the primary key
            $table->date('entry_date')->nullable();  // Nullable date column
            $table->text('to_mail');  // `text NOT NULL`
            $table->text('cc_mail');  // `text NOT NULL`
            $table->bigInteger('email_template_id')->nullable();  // Nullable bigint column
            $table->text('subject');  // `text NOT NULL`
            $table->text('body');  // `text NOT NULL`
            $table->bigInteger('order_id')->nullable();  // Nullable bigint column
            $table->text('saved_file')->nullable();  // Nullable text column
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
        Schema::dropIfExists('order_email');
    }
};
