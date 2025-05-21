'use client';

import Link from 'next/link';

export default function MovingPage() {
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">移動中</h2>
      {/* TODO: GPS 追跡・経過時間表示・計測終了ボタン */}
      {/* 計測終了 → 達成度画面へ */}
      <div className="pt-8 pb-8">
        <div className="container flex justify-center">
          <div className="w-full lg:w-[80%]">
            <div className="text-center">
              <Link
                href="/achievement"
                className="inline-block bg-red-400 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-red-500 transition"
              >
                計測終了
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}