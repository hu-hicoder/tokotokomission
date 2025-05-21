//// filepath: src/app/(pages)/input/page.tsx
'use client';

import { useFormContext } from '@/context/FormContext';
import Link from 'next/link';

const placeOptions = [
  { value: 'cafe', label: 'カフェ' },
  { value: 'library', label: '図書館' },
  { value: 'home', label: '自宅' },
];

export default function InputPage() {
  const { data, setData } = useFormContext();

  return (
    <div>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-2xl space-y-4">
        {/* 仮テキスト */}
        <h1 className="text-xl font-bold text-center">タスク・目的地・交通手段 設定</h1>
        
        {/* 目標値 */}
        <div>
          <label className="block font-medium mb-1">目標カロリー（kcal）</label>
          <input
            className="border rounded w-full px-3 py-2"
            type="number"
            value={data.goal}
            onChange={(e) => setData({ goal: Number(e.target.value) })}
          />
        </div>
        
        {/* タスク */}
        <div>
          <label className="block font-medium mb-1">タスク</label>
          <input
            className="border rounded w-full px-3 py-2"
            type="text"
            value={data.task}
            onChange={(e) => setData({ task: e.target.value })}
          />
        </div>

        {/* 目的地の種類 */}
        {/* 設定からカスタマイズできるようにしたい */}
        <div>
          <label className="block font-medium mb-1">行きたい場所</label>
          <div className="grid grid-cols-1 gap-2">
            {placeOptions.map((opt) => (
              <label key={opt.value} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={data.destinationTypes.includes(opt.value)}
                  onChange={(e) => {
                    const next = e.target.checked
                      ? [...data.destinationTypes, opt.value]
                      : data.destinationTypes.filter((t) => t !== opt.value);
                    setData({ destinationTypes: next });
                  }}
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 交通手段 */}
        <div>
          <label className="block font-medium mb-1">交通手段</label>
          <select
            className="border rounded w-full px-3 py-2"
            value={data.method}
            onChange={(e) => setData({ method: e.target.value })}
          >
            <option value="">選択してください</option>
            <option value="walking">徒歩</option>
            <option value="running">ランニング</option>
            <option value="bicycling">自転車</option>
          </select>
        </div>

        {/* 体重 */}
        {/* データベースから体重を取得して自動で表示できるようにする */}
        <div>
          <label className="block font-medium mb-1">体重（kg）</label>
          <input
            className="border rounded w-full px-3 py-2"
            type="number"
            value={data.weight}
            onChange={(e) => setData({ weight: Number(e.target.value) })}
          />
        </div>

        <div className="flex justify-center mt-6">
          <Link
            href="/map/proposal"
            className="inline-block bg-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition"
          >
            次へ
          </Link>
        </div>
      </div>
    </div>
  );
}