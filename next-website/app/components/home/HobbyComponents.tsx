// About Btn component

import Canvas3D from "../Canvas3D";

interface HobbyButtonProps {
    name: string;
    className?: string; // to input tailwind css and other classes easily
    voxelJson?: Record<string, any>;
    onClick?: (value?: any) => void;
    isSelected: boolean;
    currentTheme: string;
    transitionClasses?: string;
}

export function HobbyButton({name, className, voxelJson, onClick, isSelected, currentTheme, transitionClasses} : HobbyButtonProps) {
    return (
        <button className={`${isSelected ? `ring-2 ${currentTheme === "D" ? "ring-white" : "ring-stone-800"}` : 'ring-0'} ${className} ${transitionClasses}`} onClick={onClick}>
            <h6>{name}</h6>
            {voxelJson && (
                <Canvas3D voxelJson={voxelJson} className="h-16 w-full"/>
            )}
        </button>
    )
}

interface RunningPBDivProps {
    name: string; // name of event (e.g. 5K, 10K, etc.)
    duration: number; // number of seconds
    bgColor: string; // bgColor
    transitionClasses?: string;
}

export function RunningPBDiv({name,duration,bgColor,transitionClasses} : RunningPBDivProps) {
    const getTime = (seconds: number) => {
        const h = Math.floor(seconds/3600);
        const m = Math.floor(seconds/60) % 60;
        const s = seconds % 60;

        return `${seconds>=3600 ? `${h<10 ? "0" : ""}${h}:` : ""}${m<10 ? "0" : ""}${m}:${s<10 ? "0" : ""}${s}`;
    };

    return (
        <div className={`p-4 ${bgColor} text-center rounded-3xl ${transitionClasses}`}>
            <h6>{name}</h6>
            <h4>{getTime(duration)}</h4>
        </div>
    )
}