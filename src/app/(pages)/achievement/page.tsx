'use client';

import CalcCalorie from '@/components/calorie/CalcCalorie';
import { useEffect } from 'react';
import { useFormContext } from '@/context/FormContext';

export default function AchievementPage() {
  // 入力フォームのデータの使い方
  const { data } = useFormContext();
  // マウント時に一度だけログを出す
  useEffect(() => {
    console.log('AchievementPage data:', data);
  }, [data]);

  return (
    <div style={{ padding: 20 }}>
      <CalcCalorie />     
    </div>
  );
}