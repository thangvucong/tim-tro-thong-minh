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
        Schema::create('criteria', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->boolean('motel')->default(false);
            $table->boolean('stop')->default(false);
            $table->decimal('price_start', 10, 2);
            $table->decimal('price_end', 10, 2);
            $table->decimal('acreage_start', 10, 2);
            $table->decimal('acreage_end', 10, 2);
            $table->timestamp('create_at');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('criteria');
    }
};
