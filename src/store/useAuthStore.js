"use client";

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAuthStore = create(persist(
  (set) => ({
    user: null,
    isLoggedIn: false, 
    saveUser: (userData) => set({ user: userData, isLoggedIn: !!userData }),
    removeUser: () => set({ user: null, isLoggedIn: false }),
  }),
  {
    name: 'auth-storage',
  }
))

export default useAuthStore;
