"use client";

import { useFormContext } from "@/context/FormContext";
import { useEffect, useState } from "react";

const CalcCalorie = () => {

  const [result, setResult] = useState<number | null>(null);

  const METS_MAP: Record<string, number> = {
    walking: 3.5,
    running: 7.0,
    bicycling: 6.8,
  };
  // data?.time = 60
const { data, setData } = useFormContext();
    // マウント時に一度だけログを出す
    useEffect(() => {
      console.log('AchievementPage data:', data);
    }, [data]);
  const handleCalcButton = () => {
    const mets = METS_MAP[data?.method] ?? 0;
    const calorie = mets * data?.weight * data?.time * 1.05;
    const achievement = (calorie / data?.goal) * 100;
    setResult(achievement);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-2xl space-y-4">
      <h1 className="text-xl font-bold text-center">カロリー計算機</h1>


      {/* 時間 */}
      <div>
        <label className="block font-medium mb-1">時間（時間）</label>
        <input
          className="border rounded w-full px-3 py-2"
          type="number"
          value={data.time}
          onChange={(e) => setData({ time: Number(e.target.value) })}
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
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              `今回の運動で目標の${result.toFixed(2)}%を達成しました！\n#とことこミッション`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
          >
            結果をツイートする
          </a> 
        </div>
      )}
    </div>
  );
};

export default CalcCalorie;