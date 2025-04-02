<?php

namespace App\Http\Controllers;

use App\Models\Area;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AreaController extends Controller
{
    public function getPrice(Request $request)
    {
        // 修正：エリア名の前後の空白を削除
        $areaName = trim($request->input('Areas'));
        \Log::info("受け取ったエリア名: " . $areaName);

        // エリア名を使ってデータベースを検索
        $areaPrice = Area::where('area_name', $areaName)->first();

        if ($areaPrice) {
            return response()->json(['price' => $areaPrice->price]);
        } else {
            \Log::error("エリア名が見つかりませんでした: " . $areaName);
            return response()->json(['error' => '指定されたエリア名は存在しません'], 404);
        }
    }
}