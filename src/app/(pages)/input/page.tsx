//// filepath: src/app/(pages)/input/page.tsx
'use client';

import Link from 'next/link';

export default function InputPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold p-3">
      </h2>
      <div className="pt-8 pb-8">
        <div className="container flex justify-center">
          <div className="w-full lg:w-[80%]">
            <div className="text-center">
              {/* TODO: チェックボックス／タスク入力／交通手段フォーム */}
              {/* 次へボタン → 提案画面へ */}
              <Link
              href="/map/proposal"
              className="inline-block bg-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition"
            >
              次へ
            </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}