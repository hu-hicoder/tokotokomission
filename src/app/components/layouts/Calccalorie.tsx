"use client";

import { useState } from "react";

const CalcCalorie = () => {
  const [goal, setGoal] = useState(0);
  const [method, setMethod] = useState("徒歩");
  const [time, setTime] = useState(0);
  const [weight, setWeight] = useState(0);
  const [result, setResult] = useState<number | null>(null);

  const METS_MAP: Record<string, number> = {
    徒歩: 3.5,
    ランニング: 7.0,
    自転車: 6.8,
  };

  const handleCalcButton = () => {
    const mets = METS_MAP[method];
    const calorie = mets * weight * time * 1.05;
    const achievement = (calorie / goal) * 100;
    setResult(achievement);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-2xl space-y-4">
      <h1 className="text-xl font-bold text-center">カロリー計算機</h1>

      {/* 目標値 */}
      <div>
        <label className="block font-medium mb-1">目標カロリー（kcal）</label>
        <input
          className="border rounded w-full px-3 py-2"
          type="number"
          value={goal}
          onChange={(e) => setGoal(Number(e.target.value))}
        />
      </div>

      {/* 体重 */}
      <div>
        <label className="block font-medium mb-1">体重（kg）</label>
        <input
          className="border rounded w-full px-3 py-2"
          type="number"
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
        />
      </div>

      {/* 交通手段 */}
      <div>
        <label className="block font-medium mb-1">交通手段</label>
        <select
          className="border rounded w-full px-3 py-2"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          <option>徒歩</option>
          <option>ランニング</option>
          <option>自転車</option>
        </select>
      </div>

      {/* 時間 */}
      <div>
        <label className="block font-medium mb-1">時間（時間）</label>
        <input
          className="border rounded w-full px-3 py-2"
          type="number"
          value={time}
          onChange={(e) => setTime(Number(e.target.value))}
        />
      </div>

      {/* 計算ボタン */}
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
        onClick={handleCalcButton}
      >
        計算する
      </button>

      {/* 結果 */}
      {result !== null && (
        <div className="text-center text-lg font-semibold">
          達成度：{result.toFixed(2)}%
        </div>
      )}
    </div>
  );
};

export default CalcCalorie;