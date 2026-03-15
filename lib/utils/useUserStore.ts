import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserState {
  user: {
    name: string;
    businessName: string;
    email: string;
    phone: string;
  } | null;
  setUser: (userData: any) => void;
  getUserInitials: () => string;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      
      setUser: (userData) => {
        set({ user: userData });
      },
      
      getUserInitials: () => {
        const { user } = get();
        if (!user || !user.name) return '?';
        
        const nameParts = user.name.trim().split(' ');
        
        if (nameParts.length === 1) {
          return nameParts[0].charAt(0).toUpperCase();
        } else {
          const firstName = nameParts[0].charAt(0).toUpperCase();
          const lastName = nameParts[nameParts.length - 1].charAt(0).toUpperCase();
          return firstName + lastName;
        }
      },
      
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);