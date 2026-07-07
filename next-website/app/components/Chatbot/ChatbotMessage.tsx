import { useEffect, useMemo, useState } from "react"
import ReactMarkdown from "react-markdown"

interface ChatbotMessageProps {
    isReceiver: boolean,
    text?: string,
    dateTime: Date,
    showTypingAnimation: boolean,
    currentTheme?: string,
    transitionClasses?: string
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
export default function ChatbotMessage({
    isReceiver,
    text = "",
    dateTime = new Date(),
    showTypingAnimation = false,
    currentTheme = "L",
    transitionClasses
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

    if (!mounted) return null;

    return mounted && (
        <div className={`${isReceiver ? (currentTheme === "D" ? 'justify-self-start bg-stone-800 text-stone-100' : 'justify-self-start bg-stone-300 text-stone-800') : (currentTheme === "D" ? 'justify-self-end bg-olive-700 text-white' : 'justify-self-end bg-olive-300 text-olive-900')} p-2 mt-3 rounded-xl max-w-full wrap-anywhere ${transitionClasses}`}>
            <div className="prose prose-sm dark:prose-invert max-w-none text-sm">
                <ReactMarkdown>{currText}</ReactMarkdown>
            </div>
            <hr className={currentTheme === "D" ? 'border-stone-700/50 my-1' : 'border-stone-300 my-1'}/>
            <p className={`text-right text-xs italic ${currentTheme === "D" ? 'text-stone-400' : 'text-stone-500'}`}>{dateTime.toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit', 
                hour12: true 
            }).toLowerCase()}</p>
        </div>
    )
}