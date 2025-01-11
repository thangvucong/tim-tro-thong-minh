<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('accomodations', function (Blueprint $table) {
            $table->id();
            $table->string('address');
            $table->integer('acreage');
            $table->decimal('price', 10, 2);
            $table->string('furniture')->default('Nội thất trống');
            $table->decimal('deposit', 10, 2)->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accommodations');
    }
};
