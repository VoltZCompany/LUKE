'use client'

import { create } from 'zustand'

interface AppState {
  // Auth
  isLoggedIn: boolean
  setLoggedIn: (v: boolean) => void

  // User settings
  userName: string
  setUserName: (name: string) => void

  // Theme
  theme: 'light' | 'dark'
  toggleTheme: () => void

  // Discord
  discordWebhook: string
  setDiscordWebhook: (url: string) => void

  // Verification
  verificationEnabled: boolean
  setVerificationEnabled: (v: boolean) => void
  isVerified: boolean
  setIsVerified: (v: boolean) => void

  // Radial menu
  radialOpen: boolean
  setRadialOpen: (v: boolean) => void

  // Init from localStorage
  hydrate: () => void
}

export const useStore = create<AppState>((set, get) => ({
  isLoggedIn: false,
  setLoggedIn: (v) => {
    set({ isLoggedIn: v })
    if (typeof window !== 'undefined') localStorage.setItem('luke_loggedIn', v ? '1' : '0')
  },

  userName: '',
  setUserName: (name) => {
    set({ userName: name })
    if (typeof window !== 'undefined') localStorage.setItem('luke_userName', name)
  },

  theme: 'light',
  toggleTheme: () => {
    const next = get().theme === 'light' ? 'dark' : 'light'
    set({ theme: next })
    if (typeof window !== 'undefined') {
      localStorage.setItem('luke_theme', next)
      document.documentElement.classList.toggle('dark', next === 'dark')
    }
  },

  discordWebhook: '',
  setDiscordWebhook: (url) => {
    set({ discordWebhook: url })
    if (typeof window !== 'undefined') localStorage.setItem('luke_discordWebhook', url)
  },

  verificationEnabled: false,
  setVerificationEnabled: (v) => {
    set({ verificationEnabled: v })
    if (typeof window !== 'undefined') localStorage.setItem('luke_verificationEnabled', v ? '1' : '0')
  },

  isVerified: false,
  setIsVerified: (v) => set({ isVerified: v }),

  radialOpen: false,
  setRadialOpen: (v) => set({ radialOpen: v }),

  hydrate: () => {
    if (typeof window === 'undefined') return
    const loggedIn = localStorage.getItem('luke_loggedIn') === '1'
    const userName = localStorage.getItem('luke_userName') || ''
    const theme = (localStorage.getItem('luke_theme') as 'light' | 'dark') || 'light'
    const discordWebhook = localStorage.getItem('luke_discordWebhook') || ''
    const verificationEnabled = localStorage.getItem('luke_verificationEnabled') === '1'

    document.documentElement.classList.toggle('dark', theme === 'dark')

    set({
      isLoggedIn: loggedIn,
      userName,
      theme,
      discordWebhook,
      verificationEnabled,
      isVerified: !verificationEnabled, // if verification is OFF, user is already verified
    })
  },
}))
