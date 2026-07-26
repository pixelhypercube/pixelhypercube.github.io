import { useEffect, useMemo, useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { Check, Copy, Download, Repeat } from "lucide-react";
import VoiceButton from "../VoiceButton";


// helper function to trigger client-side file downloads
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

interface ChatbotMessageProps {
    isReceiver: boolean,
    text?: string,
    dateTime: Date,
    showTypingAnimation: boolean,
    currentTheme?: string,
    transitionClasses?: string,
    repeatFn?:()=>void;
    canRepeat: boolean;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default function ChatbotMessage({
    isReceiver,
    text = "",
    dateTime = new Date(),
    showTypingAnimation = false,
    currentTheme = "L",
    transitionClasses,
    repeatFn,
    canRepeat
} : ChatbotMessageProps) {
    const [mounted, setMounted] = useState(false);
    
    const [currText, setCurrText] = useState(""); // to determine the current state of the text (necessary for the typing animation when showTypingAnimation==true)

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(()=>{
        let isCancelled = false;

        const processText = async () => {
            if (showTypingAnimation) {
                let txt = "";
                for (let i = 0; i < text.length; i++) {
                    if (isCancelled) break;
                    txt += text[i];
                    setCurrText(txt);
                    await delay(10);
                }
            } else {
                setCurrText(text);
            }
        };

        processText();

        return () => {
            isCancelled = true;
        };
    }, [text, showTypingAnimation]);


    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(currText);
            setCopied(true);
            
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };


    if (!mounted) return null;

    return mounted && (
        <div className={`min-w-0 max-w-[calc(100%-3.25rem)] border ${isReceiver ? (currentTheme === "D" ? 'justify-self-start bg-stone-800 border-stone-600 text-stone-100' : 'justify-self-start bg-stone-300 border-stone-400 text-stone-800') : (currentTheme === "D" ? 'justify-self-end bg-olive-800 border-olive-600 text-white' : 'justify-self-end bg-olive-300 border-olive-400 text-olive-900')} p-2 mt-3 rounded-xl max-w-full wrap-anywhere ${transitionClasses}`}>
            <div className="prose prose-sm dark:prose-invert max-w-none text-sm">
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
                                    isReceiver
                                        ? currentTheme === "D"
                                            ? "text-olive-300"
                                            : "text-olive-700"
                                        : "text-white"
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
                    {currText}
                </ReactMarkdown>
            </div>
            <hr className={currentTheme === "D" ? 'border-stone-700/50 my-1' : 'border-stone-300 my-1'}/>
            <div className="flex justify-between">
                {isReceiver && (
                    <div className="flex gap-2">
                        {
                            canRepeat && <Repeat size={16} onClick={repeatFn} className={currentTheme === "D" ? "text-stone-300 hover:text-stone-400" : "text-stone-600 hover:text-stone-500"}/>
                        }
                        <div onClick={()=>handleCopy()}>
                            {
                                !copied ?
                                <Copy size={16} className={currentTheme === "D" ? "text-stone-300 hover:text-stone-400" : "text-stone-600 hover:text-stone-500"}/> :
                                <Check size={16} className={currentTheme === "D" ? "text-stone-300 hover:text-stone-400" : "text-stone-600 hover:text-stone-500"}/>
                            }
                        </div>
                        {
                            currText && <VoiceButton textToSpeak={currText} />
                        }
                        <p className={`mb-0 text-xs transition-opacity duration-150 ease-in-out select-none ${copied ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>Copied!</p>
                    </div>
                )}
                <p className={`text-right text-xs italic ${currentTheme === "D" ? 'text-stone-400' : 'text-stone-500'}`}>{dateTime.toLocaleTimeString('en-US', { 
                    hour: 'numeric', 
                    minute: '2-digit', 
                    hour12: true 
                }).toLowerCase()}</p>
            </div>
        </div>
    )
}