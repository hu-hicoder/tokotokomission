//// filepath: src/context/FormContext.tsx
'use client';

import React, { createContext, ReactNode, useContext, useState } from 'react';

export type FormData = {
  destinationTypes: string[];
  task: string;
  method: string;
  weight: number;
  goal: number;
  time: number; // 時間を追加
  // 他に必要なフィールドを追加
};

type FormContextValue = {
  data: FormData;
  setData: (up: Partial<FormData>) => void;
};

const defaultData: FormData = {
  destinationTypes: [],
  task: '',
  method: '',
  weight: 60,
  goal: 50,
  time: 1, // デフォルトの時間を1時間に設定
};

const FormContext = createContext<FormContextValue | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
  const [data, setRaw] = useState<FormData>(defaultData);
  const setData = (up: Partial<FormData>) => setRaw(prev => ({ ...prev, ...up }));
  return (
    <FormContext.Provider value={{ data, setData }}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error('useFormContext must be used within FormProvider');
  return ctx;
}
