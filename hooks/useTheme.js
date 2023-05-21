import {
  getItemFromLocalStorage,
  setItemInLocalStorage,
} from '@/lib/localStorage/localStorage'
import { useState, useEffect } from 'react'

const useTheme = () => {
  const [theme, setTheme] = useState(
    getItemFromLocalStorage('theme') || 'light'
  )

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    setItemInLocalStorage('theme', theme)
  }, [theme])

  return [theme, toggleTheme]
}

export default useTheme
