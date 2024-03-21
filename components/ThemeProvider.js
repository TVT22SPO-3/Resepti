import React, {useState} from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function ThemeProvider({children}) {
    const [isDarkMode, setIsDarkMode] = useState(false)
    
    const toggleDarkMode = () => {
        setIsDarkMode(prevDarkMode => !prevDarkMode)
    }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
        { children }
    </ThemeContext.Provider>
  )
}

