import { Maximize, Maximize2, Minimize, Minimize2, Send, User, X } from "lucide-react";
import { Ref, useEffect, useRef, useState } from "react";
import ChatbotMessage from "./ChatbotMessage";
import { IS_DEBUG } from "@/app/globals";
import { useChat } from "@ai-sdk/react";
import { ChatbotRecommendation } from "./ChatbotRecommendation";

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
    recommendations: any[],
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
    recommendations,
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

    const handleSend = (val?: string) => {
        if (val) {sendMessage({text:val}); return;}

        const inputVal = inputRef.current.value;
        if (inputVal) {
            sendMessage({ text: inputVal });
            inputRef.current.value = "";
            if (inputRef.current) {
                inputRef.current.style.height = "40px";
            }
        }
    }

    useEffect(() => {
        scrollToBottom();
        const timer = setTimeout(scrollToBottom, 50);
        return () => clearTimeout(timer);
    }, [messages, recommendations, error]);


    // WINDOW DRAGGING FUNCTIONALITIES
    const [position, setPosition] = useState<{ x: number; y: number }>({x:0,y:0});
    const [isDragging, setIsDragging] = useState(false);
    const dragStartRef = useRef<{ x: number; y: number }>({x:0,y:0});
    const initialPosRef = useRef<{ x: number; y: number }>({x:0,y:0});

    const handleMouseDown = (e: React.MouseEvent) => {
        // ignore clicks on header action buttons
        if ((e.target as HTMLElement).closest("button") || (e.target as HTMLElement).closest("svg")) {
            return;
        }
        setIsDragging(true);
        dragStartRef.current = { x: e.clientX, y: e.clientY };
        initialPosRef.current = { ...position };
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging) return;
            const dx = e.clientX - dragStartRef.current.x;
            const dy = e.clientY - dragStartRef.current.y;
            setPosition({
                x: initialPosRef.current.x + dx,
                y: initialPosRef.current.y + dy,
            });
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging]);

    // WINDOW RESIZE & MAXIMIZE FUNCTIONALITIES
    const [size, setSize] = useState<{ width: number; height: number }>({ width: 400, height: 560 });
    const [isMaximized, setIsMaximized] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    
    // Backup state for restoring when un-maximizing
    const preMaximizeStateRef = useRef<{ size: { width: number; height: number }; position: { x: number; y: number } }>({
        size: { width: 400, height: 560 },
        position: { x: 0, y: 0 }
    });

    const activeCornerRef = useRef<string | null>(null);
    const resizeStartRef = useRef<{ mouseX: number; mouseY: number; startWidth: number; startHeight: number; startPosX: number; startPosY: number }>({
        mouseX: 0,
        mouseY: 0,
        startWidth: 400,
        startHeight: 560,
        startPosX: 0,
        startPosY: 0
    });

    const toggleMaximize = () => {
        if (isMaximized) {
            // Restore position and size
            setSize(preMaximizeStateRef.current.size);
            setPosition(preMaximizeStateRef.current.position);
            setIsMaximized(false);
        } else {
            // Save current position and size
            preMaximizeStateRef.current = { size, position };
            setIsMaximized(true);
        }
    };

    const handleResizeMouseDown = (corner: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (isMaximized) return;

        setIsResizing(true);
        activeCornerRef.current = corner;
        resizeStartRef.current = {
            mouseX: e.clientX,
            mouseY: e.clientY,
            startWidth: size.width,
            startHeight: size.height,
            startPosX: position.x,
            startPosY: position.y
        };
    };

    useEffect(() => {
        const handleResizeMouseMove = (e: MouseEvent) => {
            if (!isResizing || !activeCornerRef.current) return;

            const minWidth = 320;
            const minHeight = 380;

            const dx = e.clientX - resizeStartRef.current.mouseX;
            const dy = e.clientY - resizeStartRef.current.mouseY;

            const { startWidth, startHeight, startPosX, startPosY } = resizeStartRef.current;
            const corner = activeCornerRef.current;

            let newWidth = startWidth;
            let newHeight = startHeight;
            let newPosX = startPosX;
            let newPosY = startPosY;

            // HORIZONTAL RESIZING
            if (corner === "tr" || corner === "br") {
                newWidth = Math.max(minWidth, startWidth + dx);
                const widthDelta = newWidth - startWidth;
                newPosX = startPosX + widthDelta;
            } else if (corner === "tl" || corner === "bl") {
                newWidth = Math.max(minWidth, startWidth - dx);
                newPosX = startPosX;
            }

            // VERTICAL RESIZING
            if (corner === "bl" || corner === "br") {
                newHeight = Math.max(minHeight, startHeight + dy);
                const heightDelta = newHeight - startHeight;
                newPosY = startPosY + heightDelta;
            } else if (corner === "tl" || corner === "tr") {
                newHeight = Math.max(minHeight, startHeight - dy);
                newPosY = startPosY;
            }

            setSize({ width: newWidth, height: newHeight });
            setPosition({ x: newPosX, y: newPosY });
        };

        const handleResizeMouseUp = () => {
            setIsResizing(false);
            activeCornerRef.current = null;
        };

        if (isResizing) {
            window.addEventListener("mousemove", handleResizeMouseMove);
            window.addEventListener("mouseup", handleResizeMouseUp);
        }

        return () => {
            window.removeEventListener("mousemove", handleResizeMouseMove);
            window.removeEventListener("mouseup", handleResizeMouseUp);
        };
    }, [isResizing]);
    return (
        <div 
            ref={ref}
            style={{
                transform: isMaximized ? `translate3d(-16px, -16px, 0px)` : `translate3d(${position.x}px, ${position.y}px, 0px)`,
                width: isMaximized ? "calc(100vw - 10px)" : `${size.width}px`,
                height: isMaximized ? "calc(100vh)" : `${size.height}px`,
            }}
            className={`relative shadow-2xl rounded-xl border flex flex-col ${
                isMaximized ? "fixed inset-4 z-50 max-w-none max-h-none" : ""
            } ${
                currentTheme === "D" ? "bg-stone-900 border-stone-800" : "bg-white border-stone-200"
            } ${!isDragging && !isResizing ? (transitionClasses || "") : ""}`}
        >
            {/* 4 CORNER RESIZE HANDLES */}
            {!isMaximized && (
                <>
                    <div
                        onMouseDown={(e) => handleResizeMouseDown("tl", e)}
                        className="absolute -top-1 -left-1 w-4 h-4 cursor-nwse-resize z-30 select-none"
                    />
                    <div
                        onMouseDown={(e) => handleResizeMouseDown("tr", e)}
                        className="absolute -top-1 -right-1 w-4 h-4 cursor-nesw-resize z-30 select-none"
                    />
                    <div
                        onMouseDown={(e) => handleResizeMouseDown("bl", e)}
                        className="absolute -bottom-1 -left-1 w-4 h-4 cursor-nesw-resize z-30 select-none"
                    />
                    <div
                        onMouseDown={(e) => handleResizeMouseDown("br", e)}
                        className="absolute -bottom-1 -right-1 w-4 h-4 cursor-nwse-resize z-30 select-none"
                    />
                </>
            )}
            {/* header */}
            <header onMouseDown={handleMouseDown} className={`p-3 select-none ${!isMaximized && (isDragging ? "cursor-grabbing" : "cursor-grab")} flex shrink-0 w-full justify-between items-center rounded-t-xl ${
                currentTheme === "D" ? "bg-olive-900 text-olive-100" : "bg-olive-600 text-white"
            } ${transitionClasses}`}>
                <div>
                    <h6 className="m-0 font-semibold">KJ's AI Chatbot (Beta)</h6>
                </div>
                <div className="gap-4">
                    <button
                        onClick={toggleMaximize}
                        className="opacity-80 hover:opacity-100 text-white transition-opacity p-0.5 rounded"
                        title={isMaximized ? "Restore Window" : "Maximize Window"}
                    >
                        {isMaximized ? <Minimize size={18} /> : <Maximize size={18} />}
                    </button>
                    <button
                        onClick={() => dialogCallbacks?.closeChatbot()}
                        className="opacity-80 hover:opacity-100 text-white transition-opacity p-0.5 rounded"
                        title="Close Window"
                    >
                        <X size={18}/>
                    </button>
                </div>
            </header>

            {/* messages list */}
            <main ref={scrollContainerRef} data-lenis-prevent className={`flex-1 overflow-y-auto overflow-x-hidden w-full p-5 overscroll-y-contain custom-scrollbar ${
                currentTheme === "D" ? "bg-stone-950" : "bg-olive-50/50"
            } ${transitionClasses}`}>
                {messages.map((msg, index)=>{
                    const isReceiver = msg.role === 'assistant'
                    // const isTyping = isReceiver && (status === 'submitted' || status ==='streaming') && index === messages.length-1;
                    const isTyping = false; // make it disabled as there's a lot of info generated already
                    const textContent = msg.content || (msg.parts
                        ?.filter((part: any) => part.type === 'text')
                        .map((part: any) => part.text)
                        .join('')) || '';

                    return (
                        <div key={`msg-${index}`} className={`flex w-full min-w-0 ${isReceiver ? "justify-start" : "justify-end"} gap-x-3 mb-4  ${transitionClasses}`}>
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

                {/* recommendations list */}
                {recommendations && recommendations.length>0 && (
                    <div className={`flex flex-col gap-4 items-end w-full max-w-full min-w-0 my-2`}>
                        <p className="text-sm">Not sure what to ask? Choose something:</p>
                        {
                            recommendations.map((rec: any, index: number)=>{
                                const {recommendation, message, type} = rec;
                                return (
                                    <div key={`rec-${index}`}>
                                        <ChatbotRecommendation
                                            recommendation={recommendation}
                                            message={message}
                                            recType={type}
                                            onClick={()=>handleSend(message)}
                                            currentTheme={currentTheme}
                                            transitionClasses={transitionClasses}
                                        />
                                    </div>
                                )
                            })
                        }
                    </div>
                )}
                
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
            <footer className={`p-3 rounded-b-xl border-t items-end ${
                currentTheme === "D" ? "bg-stone-900 border-stone-800" : "bg-stone-50 border-stone-100"
            } ${transitionClasses}`}>
                <div className="flex shrink-0 gap-2">
                    <textarea 
                        ref={inputRef} 
                        onInput={handleInputChange}
                        placeholder="Type a message..."
                        className={`m-0 w-full h-10 max-h-32 min-h-10 rounded-xl border p-2 text-sm resize-none focus:outline-none focus:ring-1 overflow-y-auto custom-scrollbar ${
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
                        className={`p-2 w-10 h-10 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
                            currentTheme === "D" ? "bg-olive-700 hover:bg-olive-600 text-white" : "bg-olive-600 hover:bg-olive-700 text-white"
                        } ${transitionClasses}`} 
                        onClick={()=>handleSend()}
                    >
                        <Send size={16}/>
                    </button>
                </div>
                <div className="w-full flex justify-center mt-2">
                    <small className={`text-[11px] ${currentTheme==="D" ? "text-stone-400" : "text-stone-500"}`}>AI can make mistakes, so double-check it</small>
                </div>
            </footer>
            
        </div>
    )
}