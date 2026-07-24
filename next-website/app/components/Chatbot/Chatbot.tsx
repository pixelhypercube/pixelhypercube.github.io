import { Bot, MessageCircle, X } from "lucide-react";
import ChatbotDialog from "./ChatbotDialog";
import { Ref, useState } from "react";

import { content } from '../../globals';

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
    recommendations: any[];
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
    recommendations,
    sendMessage,
    status,
    error
} : ChatbotProps) {
    const [opened, setOpened] = useState<boolean>(isOpen);

    const dialogTextAndBgClasses = currentTheme === "D" 
    ? "bg-olive-700 border border-olive-500 text-white" 
    : "bg-olive-400 border border-olive-600 text-black";

    const chatbotTextInfo = content[selectedLanguage]["chatbot"];

    const [dialogClosed, setDialogClosed] = useState(false);
    
    return (
        <div ref={ref} className={`fixed ${!opened ? "bottom-10 right-10" : "md:bottom-0 md:right-0 bottom-0 right-0"} z-100 transition-colors duration-200 ease-in-out`} onClick={onClick}>
            {opened ? (
                <ChatbotDialog
                    selectedLanguage={selectedLanguage}
                    isOpen={isOpen}
                    messages={messages}
                    recommendations={recommendations}
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
                <div onClick={() => {setOpened(true); setDialogClosed(true);}} className={`relative rounded-4xl w-16 h-16 flex justify-center items-center ${currentTheme==="D" ? "bg-yellow-700" : "bg-yellow-500"} shadow-lg ${transitionClasses}`}>
                    <div className={`hidden ${!dialogClosed ? "md:block" : ""} absolute bottom-20 right-0 ${dialogTextAndBgClasses} rounded-xl p-2 w-36 text-sm text-center shadow-lg animate-bounce [animation-duration:3s] ${transitionClasses}`}>
                        {/* <X size={16} className="absolute right-2 top-2" /> */}
                        <p className="m-0">{chatbotTextInfo["intro_dialog"]}</p>
                    </div>
                    <Bot size={32}/>
                </div>
            )}
        </div>
    );
}