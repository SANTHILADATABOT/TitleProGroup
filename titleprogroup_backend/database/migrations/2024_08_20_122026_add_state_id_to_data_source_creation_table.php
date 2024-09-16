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
        Schema::table('data_source_creation', function (Blueprint $table) {
            $table->bigInteger('state_id')->nullable()->after('entry_date');
            $table->bigInteger('county_id')->nullable()->after('entry_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('data_source_creation', function (Blueprint $table) {
            $table->dropColumn('state_id');
            $table->dropColumn('county_id');
        });
    }
};
