import { Send, User, X } from "lucide-react";
import { Ref, useEffect, useRef, useState } from "react";
import ChatbotMessage from "./ChatbotMessage";
import { IS_DEBUG } from "@/app/globals";
import { useChat } from "@ai-sdk/react";

interface ChatbotMessageProps {
    isReceiver: boolean;
    text?: string;
    dateTime: Date;
    showTypingAnimation: boolean;
}

const DEMO_MESSAGES = [
    {
        isReceiver: false,
        text:"this is a sender's message",
        dateTime: new Date(),
        showTypingAnimation: false
    },
    {
        isReceiver: true,
        text:"this is a receiver's message",
        dateTime: new Date(),
        showTypingAnimation: true
    }
]

interface ChatbotDialogProps {
    messages: any[];
    sendMessage: (message: { text: string }) => void;
    status: string;
    error: Error | undefined;
    isOpen: boolean;
    dialogCallbacks?: Record<string, () => void>;
    selectedLanguage: string;
    currentTheme: string;
    transitionClasses?: string;
    ref?: Ref<HTMLDivElement> | undefined;
}
export default function ChatbotDialog({
    messages,
    sendMessage,
    status,
    error,
    dialogCallbacks,
    selectedLanguage,
    currentTheme,
    transitionClasses,
    ref
} : ChatbotDialogProps) {
    
    const [isOpen, setOpen] = useState(false);
    const inputRef = useRef<HTMLTextAreaElement>(null!);
    const scrollContainerRef = useRef<HTMLElement>(null!);

    const scrollToBottom = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
    };

    // scroll when messages modify or errors append
    useEffect(() => {
        scrollToBottom();
    }, [messages, error]);

    // scroll on initial open (mount), with a micro-task delay to clear CSS transition animations
    useEffect(() => {
        scrollToBottom();
        const timer = setTimeout(scrollToBottom, 50);
        return () => clearTimeout(timer);
    }, []);

    const handleInputChange = () => {
        if (inputRef.current) {
            inputRef.current.style.height = "auto";
            inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
        }
    };

    const handleSend = () => {
        const inputVal = inputRef.current.value;
        if (inputVal) {
            sendMessage({ text: inputVal });
            inputRef.current.value = "";
            if (inputRef.current) {
                inputRef.current.style.height = "40px";
            }
        }
    }

    return (
        <div ref={ref} className={`md:max-w-96 h-125 shadow-lg rounded-xl border flex flex-col ${
            currentTheme === "D" ? "bg-stone-900 border-stone-800" : "bg-white border-stone-200"
        } ${transitionClasses}`}>
            {/* header */}
            <header className={`p-3 flex shrink-0 w-full justify-between items-center rounded-t-xl ${
                currentTheme === "D" ? "bg-olive-900 text-olive-100" : "bg-olive-600 text-white"
            } ${transitionClasses}`}>
                <div>
                    <h6 className="m-0 font-semibold">Chatbot (Beta)</h6>
                </div>
                <div>
                    <X className="cursor-pointer opacity-80 hover:opacity-100 text-white" onClick={()=>{
                        dialogCallbacks?.closeChatbot();
                    }}/>
                </div>
            </header>

            {/* messages list */}
            <main ref={scrollContainerRef} data-lenis-prevent className={`flex-1 overflow-y-auto p-5 overscroll-y-contain custom-scrollbar ${
                currentTheme === "D" ? "bg-stone-950" : "bg-olive-50/50"
            } ${transitionClasses}`}>
                {messages.map((msg, index)=>{
                    const isReceiver = msg.role === 'assistant'
                    const isTyping = isReceiver && (status === 'submitted' || status ==='streaming') && index === messages.length-1;
                    const textContent = msg.content || (msg.parts
                        ?.filter((part: any) => part.type === 'text')
                        .map((part: any) => part.text)
                        .join('')) || '';

                    return (
                        <div key={`msg-${index}`} className={`flex ${isReceiver ? "justify-start" : "justify-end"} gap-x-3 mb-4  ${transitionClasses}`}>
                            {isReceiver && (
                                <div className="w-10 h-10 rounded-full bg-stone-600 flex items-center justify-center overflow-hidden shrink-0 self-end">
                                    <img key={`kj-avatar-${index}`} src={`./logo_${selectedLanguage}.svg`} alt="KJ" className="w-1/2 h-1/2 object-cover"/>
                                </div>
                            )}
                            <ChatbotMessage
                                transitionClasses={transitionClasses}
                                currentTheme={currentTheme}
                                isReceiver={isReceiver}
                                text={textContent}
                                dateTime={new Date()}
                                showTypingAnimation={isTyping}
                            />
                            {!isReceiver && (
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 self-end ${
                                    currentTheme === "D" ? "bg-stone-800 text-stone-300" : "bg-stone-200 text-stone-700"
                                } ${transitionClasses}`}>
                                    <User size={20}/>
                                </div>
                            )}
                        </div>
                    )
                })}
                
                {error && (
                    <div className="justify-self-start bg-red-100 border border-red-300 text-red-800 p-3 m-5 rounded-xl text-sm max-w-96">
                        <strong>System Notice: </strong> 
                        {(() => {
                            const errMsg = error.message || "";
                            if (errMsg.includes("API_KEY_EXPIRED")) return "Sorry, this chatbot is currently offline for maintenance.";
                            if (errMsg.includes("RATE_LIMIT_EXHAUSTED")) return "Sorry, this chatbot is receiving too much traffic right now. Please wait about 25 seconds before typing your next question!";
                            if (errMsg.includes("MODEL_HIGH_DEMAND")) return "The AI model is currently under heavy load globally. Please try resending your message in a few moments.";
                            return "An unexpected error occurred. Please try again later.";
                        })()}
                    </div>
                )}
            </main>

            {/* message input */}
            <footer className={`flex shrink-0 p-3 gap-2 rounded-b-xl border-t items-end ${
                currentTheme === "D" ? "bg-stone-900 border-stone-800" : "bg-stone-50 border-stone-100"
            } ${transitionClasses}`}>
                <textarea 
                    ref={inputRef} 
                    onInput={handleInputChange}
                    placeholder="Type a message..."
                    className={`m-0 w-full h-10 max-h-32 min-h-10 rounded-2xl border p-2 text-sm resize-none focus:outline-none focus:ring-1 overflow-y-auto custom-scrollbar ${
                        currentTheme === "D" 
                            ? "bg-stone-800 border-stone-700 text-white placeholder-stone-500 focus:ring-olive-700" 
                            : "bg-white border-stone-300 text-stone-900 placeholder-stone-400 focus:ring-olive-500"
                    } ${transitionClasses}`}
                    onKeyDown={(e)=>{
                        if (e.key==='Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSend();
                        }
                    }}
                />
                <button 
                    className={`p-2 w-10 h-10 rounded-2xl flex items-center justify-center transition-colors shrink-0 ${
                        currentTheme === "D" ? "bg-olive-700 hover:bg-olive-600 text-white" : "bg-olive-600 hover:bg-olive-700 text-white"
                    } ${transitionClasses}`} 
                    onClick={()=>handleSend()}
                >
                    <Send size={16}/>
                </button>
            </footer>
        </div>
    )
}