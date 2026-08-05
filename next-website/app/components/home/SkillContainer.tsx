import { useInView } from "react-intersection-observer";
import Canvas3D from "../Canvas3D";
import { useRef, useState } from "react";

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
        <div className={`p-5 ${currentTheme==="D" ? "bg-stone-800" : "bg-stone-300"} min-w-36 min-h-36 max-w-36 rounded-xl flex flex-col items-center text-center ${className} ${transitionClasses}`}>
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
            <h6 className="mb-0 text-sm">{name}</h6>
            <p className="italic text-xs">{proficiency}</p>
        </div>
    )
}

export function SkillContainer2({
    name, proficiency, jsonModelDark, jsonModelLight, currentTheme, transitionClasses, className, camPosition, fov
} : SkillContainerProps) {
    const [hovering, setHovering] = useState(false);
    // const [coords, setCoords] = useState({ x: 0, y: 0 });

    const divRef = useRef<HTMLDivElement>(null);

    return (
        <div 
        onMouseEnter={()=>setHovering(true)} 
        onMouseLeave={()=>setHovering(false)} 
        // onMouseMove={(e)=>{
        //     const rect = e.currentTarget.getBoundingClientRect();
    
        //     setCoords({
        //         x: e.clientX-rect.left,
        //         y: e.clientY-rect.top+12
        //     });
        // }}
        ref={divRef}
        className={`relative ${hovering ? "z-30" : "z-0"} border mb-4 p-2 ${currentTheme==="D" ? "bg-stone-800 border-stone-600" : "bg-stone-300 border-stone-500"} rounded-xl min-w-16 min-h-16 max-w-16 flex flex-col items-center text-center ${className} ${transitionClasses}`}>
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
            <div className={`
                ${hovering ? "opacity-100" : "opacity-0"} min-w-16 transition-opacity select-none duration-150 ease-in-out pointer-events-none absolute z-1000 rounded-xl border border-stone-700 bg-black p-2 text-white shadow-lg
            `}
            style={{
                // left: `${coords.x}px`,
                // top: `${coords.y}px`,
                transform: "translateY(48px)"
            }}
            >
                <p className="mb-0 text-xs font-semibold">{name}</p>
                <p className="italic text-xs">{proficiency}</p>
            </div>
        </div>
    )
}