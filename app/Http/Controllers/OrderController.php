<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\User;
use App\Models\Area;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OrderController extends Controller
{
    // 注文を保存するメソッド
    public function store(Request $request)
    {
        // 現在ログインしているユーザーのIDを取得
        $user = Auth::user();

        // リクエストから total_price を数値に変換して取得
        $totalPrice = (float)$request->input('total_price');  // 明示的に float にキャスト

        // 注文の保存
        $order = new Order();
        $order->user_id = $user->id;  // 現在ログインしているユーザーのIDをセット
        $order->total_price = $totalPrice;  // 数値型として保存
        $order->save();

        // リクエストからエリアIDの配列を取得
        $areaIds = $request->input('area_ids');  // 例えば [{ area_id: 1 }, { area_id: 2 }] のように送信される

        // 注文とエリアを関連付ける
        if ($areaIds && is_array($areaIds)) {
            // area_ids 配列から ID のみを取得
            $areaIdsArray = array_map(function ($area) {
                return $area['area_id'];
            }, $areaIds);
        
            // デバッグ：送信されるエリアIDをログに出力
            // \Log::info('エリアID:', $areaIdsArray);
        
            // 注文とエリアを関連付ける
            $order->areas()->attach($areaIdsArray);
        }
        return redirect('/');
    }

    // ユーザーの注文データを表示するメソッド
    public function index()
    {
        // ログイン中のユーザーを取得
        $user = Auth::user();

        $name = $user->name;

        // ユーザーの注文を取得
        $orders = $user->orders;  // リレーションを使ってユーザーに関連する注文を取得

        // ユーザーの注文の合計金額を取得
        $totalPrice = $orders->sum('total_price');  // 合計金額を計算

        // ダッシュボードのビューにデータを渡す
        return Inertia::render('Dashboard', [
            'name' => $name,
            'orders' => $orders,
            'totalPrice' => $totalPrice,  // 合計金額を渡す
        ]);
    }
}