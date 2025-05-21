//// filepath: src/app/(pages)/achievement/page.tsx
'use client';

import CalcCalorie from '@/components/calorie/CalcCalorie';      // [src/components/calorie/CalcCalorie.tsx]

export default function AchievementPage() {
  return (
    <div style={{ padding: 20 }}>
      <CalcCalorie />
    </div>
  );
}