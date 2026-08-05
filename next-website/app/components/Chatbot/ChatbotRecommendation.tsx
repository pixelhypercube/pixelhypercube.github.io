import { 
  BookText, 
  Search, 
  MessageCircle, 
  Download, 
  Code2, 
  FolderGit2, 
  Mail, 
  TrendingUp,
  HelpCircle 
} from "lucide-react";
import { useEffect, useState } from "react";

interface ChatbotRecommendationProps {
    recommendation: string;
    message: string;
    recType?: string;
    onClick?: () => void;
    currentTheme?: string;
    transitionClasses?: string;
    recIndex: number;
}

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    summary: BookText,
    search: Search,
    ask: MessageCircle,
    export: Download,
    code: Code2,
    project: FolderGit2,
    contact: Mail,
    metrics: TrendingUp,
};

export function ChatbotRecommendation({
    recommendation,
    recType = "ask",
    onClick,
    currentTheme,
    transitionClasses
} : ChatbotRecommendationProps) {
    const IconComponent = ICON_MAP[recType] || HelpCircle;

    const [mounted, setMounted] = useState(false);

    useEffect(()=>{
        setMounted(true);
    },[mounted]);

    return (
        <div onClick={onClick} className={`${mounted ? "opacity-100" : "opacity-0"} flex p-2 items-center rounded-xl border ${currentTheme==="D" ? "bg-olive-700 border-olive-500 hover:bg-olive-600 message-white" : "bg-olive-300 border-olive-500 hover:bg-olive-400 message-black"} transition-opacity duration-250 ease-in-out`}>
            <IconComponent size={20} className="shrink-0" />
            <p className="mb-0 ml-4 text-sm select-none">{recommendation}</p>
        </div>
    )
}

export function ChatbotRecommendation2({
    recommendation,
    recType = "ask",
    onClick,
    currentTheme,
    transitionClasses,
    recIndex
} : ChatbotRecommendationProps) {
    const IconComponent = ICON_MAP[recType] || HelpCircle;

    const [mounted, setMounted] = useState(false);

    useEffect(()=>{
        setMounted(true);
    },[mounted]);

    return (
        <div onClick={onClick} className={`${mounted ? "opacity-100" : "opacity-0"} h-full flex p-3 items-center rounded-3xl border 
        ${currentTheme==="D" ? 
        (
            recIndex%3<1 ? 
            "bg-olive-800 border-olive-600 hover:bg-olive-700 message-white" :
            "bg-taupe-800 border-taupe-600 hover:bg-taupe-700 message-white") 
        : 
        (
            recIndex%3<1 ? 
            "bg-olive-200 border-olive-400 hover:bg-olive-300 message-black" :
            "bg-taupe-200 border-taupe-400 hover:bg-taupe-300 message-black"
        )
        } transition-all duration-250 ease-in-out`}>
            <IconComponent size={20} className="shrink-0" />
            <p className="mb-0 ml-4 text-sm select-none">{recommendation}</p>
        </div>
    )
}