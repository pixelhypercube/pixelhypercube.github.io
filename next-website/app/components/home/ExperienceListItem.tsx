import { projectSkillsTabsDark, projectSkillsTabsLight } from "@/app/globals";
import Canvas3D from "../Canvas3D";
import { ProjectSkillTab } from "./ProjectSkillTab";
import { renderDate } from "./utils";
import { useEffect, useRef, useState } from "react";

interface ExperienceProps {
    company: string;
    role: string;
    description: Array<string>;
    dates: Array<Array<Date>>;
    currentTheme: string;
    skills?: Array<string>;
    transitionClasses?: string;
    jsonModel?:Record<string, string>;
    isModelVisible?:boolean;
    reflection?:string;

    bio_header?:string;
    reflection_header?:string;
}

interface Tab {
    id: string;
    name: string;
    data: Record<string, any> | string;
    exists: boolean;
    currentWidth?: number;
}

export function ExperienceListItem({
    company,role,description,dates,currentTheme,skills,transitionClasses,jsonModel,isModelVisible,reflection,bio_header,reflection_header
} : ExperienceProps) {
    const [currentTabs, setCurrentTabs] = useState<Tab[]>([]);
    const [selectedTab, setSelectedTab] = useState<any>();

    const tabBioBtn = useRef<HTMLButtonElement>(null);
    const tabReflectionBtn = useRef<HTMLButtonElement>(null);

    const tabs = [
        {
            id:"bio",
            name:bio_header,
            data:description,
            exists:!!description,
            ref:tabBioBtn
        },
        {
            id:"reflection",
            name:reflection_header,
            data:reflection,
            exists:!!reflection,
            ref:tabReflectionBtn
        },
    ];

    const [selectedTabStyle, setSelectedTabStyle] = useState<{
        width?: number;
        height?: number;
        transform?: string;
    }>({});

    useEffect(() => {
        const filtered = tabs.filter((item) => item.exists) as Tab[];
        setCurrentTabs(filtered);
        if (!selectedTab || !filtered.some(t => t.id === selectedTab.id)) {
            setSelectedTab(filtered?.[0]);
        }
    }, [description,reflection]);

    useEffect(() => {
        if (!selectedTab?.ref?.current) return;

        const updateSliderPosition = () => {
            const element = selectedTab.ref.current;
            if (element) {
                setSelectedTabStyle({
                    width: element.clientWidth,
                    height: element.clientHeight,
                    transform: `translateX(${element.offsetLeft}px)`,
                });
            }
        };

        updateSliderPosition();

        window.addEventListener("resize", updateSliderPosition);
        return () => window.removeEventListener("resize", updateSliderPosition);
    }, [selectedTab, currentTabs]);

    return (
        <div className={`${currentTheme==="D" ? "bg-stone-800 text-white" : "bg-stone-300 text-stone-900"} rounded-2xl p-5 text-left my-5 ${transitionClasses}`}>
            <header className="grid grid-cols-6 w-full mb-5 gap-4">
                <div className={`col-span-1 hidden md:block ${currentTheme==="D" ? "bg-stone-700 text-white" : "bg-stone-400 text-stone-900"} rounded-xl`}>
                    {jsonModel && isModelVisible && <Canvas3D voxelJson={jsonModel}/>}
                </div>
                <div className="col-span-4 md:col-span-3">
                    <h3 className="m-0">{role}</h3>
                    <h5 className="m-0">{company}</h5>
                    <div className="flex gap-x-1 mt-1">
                        {
                            skills?.map((skill,index)=>{
                                return (
                                    <ProjectSkillTab currentTheme={currentTheme} name={skill} icon={(currentTheme==="D") ? projectSkillsTabsDark[skill] :  projectSkillsTabsLight[skill]} key={`skill-${index}`}/>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="col-span-2 min-w-48 text-right italic">
                    <h6>
                    {
                        dates && dates.map((dateArr,idx: number)=>{
                            const [startDate, endDate] = dateArr;
                            return <p key={`date-${idx}`}>{renderDate(startDate) + " - " + renderDate(endDate) + ((idx<dates.length-1) ? ", " : "")}</p>;
                        })
                    }
                    </h6>
                </div>
            </header>
            <hr className={currentTheme==="D" ? "border-stone-700" : "border-stone-400"} />
            <main className="mt-4">
                {/* TABS */}
                    <div className="border-b-2 border-stone-600 relative mb-4">
                        <div className={
                            `
                            ${currentTheme==="D" ? "bg-stone-600" : "bg-stone-400"} z-0 absolute rounded-t-lg
                            ${transitionClasses} duration-200`
                        }
                        style={selectedTabStyle}
                        ></div>
                        <div className="grid grid-flow-col auto-cols-fr transition-all duration-100 w-full items-center">
                            {/* {relevant_coursework && 
                            <button onClick={()=>setSelectedTab(0)} className={`rounded-xl p-2 w-full ${currentTheme==="D" ? "bg-stone-700 text-white" : "bg-stone-400 text-stone-900"}`}>{relevant_coursework_header}</button>}
                            {activities && 
                            <button onClick={()=>setSelectedTab(1)} className={`rounded-xl p-2 w-full ${currentTheme==="D" ? "bg-stone-700 text-white" : "bg-stone-400 text-stone-900"}`}>{activities_header}</button>}
                            {academic_projects && 
                            <button onClick={()=>setSelectedTab(2)} className={`rounded-xl p-2 w-full ${currentTheme==="D" ? "bg-stone-700 text-white" : "bg-stone-400 text-stone-900"}`}>{academic_projects_header}</button>} */}
                            {
                                currentTabs.map((tab: any, index: number)=>{
                                    const {name,ref} = tab;
                                    return (
                                        <button className={`
                                                p-2 z-1 shrink-0 h-full
                                            `} 
                                            ref={ref} 
                                            onClick={()=>{
                                                setSelectedTab(tab);
                                                // console.log(selectedTab?.ref?.current?.offsetLeft)
                                            }} 
                                            key={index}>{name}</button>
                                    )
                                })
                            }
                            
                        </div>
                    </div>
                {/* can consider list/grid layout toggle */}
                {
                    selectedTab?.id === "bio" && (
                        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                            {
                                description && description.map((item: any, index: number)=>{
                                    const [desc, jsonModel] = item;
                                    return (
                                        <div 
                                        key={`desc-exp-${index}`} 
                                        className={`${currentTheme==="D" ? "bg-stone-700 text-stone-100" : "bg-stone-400 text-stone-950"} rounded-2xl p-4 ${transitionClasses}`}
                                        >
                                            <div className={`w-full h-36 relative`}>
                                                {isModelVisible && <Canvas3D voxelJson={jsonModel}/>}
                                            </div>
                                            <hr className={`${currentTheme==="D" ? "border-stone-500" : "border-stone-500"} mb-2`} />
                                            {desc}
                                        </div>
                                    )
                                })
                            }
                            {/* {description && 
                            <ul className="list-disc pl-5 pr-5">
                            {
                                description.map((item,index)=>{
                                    return (
                                        <li className="my-1" key={`d-${index}`}>{item}</li>
                                    )
                                })    
                            }
                            </ul>
                            } */}
                        </div>
                    )
                }
                {
                    selectedTab?.id==="reflection" && (
                        <div className={`flex-1 ${currentTheme==="D" ? "bg-mauve-700" : "bg-mauve-400"}  rounded-2xl p-4 mb-4 overflow-y-auto ${transitionClasses}`}>
                            <h5>{reflection_header}</h5>
                            {reflection}
                        </div>
                    )
                }
            </main>
        </div>
    )
}