import { useMemo, useState } from "react"

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

    useMemo(async ()=>{
        setMounted(true);
        // process typing animation if true
        if (mounted) {
            if (showTypingAnimation) {
                let txt = "";
                for (let c of text) {
                    txt += c;
                    setCurrText(txt);
                    await delay(10);
                }
            } else setCurrText(text);
        }
    },[mounted]);
    

    return mounted && (
        <div className={`${isReceiver ? (currentTheme === "D" ? 'justify-self-start bg-stone-800 text-stone-100' : 'justify-self-start bg-stone-300 text-stone-800') : (currentTheme === "D" ? 'justify-self-end bg-olive-700 text-white' : 'justify-self-end bg-olive-300 text-olive-900')} p-2 mt-3 rounded-xl max-w-full wrap-anywhere ${transitionClasses}`}>
            <p>{currText}</p>
            <hr className={currentTheme === "D" ? 'border-stone-700/50 my-1' : 'border-stone-300 my-1'}/>
            <p className={`text-right text-sm italic ${currentTheme === "D" ? 'text-stone-400' : 'text-stone-500'}`}>{dateTime.toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit', 
                hour12: true 
            }).toLowerCase()}</p>
        </div>
    )
}