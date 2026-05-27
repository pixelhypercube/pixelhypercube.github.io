import { Send, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ChatbotMessage from "./ChatbotMessage";
import { IS_DEBUG } from "@/app/globals";
import { useChat, UIMessage } from "@ai-sdk/react";

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
    messages?:[],
    isOpen:boolean,
    dialogCallbacks?: Record<any, ()=>void>;
    selectedLanguage: string;
    currentTheme: string;
    transitionClasses?: string;
}

export default function ChatbotDialog({dialogCallbacks, selectedLanguage, currentTheme, transitionClasses} : ChatbotDialogProps) {
    const openingMessage: Record<string, string> = {
        "en": "Hi! It's me, KJ again! Feel free to ask me about anything here! Like literally anything!",
        "zh-Hans": "你好！又是我，凯杰！在这里你可以问我任何事情！真的是任何事情哦！",
        "zh-Hant": "你好！又是我，凱傑！在這裡你可以問我任何事情！真的是任何事情哦！",
        "ja": "こんにちは！またまたカイジエです！ここからは何でも気軽に聞いてね！本当に何でもいいよ！",
    };
    
    const {messages: aiMessages, sendMessage, status, error} = useChat({
        messages: IS_DEBUG ? [
            {
                id: '1',
                role: 'user',
                content: "this is a sender's message",
                parts: [{ type: 'text', text: "this is a sender's message" }]
            },
            {
                id: '2',
                role: 'assistant',
                content: "this is a receiver's message",
                parts: [{ type: 'text', text: "this is a receiver's message" }]
            }
        ] : [
            {
                id: '1',
                role: 'assistant',
                content: openingMessage[selectedLanguage],
                parts: [{ type: 'text', text: openingMessage[selectedLanguage] }]
            }
        ]
    });
    
    const [isOpen, setOpen] = useState(false);
    const [messages, setMessages] = useState(IS_DEBUG ? DEMO_MESSAGES : []);

    const inputRef = useRef<HTMLTextAreaElement>(null!);

    function handleSend() {
        const inputVal = inputRef.current.value;
        if (inputVal) {
            sendMessage({
                text:inputVal
            })
            inputRef.current.value = "";
        }
    }

    const scrollContainerRef = useRef<HTMLElement>(null!);
    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
    }, [aiMessages, error]);

    return (
        <div className={`max-w-96 shadow-lg rounded-xl border ${
            currentTheme === "D" ? "bg-stone-900 border-stone-800" : "bg-white border-stone-200"
        } ${transitionClasses}`}>
            {/* header */}
            <header className={`p-3 flex h-1/6 w-full justify-between items-center rounded-t-xl ${
                currentTheme === "D" ? "bg-olive-900 text-olive-100" : "bg-olive-600 text-white"
            } ${transitionClasses}`}>
                <div>
                    <h6 className="m-0 font-semibold">Chatbot</h6>
                </div>
                <div>
                    <X className="cursor-pointer opacity-80 hover:opacity-100 text-white" onClick={()=>{
                        dialogCallbacks?.closeChatbot();
                    }}/>
                </div>
            </header>

            {/* messages list */}
            <main ref={scrollContainerRef} className={`overflow-y-scroll p-5 h-2/3 max-h-96 custom-scrollbar ${
                currentTheme === "D" ? "bg-stone-950" : "bg-olive-50/50"
            } ${transitionClasses}`}>
                {aiMessages.map((msg, index)=>{
                    const isReceiver = msg.role === 'assistant'
                    const isTyping = isReceiver && (status === 'submitted' || status ==='streaming') && index === aiMessages.length-1;
                    const textContent = msg.parts
                        ?.filter(part => part.type === 'text')
                        .map(part => part.text)
                        .join('') || '';

                    return (
                        <div key={`msg-${index}`} className={`flex ${isReceiver ? "justify-start" : "justify-end"} gap-x-3 mb-4  ${transitionClasses}`}>
                            {isReceiver && (
                                <div className="w-10 h-10 rounded-full bg-stone-600 flex items-center justify-center overflow-hidden shrink-0 self-end">
                                    <img key={`kj-avatar-${index}`} src={"./kj.png"} alt="KJ" className="w-full h-full object-cover"/>
                                </div>
                            )}
                            <ChatbotMessage
                                key={`msg-${index}`}
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
                
                {/* if there's error */}
                {error && (
                    <div className="justify-self-start bg-red-100 border border-red-300 text-red-800 p-3 m-5 rounded-xl text-sm max-w-96">
                        <strong>System Notice: </strong> 
                        {error.message.includes("API_KEY_EXPIRED") 
                            ? "Sorry, this chatbot is currently offline for maintenance." 
                            : "Sorry, this chatbot is receiving too much traffic right now. Please wait about 20-30 seconds before typing your next question!"}
                    </div>
                )}
            </main>

            {/* message input */}
            <footer className={`flex h-1/6 p-3 gap-2 rounded-b-xl border-t ${
                currentTheme === "D" ? "bg-stone-900 border-stone-800" : "bg-stone-50 border-stone-100"
            } ${transitionClasses}`}>
                <textarea 
                    ref={inputRef} 
                    placeholder="Type a message..."
                    className={`m-0 w-5/6 h-10 rounded-2xl border p-2 text-sm resize-none focus:outline-none focus:ring-1 ${
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
                    className={`p-2 w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${
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