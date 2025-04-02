import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';

const Map = ({ selectedAreas, setSelectedAreas, fetchAreaPrice, areaPrices, totalPrice }) => {
  const [geoData, setGeoData] = useState(null);
  const position = [35.440, 136.780]; // 初期位置は岐阜

  // GeoJSONファイルを取得
  useEffect(() => {
    fetch('/data/gifu_city.geojson')
      .then((response) => response.json())
      .then((data) => setGeoData(data))
      .catch((error) => console.error('GeoJSON 読み込みエラー:', error));
  }, []);

  // 市区町村に対応する金額を取得
  const onEachFeature = (feature, layer) => {
    const AreasName = feature.properties.S_NAME || '不明';  // S_NAMEを取得
    layer.bindPopup(`<p>${AreasName}</p>`);

    layer.on('click', () => {
      setSelectedAreas((prevSelectedAreas) => {
        const newSelectedAreas = new Set(prevSelectedAreas);

        // すでに選択されている場合は選択解除、そうでない場合は選択する
        if (newSelectedAreas.has(AreasName)) {
          newSelectedAreas.delete(AreasName); // 選択解除
        } else {
          newSelectedAreas.add(AreasName); // 新しいエリアを選択
          fetchAreaPrice(AreasName); // 新たに金額を取得
        }

        return newSelectedAreas;
      });
    });
  };

  // クリックエリアの色を変える
  const styleFeature = (feature) => {
    const AreasName = feature.properties.S_NAME || '不明';  // S_NAMEを取得
    const isSelected = selectedAreas.has(AreasName); // 選択状態の判定

    return {
      fillColor: isSelected ? 'green' : 'red', // 緑色で選択されたエリア、赤色で選択されていないエリア
      fillOpacity: 0.5,
      color: 'black',
      weight: 1,
      transition: 'fill-color 5s ease, fill-opacity 5s ease', // fillColorとfillOpacityのトランジションを5秒に設定
    };
  };

  return (
    <MapContainer center={position} zoom={12} style={{ height: '500px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {geoData && <GeoJSON data={geoData} onEachFeature={onEachFeature} style={styleFeature} />}
    </MapContainer>
  );
};

export default Map;