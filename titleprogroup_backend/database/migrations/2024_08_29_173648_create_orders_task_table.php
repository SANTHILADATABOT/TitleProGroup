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
        Schema::create('orders_task', function (Blueprint $table) {
            $table->id();
            $table->date('entry_date')->nullable();
            $table->bigInteger('order_id')->nullable();
            $table->bigInteger('work_flow_group_id')->nullable();
            $table->bigInteger('work_flow_id')->nullable();
            $table->bigInteger('task_id')->nullable();
            $table->string('countdown_timer', 255)->nullable();
            $table->time('start_time')->nullable();
            $table->time('stop_time')->nullable();
            $table->text('description')->nullable();
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
        Schema::dropIfExists('orders_task');
    }
};
