import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'dark';
    });

    useEffect(() => {
        document.body.classList.remove('light', 'dark');
        document.body.classList.add(theme);
        localStorage.setItem('theme', theme)
    }, [theme])

    const lightTheme = () => {
        setTheme('light')
    }
    const darkTheme = () => {
        setTheme('dark')
    }

    return (
        <ThemeContext.Provider value={{ theme, lightTheme, darkTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
