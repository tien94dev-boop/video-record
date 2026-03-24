"use client"
import React, { useState } from 'react';
import { useTheme } from "@/context/ThemeContext"


export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()
    console.log("theme", theme)
    const isOn = theme === "dark"
    return (
        <div className="fixed bottom-4 right-4">
            <button
                onClick={toggleTheme}
                type="button"
                aria-pressed={isOn}
                className={`
            relative inline-flex h-8 w-14 items-center rounded-full 
            transition-colors duration-300 ease-in-out focus:outline-none 
            focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            ${isOn ? 'bg-blue-600' : 'bg-gray-300'}
          `}
            >
                {/* Nút tròn bên trong */}
                <span
                    className={`
              inline-block h-6 w-6 transform rounded-full bg-white shadow-lg
              transition duration-300 ease-in-out
              ${isOn ? 'translate-x-7' : 'translate-x-1'}
            `}
                />
            </button>
        </div>
    );
}