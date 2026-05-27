"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface LanguageContextType {
    selectedLanguage: string;
    setSelectedLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({children} : {children:React.ReactNode}) {
    const [selectedLanguage, setSelectedLanguage] = useState("en");

    useEffect(()=>{
        const htmlElement = document.documentElement;

        if (selectedLanguage==="zh-Hans") htmlElement.setAttribute("lang","zh-CN"); // specifically for simplified chinese to standardize simplified characters
        else htmlElement.setAttribute("lang","en");
    }, [selectedLanguage]);

    return (
        <LanguageContext.Provider value={{selectedLanguage,setSelectedLanguage}}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const ctx = useContext(LanguageContext);
    if (!ctx)
        throw new Error("useLanguage must be used within a LanguageProvider");
    return ctx;
}