import { useInView } from "react-intersection-observer";
import Canvas3D from "../Canvas3D";

interface SkillContainerProps {
    name:string;
    proficiency:string; // pass from skill_proficiencies[number] (language_proficiencies[number] if skill is a language)
    jsonModelDark?: Record<string, any>;
    jsonModelLight?: Record<string, any>;
    currentTheme: string;
    transitionClasses?: string;
    className?: string;

    // CAMERA
    camPosition?: [number, number, number];
    fov?:number;
}

export function SkillContainer({
    name, proficiency, jsonModelDark, jsonModelLight, currentTheme, transitionClasses, className, camPosition, fov
} : SkillContainerProps) {
    return (
        <div className={`p-5 ${currentTheme==="D" ? "bg-stone-800" : "bg-stone-300"} min-w-40 min-h-40 max-w-40 rounded-xl flex flex-col items-center text-center ${className} ${transitionClasses}`}>
            {
                currentTheme==="D" && jsonModelDark && (
                    <Canvas3D camPosition={camPosition} fov={fov} voxelJson={jsonModelDark}/>
                )
            }
            {
                currentTheme==="L" && jsonModelLight && (
                    <Canvas3D camPosition={camPosition} fov={fov} voxelJson={jsonModelLight}/>
                )
            }
            <h6 className="mb-0">{name}</h6>
            <p className="italic text-sm">{proficiency}</p>
        </div>
    )
}