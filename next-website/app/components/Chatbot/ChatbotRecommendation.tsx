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