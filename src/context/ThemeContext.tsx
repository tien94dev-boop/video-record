"use client"

import { createContext, ReactNode, useState, useContext } from "react"

export const ThemeContext = createContext<any>(null)

export function ThemeProvider({ children } : {children: ReactNode}) {
    const [theme, setTheme] = useState("light")

    function toggleTheme(){
        setTheme((prev)=>(prev === "light" ? "dark" : "light"))
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme(){
    const context = useContext(ThemeContext)
    if(!context){
        throw new Error("useTheme phải được đặt trong ThemeProvider")
    }
    return context
}

