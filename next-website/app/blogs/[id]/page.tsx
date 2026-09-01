"use client"

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/app/components/LanguageContext";
import Navbar from "@/app/components/Navbar";
import { content } from "@/app/globals";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Download } from "lucide-react";

const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

export default function BlogPiece() {
    const [id, setId] = useState(0); 

    // STATES
    const { selectedLanguage, setSelectedLanguage } = useLanguage();
    const [currentTheme, setCurrentTheme] = useState("D");
    const [layoutWidth, setLayoutWidth] = useState("N");

    // REFS
    const containerRef = useRef<HTMLDivElement>(null);
    const navbarRef = useRef<HTMLDivElement>(null);

    // const footerContent = content[selectedLanguage]["footer"];

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

    const blogObj = content[selectedLanguage]["blogs"];
    const blogsList = blogObj["blogsList"];
    const blogInfo = blogsList[id];

    const {title, blogTextHTML, imgThumbnailURL} = blogInfo;

    if (!blogInfo) return (<div></div>);

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
            <div className="relative z-10 pt-24">
                <header style={{
                    backgroundImage:`url(${imgThumbnailURL})`,
                }}>

                </header>
                <main className="mx-40">
                    <h1>{title}</h1>
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            // headings
                            h1: ({ children }) => (
                                <h1 className="text-xl font-bold my-2 pb-1 border-b border-stone-500/30">
                                    {children}
                                </h1>
                            ),
                            h2: ({ children }) => (
                                <h2 className="text-lg font-bold my-2">{children}</h2>
                            ),
                            h3: ({ children }) => (
                                <h3 className="text-base font-semibold my-1.5">{children}</h3>
                            ),
                            h4: ({ children }) => (
                                <h4 className="text-sm font-semibold my-1">{children}</h4>
                            ),
                            h5: ({ children }) => (
                                <h5 className="text-xs font-semibold my-1">{children}</h5>
                            ),
                            h6: ({ children }) => (
                                <h6 className="text-xs font-medium my-0.5">{children}</h6>
                            ),

                            // links
                            a: ({ href, children }) => (
                                <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`underline underline-offset-2 font-medium transition-opacity hover:opacity-80 ${
                                        currentTheme === "D"
                                                ? "text-olive-300"
                                                : "text-olive-700"
                                    }`}
                                >
                                    {children}
                                </a>
                            ),

                            // paragraphs
                            p: ({ children }) => (
                                <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>
                            ),

                            // unwrap default <pre> wrapper to prevent <pre> -> <div> nesting errors
                            pre: ({ children }) => <>{children}</>,

                            // code blocks & inline code
                            code: ({ node, className, children, ...props }: any) => {
                                const content = String(children).replace(/\n$/, "");
                                const match = /language-(\w+)/.exec(className || "");
                                const language = match ? match[1] : "";
                                
                                const isInline = !className && !String(children).includes("\n");

                                if (isInline) {
                                    return (
                                        <code
                                            className={`px-1.5 py-0.5 rounded text-xs font-mono ${
                                                currentTheme === "D"
                                                    ? "bg-stone-900 text-olive-300"
                                                    : "bg-stone-100 text-olive-800"
                                            }`}
                                            {...props}
                                        >
                                            {children}
                                        </code>
                                    );
                                }

                                return (
                                    <div className="relative group my-2">
                                        {/* header bar with download button */}
                                        <div
                                            className={`flex justify-between items-center px-3 py-1.5 rounded-t-lg text-xs border-b ${
                                                currentTheme === "D"
                                                    ? "bg-stone-900 border-stone-800 text-stone-400"
                                                    : "bg-stone-200 border-stone-300 text-stone-600"
                                            }`}
                                        >
                                            <span>{language || "text"}</span>
                                            <button
                                                onClick={() => {
                                                    const ext =
                                                        language === "csv"
                                                            ? "csv"
                                                            : language === "json"
                                                            ? "json"
                                                            : "txt";
                                                    const mime =
                                                        language === "csv"
                                                            ? "text/csv"
                                                            : language === "json"
                                                            ? "application/json"
                                                            : "text/plain";
                                                    downloadFile(content, `portfolio_export.${ext}`, mime);
                                                }}
                                                className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                                            >
                                                <Download size={12} />
                                                <span>Download .{language || "txt"}</span>
                                            </button>
                                        </div>

                                        {/* code content */}
                                        <pre
                                            className={`p-2.5 rounded-b-lg text-xs overflow-x-auto ${
                                                currentTheme === "D"
                                                    ? "bg-stone-900 text-stone-200"
                                                    : "bg-stone-100 text-stone-800"
                                            }`}
                                        >
                                            <code className="font-mono" {...props}>
                                                {children}
                                            </code>
                                        </pre>
                                    </div>
                                );
                            },

                            blockquote: ({ children }) => (
                                <blockquote className="border-l-2 border-stone-400 pl-3 italic my-2 opacity-90">
                                    {children}
                                </blockquote>
                            ),
                        }}
                    >
                        {blogTextHTML}
                    </ReactMarkdown>
                </main>
            </div>
        </div>
    )
}