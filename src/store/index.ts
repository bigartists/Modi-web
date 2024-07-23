import { create } from 'zustand';
import { combine, devtools } from 'zustand/middleware';

import { kindStore } from './kind';
import { globalStore } from './global';

// 定义 GlobalStore

// 合并 Store
export const useCombinedStore = create(
  devtools(
    combine({ globalStore, kindStore }, (set, get) => ({
      ...globalStore(set, get),
      ...kindStore(set, get),
    }))
  )
);

// 使用合并后的 Store
// const CombinedStore = combinedStore(state => state)
