import { Bot, MessageCircle } from "lucide-react";
import ChatbotDialog from "./ChatbotDialog";
import { useState } from "react";

interface DialogCallbacks {
    closeChatbot:()=>void
}

interface ChatbotProps {
    isOpen?: boolean;
    onClick?: () => void;
    selectedLanguage: string;
    currentTheme: string;
    transitionClasses?: string;
    // dialogCallbacks?: DialogCallbacks;
}

export default function Chatbot({
    isOpen = false,
    onClick,
    selectedLanguage,
    currentTheme,
    transitionClasses
    // dialogCallbacks = {}
} : ChatbotProps) {
    const [opened, setOpened] = useState<boolean>(isOpen);
    
    return <div className={`fixed bottom-10 right-10 z-100 ${transitionClasses}`} onClick={onClick}>
        {
            opened ? (
            <ChatbotDialog
                selectedLanguage={selectedLanguage}
                isOpen={isOpen}
                // messages={[]}
                currentTheme={currentTheme}
                transitionClasses={transitionClasses}
                dialogCallbacks={{
                    closeChatbot:()=>setOpened(false)
                }}
            />
        ) : (
            <div onClick={()=>setOpened(true)} className={`rounded-4xl w-16 h-16 flex justify-center items-center ${currentTheme==="D" ? "bg-olive-700" : "bg-olive-400"} shadow-lg ${transitionClasses}`}>
                <div className="absolute bottom-20 right-0 bg-amber-900 border border-amber-700 rounded-xl p-2 w-36 text-sm text-center shadow-lg">
                    <p>Ask me anything!</p>
                </div>
                <Bot size={32}/>
            </div>
        )
        }
    </div>
}