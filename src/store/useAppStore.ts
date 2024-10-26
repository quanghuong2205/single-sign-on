import { LOCAL_STORAGE_KEYS } from '@/configs/localStorage.key';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type AppConfigs = {
  user: any;
};

export const useAppConfigsStore = create<AppConfigs>()(
  devtools(
    persist(
      (set) => ({
        user: {},
        setUser: (user: any) => set(() => ({ user })),
      }),
      {
        name: LOCAL_STORAGE_KEYS.USER,
        partialize: (state) => ({ user: state.user }),
      },
    ),
  ),
);
