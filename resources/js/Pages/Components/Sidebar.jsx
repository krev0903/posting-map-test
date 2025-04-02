import React, { useState, useEffect } from 'react';
import Map from './Map';

const Sidebar = () => {
  const [selectedAreas, setSelectedAreas] = useState(new Set());
  const [areaPrices, setAreaPrices] = useState({}); // 市区町村ごとの金額
  const [totalPrice, setTotalPrice] = useState(0); // 合計金額
  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

  // 合計金額の再計算
  useEffect(() => {
    let newTotalPrice = 0;
    selectedAreas.forEach((areaName) => {
      newTotalPrice += areaPrices[areaName] || 0;
    });
    setTotalPrice(newTotalPrice);
  }, [selectedAreas, areaPrices]);

  // 市区町村に対応する金額を取得
  const fetchAreaPrice = (AreasName) => {
    console.log('送信するエリア名:', AreasName);  // エリア名が正しく送信されているか確認
    fetch('http://localhost:8000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrfToken,
      },
      body: JSON.stringify({
        Areas: AreasName,  // 送信されるエリア名
      }),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('サーバーエラー: ' + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      const price = parseFloat(data.price) || 0;  // 金額を数値として扱う
      setAreaPrices((prevPrices) => ({
        ...prevPrices,
        [AreasName]: price,
      }));
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('金額取得に失敗しました。もう一度試してください。');
    });
  };

  // 削除ボタンが押された時の処理
  const handleRemoveArea = (areaName) => {
    setSelectedAreas((prevSelectedAreas) => {
      const newSelectedAreas = new Set(prevSelectedAreas);
      newSelectedAreas.delete(areaName); // 選択解除
      return newSelectedAreas;
    });
  };

  // selectedAreasをバックエンドに送信する関数
  const sendSelectedAreasToBackend = () => {
    const areasWithPrices = Array.from(selectedAreas).map(areaName => ({
      price: areaPrices[areaName] || 0,
    }));

    fetch('http://localhost:8000/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrfToken,
      },
      body: JSON.stringify({
        total_price: parseFloat(totalPrice),  
        areas: areasWithPrices,  
      }),
    });
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* サイドバー */}
      <div className="w-[160px] bg-gray-800 text-white p-4">
        <div className="flex items-center justify-center h-5">
          <h1 className="text-2xl font-bold">選択エリア</h1>
        </div>

        {selectedAreas.size > 0 && (
          <div>
            <ul className="mt-[10px]">
              {Array.from(selectedAreas).map((areaName) => (
                <li key={areaName} className="bg-teal-600 px-1 py-0 rounded-lg">
                  <div className="font-semibold text-lg">{areaName}</div>
                  <div className="text-xl mb-2">
                    ¥{areaPrices[areaName]?.toLocaleString()}
                  </div>
                  {/* <button 
                    onClick={() => handleRemoveArea(areaName)} 
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200">
                    削除
                  </button> */}
                </li>
              ))}
            </ul>
            <p className="text-xl font-bold mt-2">合計: ¥{totalPrice.toLocaleString()}</p>

            {/* 送信ボタン */}
            <form method="POST" action="http://localhost:8000/order" className="mt-4">
              <input type="hidden" name="_token" value={csrfToken} />
              <input type="hidden" name="total_price" value={totalPrice} />
              <input type="hidden" name="areas" value={JSON.stringify(Array.from(selectedAreas))} />
              <button 
                type="submit" 
                className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition duration-200 w-full mt-2">
                送信
              </button>
            </form>
          </div>
        )}
      </div>
      <Map
        selectedAreas={selectedAreas}
        setSelectedAreas={setSelectedAreas}
        fetchAreaPrice={fetchAreaPrice}
        areaPrices={areaPrices}
        totalPrice={totalPrice}
      />
    </div>
  );
};

export default Sidebar;