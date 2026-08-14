"use client"
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/app/components/LanguageContext";
import Navbar from "@/app/components/Navbar";
import { content } from "@/app/globals";
import { BlogObj } from "./BlogComponents";

export default function Blog() {
    // STATES
    const { selectedLanguage, setSelectedLanguage } = useLanguage();
    const [currentTheme, setCurrentTheme] = useState("D");
    const [layoutWidth, setLayoutWidth] = useState("N");

    // REFS
    const containerRef = useRef<HTMLDivElement>(null);
    const navbarRef = useRef<HTMLDivElement>(null);

    // const footerContent = content[selectedLanguage]["footer"];
    const blogObj = content[selectedLanguage]["blogs"];
    const blogsList = blogObj["blogsList"];

    const transitionClasses = `transition-all ease-in-out duration-500`;

    // AUTO SET THEME BASED ON BROWSER PREFERENCES
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        setCurrentTheme(mediaQuery.matches ? "D" : "L");

        const handleChange = (e: MediaQueryListEvent) => {
            setCurrentTheme(e.matches ? "D" : "L");
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    // APPLY DATA-THEME AND DARK CLASS TO DOCUMENT ROOT
    useEffect(() => {
        if (currentTheme === "D") {
            document.documentElement.classList.add("dark");
            document.documentElement.setAttribute("data-theme", "D");
        } else {
            document.documentElement.classList.remove("dark");
            document.documentElement.setAttribute("data-theme", "L");
        }
    }, [currentTheme]);

    return (
        <div 
            ref={containerRef} 
            className={`relative w-full min-h-screen touch-pan-y ${currentTheme === "D" ? "bg-stone-900 text-white" : "bg-stone-200 text-stone-900"} ${transitionClasses}`}
            style={{ touchAction: "pan-y" }}
        >
            <Navbar
                callbacks={{
                    setScrollPosHome: () => {},
                    setScrollPosAboutMe: () => {},
                    setScrollPosSkills: () => {},
                    setScrollPosProjects: () => {},
                    setScrollPosExperience: () => {},
                    setScrollPosEducation: () => {},
                    onThemeToggle: (newTheme: string) => setCurrentTheme(newTheme),
                    onLayoutWidthToggle: (newLayoutWidth: string) => setLayoutWidth(newLayoutWidth),
                    onLanguageChange: (newLanguage: string) => setSelectedLanguage(newLanguage)
                }}
                selectedLanguage={selectedLanguage}
                currentTheme={currentTheme}
                transitionClasses={transitionClasses}
                currentPos="blog"
                ref={navbarRef}
            />

            {/* MAIN CONTENT */}
            <div className="relative z-10 pt-24">
                <div className="flex-col align-middle text-left">
                    <header className="text-center my-24">
                        <h1 className="text-6xl lg:text-8xl font-bold tracking-tight mb-4">
                            {blogObj["header"]}
                        </h1>
                        <p className="text-lg italic font-light opacity-80">
                            {blogObj["subheader"]}
                        </p>
                    </header>

                    <main className={`${layoutWidth === "N" ? "xl:w-6/9 w-8/9" : "w-8/9"} mx-auto mb-48 ${transitionClasses}`}>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {blogsList.map((blog: any, index: number) => {
                                const { title, blogTextHTML, imgThumbnailURL } = blog;
                                return (
                                    <BlogObj
                                        key={`blog-${index}`}
                                        id={index}
                                        title={title}
                                        blogTextHTML={blogTextHTML}
                                        imgThumbnailURL={imgThumbnailURL}
                                        currentTheme={currentTheme}
                                        transitionClasses={transitionClasses}
                                    />
                                );
                            })}
                        </div>
                    </main>

                    <footer className={`${currentTheme === "D" ? "bg-stone-800" : "bg-stone-400"} text-center ${transitionClasses} py-12`}>
                        <p className="italic font-light text-sm opacity-75 m-0">
                            Made with 🤍 using Next.js & Three.js!
                        </p>
                    </footer>
                </div>
            </div>
        </div>
    );
}