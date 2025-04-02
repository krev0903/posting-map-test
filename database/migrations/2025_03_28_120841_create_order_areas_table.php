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
        Schema::create('order_areas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->onDelete('cascade'); // 注文ID（外部キー）
            $table->foreignId('area_id')->constrained('areas')->onDelete('cascade'); // エリアID（外部キー）
            $table->timestamps(); // created_at, updated_at（必要に応じて追加）
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_areas');
    }
};
