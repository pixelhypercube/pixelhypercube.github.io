import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Code, Grid, List } from "lucide-react";
import CustomToggle from "../CustomToggle";
import Canvas3D from "../Canvas3D";
import { renderDate } from "./utils";
import { ProjectSkillTab } from "./ProjectSkillTab";
import { projectSkillsTabsDark, projectSkillsTabsLight } from "../../globals";

interface EducationProps {
    institution: string;
    certificate: string;
    relevant_coursework?: Record<string, any>;
    relevant_coursework_header: string;
    activities?: Record<string, any>;
    activities_header: string;
    academic_projects?: Array<Record<string, any>>;
    academic_projects_header: string;
    awards?: Record<string, any>;
    awards_header: string;
    bio?: Array<string | Record<string, any>>;
    bio_header:string;
    dates: Array<Array<any>>;
    media_url?: string;
    currentTheme: string;
    transitionClasses?: string;

    jsonModel?:Record<string, any>;
    academicProjects:Array<Record<string, any>>;
    skills?:Array<string>;

    isModelVisible?:boolean;
}

interface Tab {
    id: string;
    name: string;
    data: Record<string, any> | string;
    exists: boolean;
    currentWidth?: number;
}
export function EducationListItem({
    institution,
    certificate,
    relevant_coursework,
    relevant_coursework_header,
    activities,
    activities_header,
    academic_projects,
    academic_projects_header,
    awards,
    awards_header,
    bio,
    bio_header,
    dates,
    media_url,
    currentTheme,
    transitionClasses,
    jsonModel,
    skills,
    isModelVisible
} : EducationProps) {

    const [selectedRelCWIndex, setSelectedRelCWIndex] = useState(1);
    const [selectedActivitiesIndex, setSelectedActivitiesIndex] = useState(0);

    const [currentTabs, setCurrentTabs] = useState<Tab[]>([]);
    const [selectedTab, setSelectedTab] = useState<any>();

    const [acadProjectsIndexes, setAcadProjectsIndexes] = useState<number[]>();

    // REFS
    const bioRef = useRef<HTMLButtonElement>(null);
    const relevantRef = useRef<HTMLButtonElement>(null);
    const activitiesRef = useRef<HTMLButtonElement>(null);
    const projectsRef = useRef<HTMLButtonElement>(null);
    const awardsRef = useRef<HTMLButtonElement>(null);


    const tabs = [
        {
            id:"bio",
            name:bio_header,
            data:bio,
            exists:!!bio,
            ref:bioRef
        },
        {
            id:"relevant_coursework",
            name:relevant_coursework_header,
            data:relevant_coursework,
            exists:!!relevant_coursework,
            ref:relevantRef
        },
        {
            id:"activities",
            name:activities_header,
            data:activities,
            exists:!!activities,
            ref:activitiesRef
        },
        {
            id:"academic_projects",
            name:academic_projects_header,
            data:academic_projects,
            exists:!!academic_projects,
            ref:projectsRef
        },{
            id:"awards",
            name:awards_header,
            data:awards,
            exists:!!awards,
            ref:awardsRef
        }
    ];

    const [selectedTabStyle, setSelectedTabStyle] = useState<{
        width?: number;
        height?: number;
        transform?: string;
    }>({});

    // useRef<HTMLButtonElement>(null).current?.clientLeft

    useMemo(()=>{
        setAcadProjectsIndexes(academic_projects?.map((_: any, index: number)=>0));
    },[academic_projects]);
    
    useEffect(() => {
        const filtered = tabs.filter((item) => item.exists) as Tab[];
        setCurrentTabs(filtered);
        if (!selectedTab || !filtered.some(t => t.id === selectedTab.id)) {
            setSelectedTab(filtered?.[0]);
        }
    }, [relevant_coursework, activities, academic_projects, awards]);

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

    // const parentDivRef = useRef<HTMLDivElement>(null);

    return (
        <div className={`${currentTheme==="D" ? "bg-stone-800 text-white" : "bg-stone-300 text-stone-900"} rounded-2xl p-5 text-left my-5 ${transitionClasses} gap-4`}>
            <div className="w-full">
                <header className="grid grid-cols-6 w-full gap-4">
                    <div className={`hidden md:block col-span-1 ${currentTheme==="D" ? "bg-stone-700 text-white" : "bg-stone-400 text-stone-900"} rounded-xl`}>
                        {jsonModel && isModelVisible && <Canvas3D voxelJson={jsonModel}/>}
                    </div>
                    <div className="col-span-4 md:col-span-3">
                        <h3 className="m-0">{institution}</h3>
                        <h5 className="m-0 font-normal">{certificate}</h5>
                        <div className="flex gap-x-1 mb-2">
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
                            dates && dates.map((dateArr,_)=>{
                                const [startDate, endDate] = dateArr;
                                return renderDate(startDate) + " - " + (endDate instanceof Date ? renderDate(endDate) : endDate);
                            }).join(", ")
                        }
                        </h6>
                    </div>
                </header>
                <hr className={`${currentTheme==="D" ? "border-stone-700" : "border-stone-400"} my-4`}/>
                <main>
                    {/* <div className="flex gap-4 mb-4">
                        {bio?.map((item: any, index: number)=>{
                            const {json_model, info} = item;
                            return (
                                <div className={`${currentTheme==="D" ? "bg-stone-700 text-white" : "bg-stone-400 text-stone-900"} rounded-xl p-4 flex flex-col flex-1`} key={index}>
                                    {json_model && <div className="w-full h-36 relative">
                                        {isModelVisible && <Canvas3D voxelJson={json_model}/>}
                                    </div>}
                                    <hr className={`${currentTheme==="D" ? "border-stone-500" : "border-stone-500"} mb-2`} />
                                    {info}
                                </div>
                            )
                        })}
                    </div> */}
                    {/* TABS */}
                    <div className="border-b-2 border-stone-600 relative">
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
                    <div className="mt-4">
                        {selectedTab?.id==="bio" && (
                            <div className="grid md:grid-cols-2 gap-4">
                                {bio?.map((item: any, index: number)=>{
                                    const {json_model, info} = item;
                                    return (
                                        <div className={`${currentTheme==="D" ? "bg-stone-700 text-white" : "bg-stone-400 text-stone-900"} rounded-xl p-2`} key={index}>
                                            {json_model && <div className="w-full h-36 relative">
                                                {isModelVisible && <Canvas3D voxelJson={json_model}/>}
                                            </div>}
                                            <hr className={`${currentTheme==="D" ? "border-stone-500" : "border-stone-500"} mb-2`} />
                                            {info}
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                        {selectedTab?.id==="relevant_coursework" && (
                            <div>
                                {
                                    relevant_coursework && (
                                        // ${currentTheme==="D" ? 
                                        // "bg-stone-700 text-stone-100" : 
                                        // "bg-stone-400 text-stone-950"} 
                                        <div className={`
                                        rounded-xl w-full ${transitionClasses}`}>
                                            <div className={`flex w-full justify-between ${transitionClasses}`}>
                                                {/* <div>
                                                    <h4>{relevant_coursework_header}</h4>
                                                </div> */}
                                                {/* <div className="flex justify-end h-fit text-inherit">
                                                    <CustomToggle transitionClasses={transitionClasses} currentTheme={currentTheme} selectedIndex={selectedRelCWIndex} changeIndex={(index: number)=>setSelectedRelCWIndex(index)} values={[<List size={18}/>, <Grid size={18}/>]} />
                                                </div> */}
                                            </div>
                                            {/* <div className={`${selectedRelCWIndex === 0 ? "flex flex-wrap gap-2" : "grid md:grid-cols-3 sm:grid-cols-2 gap-3"} ${transitionClasses}`}> */}
                                            <div className={`grid md:grid-cols-3 sm:grid-cols-2 gap-3 ${transitionClasses}`}>
                                                {
                                                    Object.keys(relevant_coursework).map((moduleCode : string, index : number)=>{
                                                        if (selectedRelCWIndex===0) {
                                                            return <div key={`mod-${index}`} className={`${currentTheme==="D" ? "bg-mauve-700 text-white" : "bg-mauve-400 text-stone-900"} rounded-2xl p-2  ${transitionClasses}`}>
                                                                <p className="text-sm">{moduleCode} : {relevant_coursework[moduleCode]["name"]}</p>
                                                            </div>
                                                        } else if (selectedRelCWIndex===1) {
                                                            return <div key={`mod-${index}`} className={`${currentTheme==="D" ? "bg-mauve-700 text-white" : "bg-mauve-400 text-stone-900"} rounded-2xl p-2 flex flex-col  ${transitionClasses}`}>
                                                                <div className="w-full h-24">
                                                                    {isModelVisible && <Canvas3D voxelJson={relevant_coursework[moduleCode]["jsonModel"]} />}
                                                                </div>
                                                                <div className="text-center mt-4">
                                                                    <h6 className="my-0">{moduleCode}</h6>
                                                                    <p className="my-0 italic text-sm">{relevant_coursework[moduleCode]["name"]}</p>
                                                                </div>
                                                            </div>
                                                        }
                                                        return null;
                                                    })
                                                }
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        )}
                        {selectedTab?.id==="activities" && (
                            <div>
                                {
                                    activities && (
                                        // ${currentTheme==="D" ? 
                                        // "bg-stone-700 text-stone-100" : 
                                        // "bg-stone-400 text-stone-950"}
                                        <div className={`
                                        rounded-xl w-full ${transitionClasses}`}>
                                            <div className={`flex justify-between ${transitionClasses}`}>
                                                {/* <div>
                                                    <h4>{activities_header}</h4>
                                                </div> */}
                                                {/* <div className="flex justify-end h-fit text-inherit">
                                                    <CustomToggle transitionClasses={transitionClasses} currentTheme={currentTheme} selectedIndex={selectedActivitiesIndex} changeIndex={(index: number)=>setSelectedActivitiesIndex(index)} values={[<Grid size={18}/>, <List size={18}/>]} />
                                                </div> */}
                                            </div>
                                            <div className={`${transitionClasses}`}>
                                                <div className={`grid md:grid-cols-3 sm:grid-cols-2 gap-3 ${transitionClasses}`}>
                                                {
                                                    activities.map((activity: Record<string, any>, index: number)=>{
                                                        const {name, dates, bio} = activity;
                                                        
                                                        if (selectedActivitiesIndex === 0) {
                                                            return (
                                                                <div key={`activities-${index}`} 
                                                                className={`${currentTheme==="D" ? "bg-stone-700 text-stone-100" : "bg-stone-400 text-stone-950"} rounded-2xl p-2 ${transitionClasses}`}>
                                                                    <div className="w-full h-24">
                                                                        {isModelVisible && <Canvas3D voxelJson={activity["jsonModel"]} />}
                                                                    </div>
                                                                    <div>
                                                                        <h5 className="my-0">{name}</h5>
                                                                        <p className="my-0 text-sm italic">{
                                                                            dates && dates.map((dateArr: any[])=>{
                                                                                const [startDate, endDate] = dateArr;
                                                                                return renderDate(startDate) + " - " + (endDate instanceof Date ? renderDate(endDate) : endDate);
                                                                            })
                                                                        }
                                                                        </p>
                                                                        <hr className="my-2 opacity-50" />
                                                                        <ul className="list-disc mx-5">
                                                                            {bio && bio.length>0 && bio.map((item:string,index:number)=>(<li key={`bio-${index}`}>{item}</li>))}
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            )
                                                        } else if (selectedActivitiesIndex === 1) {
                                                            return (
                                                                <div key={`activities-${index}`} 
                                                                className={`${currentTheme==="D" ? "bg-stone-700 text-stone-100" : "bg-stone-400 text-stone-950"} rounded-2xl p-2 ${transitionClasses}`}>
                                                                    <div className="flex">
                                                                        <div className="w-7/8">
                                                                            <h5 className="my-0">{name}</h5>
                                                                            <p className="my-0 text-sm italic">{
                                                                                dates && dates.map((dateArr: any[])=>{
                                                                                    const [startDate, endDate] = dateArr;
                                                                                    return renderDate(startDate) + " - " + (endDate instanceof Date ? renderDate(endDate) : endDate);
                                                                                })
                                                                            }
                                                                            </p>
                                                                        </div>
                                                                        <div className="w-1/8">
                                                                            {isModelVisible && <Canvas3D voxelJson={activity["jsonModel"]} />}
                                                                        </div>
                                                                    </div>
                                                                    <hr className={`${currentTheme==="D" ? "border-stone-500" : "border-stone-400"} my-2`}/>
                                                                    <ul className="list-disc mx-5">
                                                                        {bio && bio.length>0 && bio.map((item:string,index:number)=>(<li key={`bio-${index}`}>{item}</li>))}
                                                                    </ul>
                                                                </div>
                                                            )
                                                        }
                                                        return null;
                                                    })
                                                }
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        )}
                        {selectedTab?.id==="academic_projects" && (
                            <div>
                                {academic_projects && academic_projects.map((item: any, projIndex: number)=>{
                                    const {module_code, title, short_description, languages, media, description, contributions, source_code} = item;
                                    
                                    const module_info = relevant_coursework?.[module_code];
                                    if (!module_info) return;

                                    const module_name = module_info?.["name"];
                                    if (!module_name) return;

                                    const {module_coordinators} = module_info;

                                    return (
                                        <div key={`acad-proj-${projIndex}`} className={
                                            `${currentTheme==="D" ? "bg-stone-700" : "bg-stone-300"}
                                            rounded-2xl p-4 my-4`
                                        }>
                                            <header className="flex justify-between items-start">
                                                <div>
                                                    <div className="flex gap-2">
                                                        <h3 className="mb-0">{title}</h3>
                                                    </div>
                                                    <div className="gap-2">
                                                        {/* <h5 className="mb-0 font-medium">{module_code} - {module_name}</h5> */}
                                                        {/* <h5 className="font-normal">{short_description}</h5> */}
                                                        {/* {
                                                            languages?.map((skill: any, index: number)=>{
                                                                return (
                                                                    <ProjectSkillTab currentTheme={currentTheme} name={skill} icon={(currentTheme==="D") ? projectSkillsTabsDark[skill] :  projectSkillsTabsLight[skill]} key={`skill-${index}`}/>
                                                                )
                                                            })
                                                        } */}
                                                    </div>
                                                    <div>
                                                        <h6>Module Coordinator{module_coordinators.length>1 ? "s" : ""}: {module_coordinators.join(", ")}</h6>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className={`flex rounded-full self-center items-center justify-center p-2 w-28 h-10 text-center 
                                                        ${currentTheme==="D" ? "border-amber-600 border bg-amber-800" : "border-amber-600 border bg-amber-300"}
                                                        font-bold text-xl`}>
                                                        <span>{module_code}</span>
                                                    </div>
                                                </div>
                                            </header>
                                            <hr className={`${currentTheme==="D" ? "border-stone-600" : "border-stone-400"} my-2`}/>
                                            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                                                <div className="lg:col-span-3">
                                                    <div className="flex-3">
                                                        <h5 className="mb-0">About:</h5>
                                                        <ul className="list-disc ml-4">
                                                            {description.map((item: any, index: number)=>{
                                                                return <li key={`desc-${index}`}>{item}</li>
                                                            })}
                                                        </ul>
                                                    </div>
                                                    <div className="flex-3">
                                                        <h5 className="mb-0">Key Contributions:</h5>
                                                        <ul className="list-disc ml-4">
                                                            {contributions.map((item: any, index: number)=>{
                                                                return <li key={`contrib-${index}`}>{item}</li>
                                                            })}
                                                        </ul>
                                                    </div>
                                                    {/* <hr className={`${currentTheme==="D" ? "border-stone-600" : "border-stone-400"} my-2`}/> */}
                                                </div>
                                                <div className="lg:col-span-2">
                                                    <div className="flex-2">
                                                        {
                                                            acadProjectsIndexes && (
                                                                <div className="relative group w-full aspect-video border border-stone-500 rounded-2xl overflow-hidden">
                                                                    <img 
                                                                        className="w-full aspect-video object-cover" 
                                                                        src={media[acadProjectsIndexes[projIndex]]}
                                                                    />
                                                                    {
                                                                        media.length > 1 && (
                                                                            <div className="absolute inset-0 flex items-center justify-between">
                                                                                <button onClick={()=>{
                                                                                    const projs = [...acadProjectsIndexes];
                                                                                    projs[projIndex] = (projs[projIndex] - 1 + media.length) % media.length;
                                                                                    setAcadProjectsIndexes(projs);
                                                                                }} className="pointer-events-auto h-full w-12 bg-black/80 opacity-0 hover:opacity-100 rounded-l-2xl flex items-center justify-center transition-opacity text-xl font-bold">
                                                                                    <ChevronLeft/>
                                                                                </button>
                                                                                <div className="flex gap-2 p-2 rounded-full bg-black/50 self-end mb-2 opacity-50 hover:opacity-100 transition-opacity ease-in-out duration-200">
                                                                                    {
                                                                                        media.map((_: any,idx: number)=>(
                                                                                        <button 
                                                                                            key={`circle-btn-${idx}`} 
                                                                                            onClick={()=>{
                                                                                                const projs = [...acadProjectsIndexes];
                                                                                                projs[projIndex] = idx;
                                                                                                setAcadProjectsIndexes(projs);
                                                                                            }} 
                                                                                            className={`w-3 h-3 hover:scale-125 transition-all rounded-full cursor-pointer ${idx===acadProjectsIndexes[projIndex] ? "bg-white" : "bg-white/50 hover:bg-white/75"}`}></button>
                                                                                        ))
                                                                                    }
                                                                                </div>
                                                                                <button onClick={()=>{
                                                                                    const projs = [...acadProjectsIndexes];
                                                                                    projs[projIndex] = (projs[projIndex] + 1) % media.length;
                                                                                    setAcadProjectsIndexes(projs);
                                                                                }} className="pointer-events-auto h-full w-12 bg-black/80 opacity-0 hover:opacity-100 rounded-r-2xl flex items-center justify-center transition-opacity text-xl font-bold">
                                                                                    <ChevronRight/>
                                                                                </button>
                                                                            </div>
                                                                        )
                                                                    }
                                                                </div>
                                                            )
                                                        }
                                                        <div className="mt-4">
                                                        {
                                                            source_code && (
                                                                <a className={`w-full flex justify-center items-center gap-2 ${currentTheme==="D" ? "bg-stone-500" : "bg-stone-400"} p-2 rounded-2xl text-center font-bold text-md`} href={source_code}><Code/> Source Code</a>
                                                            )
                                                        }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                        {selectedTab?.id==="awards" && (
                            <div>
                                {
                                    awards && (
                                        // ${currentTheme==="D" ? "bg-stone-700 text-stone-100" : "bg-stone-400 text-stone-950"}
                                        <div className={`rounded-xl w-full flex flex-col gap-2 ${transitionClasses}`}>
                                            {/* <h4 className="my-0">{awards_header} 🎖️</h4> */}
                                            <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
                                                {awards.map((award:Record<string, any>,idx: number)=>{
                                                    const {name, date} = award;
                                                    
                                                    return <div key={`award-${idx}`} className={`${currentTheme==="D" ? "bg-stone-700 text-stone-100" : "bg-stone-400 text-stone-950"} rounded-2xl p-2 ${transitionClasses}`}>
                                                        <div>
                                                            <h5 className="my-0">{name}</h5>
                                                            <p className="my-0 text-sm italic">{date && renderDate(date)}</p>
                                                        </div>
                                                    </div>
                                                })}
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    )
}