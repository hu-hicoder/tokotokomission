'use client';

import { PlacesProvider } from '@/context/PlacesContext';
import { PlaceSearch } from '@/components/places/PlaceSearch';
import { PlaceList } from '@/components/places/PlaceList';
import { MapContent } from '@/components/maps/MapContent';
import { useFormContext } from '@/context/FormContext';
import Link from 'next/link';
import { useEffect } from 'react';

export default function ProposalPage() {
  // 入力フォームのデータの使い方
  const { data } = useFormContext();
  // マウント時に一度だけログを出す
  useEffect(() => {
    console.log('ProposalPage data:', data);
  }, [data]);

  return (
    <div style={{ padding: 20 }}>
      <h1>目的地提案デモ</h1>
      <PlacesProvider>
        <PlaceSearch />
        <PlaceList />
        <div style={{ marginTop: 20, height: 400 }}>
          <MapContent />
        </div>
      </PlacesProvider>
      {/* 次へボタン → 移動中画面へ */}
      <div className="pt-8 pb-8">
        <div className="container flex justify-center">
          <div className="w-full lg:w-[80%]">
            <div className="text-center">
              <Link
                href="/map/moving"
                className="inline-block bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition"
              >
                移動開始
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}