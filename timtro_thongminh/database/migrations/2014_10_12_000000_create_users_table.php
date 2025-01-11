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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->string('email')->unique()->nullable();
            $table->string('phone')->nullable();
            $table->string('address')->nullable();
            $table->string('password')->default(bcrypt('thangdeptrai123'));
            $table->string('avatar')->nullable();
            $table->float('rating', 2, 1)->default(0.0);
            $table->integer('rating_count')->default(0);
            $table->integer('followers')->default(0);
            $table->integer('following')->default(0);
            $table->string('response_chat')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
