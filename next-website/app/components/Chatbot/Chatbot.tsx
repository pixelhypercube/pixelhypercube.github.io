import { Bot, MessageCircle } from "lucide-react";
import ChatbotDialog from "./ChatbotDialog";
import { Ref, useState } from "react";

interface DialogCallbacks {
    closeChatbot:()=>void
}

interface ChatbotProps {
    isOpen?: boolean;
    onClick?: () => void;
    selectedLanguage: string;
    currentTheme: string;
    transitionClasses?: string;
    ref?: Ref<HTMLDivElement> | undefined;
    messages: any[];
    sendMessage: (message: { text: string }) => void;
    status: string;
    error: Error | undefined;
}

export default function Chatbot({
    isOpen = false,
    onClick,
    selectedLanguage,
    currentTheme,
    transitionClasses,
    ref,
    messages,
    sendMessage,
    status,
    error
} : ChatbotProps) {
    const [opened, setOpened] = useState<boolean>(isOpen);

    const dialogTextAndBgClasses = currentTheme === "D" 
    ? "bg-amber-700 border border-amber-500 text-white" 
    : "bg-amber-500 border border-amber-600 text-black";
    
    return (
        <div ref={ref} className={`fixed ${!opened ? "bottom-10 right-10" : "md:bottom-0 md:right-0 bottom-0 right-0"} z-100 transition-colors duration-200 ease-in-out`} onClick={onClick}>
            {opened ? (
                <ChatbotDialog
                    selectedLanguage={selectedLanguage}
                    isOpen={isOpen}
                    messages={messages}
                    sendMessage={sendMessage}
                    status={status}
                    error={error}
                    currentTheme={currentTheme}
                    transitionClasses={transitionClasses}
                    dialogCallbacks={{
                        closeChatbot: () => setOpened(false)
                    }}
                />
            ) : (
                <div onClick={() => setOpened(true)} className={`rounded-4xl w-16 h-16 flex justify-center items-center ${currentTheme==="D" ? "bg-olive-700" : "bg-olive-400"} shadow-lg ${transitionClasses}`}>
                    <div className={`absolute bottom-20 right-0 ${dialogTextAndBgClasses} rounded-xl p-2 w-36 text-sm text-center shadow-lg animate-bounce [animation-duration:3s]`}>
                        <p className="m-0">Ask me anything!</p>
                    </div>
                    <Bot size={32}/>
                </div>
            )}
        </div>
    );
}