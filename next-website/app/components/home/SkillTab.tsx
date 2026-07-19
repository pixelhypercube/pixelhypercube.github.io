interface SkillTabProps {
    name?: string;
    icon?: any;
    currentTheme: string;
}

export function SkillTab({name, icon, currentTheme} : SkillTabProps) {
    return (
        <div 
            className={`${
                currentTheme === "D" ? "bg-stone-700 text-stone-200" : "bg-stone-200 text-stone-900"
            } border-stone-500 border rounded-xl h-9 px-1 w-max flex items-center justify-center group transition-all duration-300`}
        >
            <div className="flex items-center justify-center shrink-0">
                {icon}
            </div>
            <p className="m-0 font-medium text-sm max-w-0 opacity-0 overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out group-hover:max-w-40 group-hover:opacity-100 group-hover:ml-1.5 group-active:max-w-40 group-active:opacity-100 group-active:ml-1.5">
                {name}
            </p>
        </div>
    );
}