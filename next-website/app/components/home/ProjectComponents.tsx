import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Circle, Code } from "lucide-react";
import { CgWebsite } from "react-icons/cg";
import { renderDate } from "./utils";
import { SkillTab } from "./SkillTab";
import { projectSkillsTabsDark, projectSkillsTabsLight } from "../../globals";

interface ProjectProps {
    name?: string,
    short_description?: string,
    description?: string,
    reflection?: string,
    skills?: [],
    date?: Date,
    media_url?: Array<string>, // first one is the MAIN media
    source_code?: string,
    web_link?: string,
    currentTheme: string,
    transitionClasses?: string,
    changelog?: Array<Record<string, any>>
    
    // headers
    about_header?: string,
    reflection_header?: string,
}

interface Tab {
    id: string;
    name: string;
    data: Record<string, any> | string;
    exists: boolean;
    currentWidth?: number;
}

export function ProjectListItem({
    name,short_description,description,reflection,skills,date,media_url,source_code,web_link,currentTheme,transitionClasses,changelog,about_header,reflection_header
} : ProjectProps) {
    const [currImgIndex, setCurrImgIndex] = useState(0);
    const [isChangelogOpened, setIsChangeLogOpened] = useState(false);

    // useEffect(() => {
    //     if (!selectedTab?.ref?.current) return;

    //     const updateSliderPosition = () => {
    //         const element = selectedTab.ref.current;
    //         if (element) {
    //             setSelectedTabStyle({
    //                 width: element.clientWidth,
    //                 height: element.clientHeight,
    //                 transform: `translateX(${element.offsetLeft}px)`,
    //             });
    //         }
    //     };

    //     updateSliderPosition();

    //     window.addEventListener("resize", updateSliderPosition);
    //     return () => window.removeEventListener("resize", updateSliderPosition);
    // }, [selectedTab, currentTabs]);

    const [reflectionOpened, setReflectionOpened] = useState(false);

    return (
        <div className={`${currentTheme==="D" ? "bg-stone-800" : "bg-stone-300"} w-full max-w-full min-w-0 rounded-2xl p-5 text-left my-5 ${transitionClasses}`}>
            <header className="grid grid-cols-4 w-full mb-5">
                <div className="col-span-3">
                    <h3 className="m-0">{name}</h3>
                    <h6>{short_description}</h6>
                    <div className="flex gap-x-1">
                        {
                            skills?.map((skill,index)=>{
                                return (
                                    <SkillTab currentTheme={currentTheme} name={skill} icon={(currentTheme==="D") ? projectSkillsTabsDark[skill] :  projectSkillsTabsLight[skill]} key={`skill-${index}`}/>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="col-span-1 text-right italic">
                    <h6>
                        {date && renderDate(date)}
                    </h6>
                </div>
            </header>
            <hr className="border-stone-500"/>
            <main className="lg:flex lg:flex-row-reverse gap-4 my-4">
                {/* can consider list/grid layout toggle */}
                <div className="flex-3 self-start relative group w-full h-full aspect-video border-2 border-stone-500 rounded-2xl overflow-hidden mb-4">
                    {
                        media_url && Array.isArray(media_url) && media_url.length > 0 && (
                            <>
                                <img 
                                    className="w-full aspect-video object-cover" 
                                    src={media_url[currImgIndex]}
                                    alt={name}
                                />
                                {
                                    media_url.length > 1 && (
                                        <div className="absolute inset-0 flex items-center justify-between">
                                            <button onClick={()=>setCurrImgIndex((currImgIndex-1+media_url.length) % media_url.length)} className="pointer-events-auto h-full w-12 bg-black/20 opacity-100 rounded-l-2xl flex items-center justify-center transition-opacity text-xl font-bold">
                                                <ChevronLeft/>
                                            </button>
                                            <div className="flex gap-2 p-2 rounded-full bg-black/50 self-end mb-2 opacity-50 hover:opacity-100 transition-opacity ease-in-out duration-200">
                                                {
                                                    media_url.map((_,idx)=>(
                                                    <button 
                                                        key={`circle-btn-${idx}`} 
                                                        onClick={()=>setCurrImgIndex(idx)} 
                                                        className={`w-3 h-3 hover:scale-125 transition-all rounded-full cursor-pointer ${idx==currImgIndex ? "bg-white" : "bg-white/50 hover:bg-white/75"}`}></button>
                                                    ))
                                                }
                                            </div>
                                            <button onClick={()=>setCurrImgIndex((currImgIndex+1) % media_url.length)} className="pointer-events-auto h-full w-12 bg-black/20 opacity-100 rounded-r-2xl flex items-center justify-center transition-opacity text-xl font-bold">
                                                <ChevronRight/>
                                            </button>
                                        </div>
                                    )
                                }
                            </>
                        )
                    }
                </div>
                <div className="flex-3">
                    {/* BIO */}
                    <div className={`flex-1 ${currentTheme==="D" ? "bg-stone-700" : "bg-stone-400"} h-full rounded-2xl p-4 overflow-y-auto ${transitionClasses}`}>
                        <h5>{about_header}</h5>
                        {description}
                    </div>
                </div>
            </main>
            <footer>
                <div className={`${currentTheme==="D" ? "bg-mauve-700" : "bg-mauve-400"}  rounded-2xl p-4 mb-4 overflow-y-auto ${transitionClasses}`}>
                    <div onClick={()=>setReflectionOpened(!reflectionOpened)} className={`flex justify-between`}>
                        <h5 className="mb-0">{reflection_header}</h5>
                        <ChevronDown className={`transform transition-transform duration-150 ${reflectionOpened ? "rotate-180" : "rotate-0"}`}/>
                    </div>
                    <div className={`transition-all duration-250 ease-in-out overflow-hidden ${reflectionOpened ? "max-h-10000 opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}>
                        <hr className={`my-2 border-stone-400`}/>
                        {reflection}
                    </div>
                </div>
                {
                    changelog && (
                        <div className={`transition-all duration-250 ease-in-out rounded-2xl p-4 ${currentTheme==="D" ? "bg-stone-700" : "bg-stone-400"} mt-4`}>
                            <div onClick={()=>setIsChangeLogOpened(!isChangelogOpened)} className="flex justify-between items-center">
                                <h5 className="mb-0">Changelog:</h5> <ChevronDown 
                                    className={`transform transition-transform ${isChangelogOpened ? "rotate-180" : "rotate-0"} relative`} 
                                />
                            </div>
                            <div className={`transition-all duration-250 ease-in-out overflow-hidden ${isChangelogOpened ? "max-h-256 opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}>
                                <hr className="mt-2 mb-4 border-stone-400"/>
                                {
                                    changelog.map((item,index)=>{
                                        const {header, date, desc} = item;
                                        return (
                                            <div className="flex" key={`changelog-${index}`}>
                                                <div className="flex-1 mr-2 flex flex-col items-center">
                                                    <div className={`w-3 h-3 rounded-full ${currentTheme==="D" ? "bg-stone-300" : "bg-stone-800"}`}></div>
                                                    <div className={`w-1 h-full rounded-full ${currentTheme==="D" ? "bg-stone-300" : "bg-stone-800"}`}></div>
                                                </div>
                                                <div className="flex-11 mb-4 -translate-y-1">
                                                    <h6>{header}<span className="ml-4 text-sm font-normal italic opacity-50">{renderDate(date)}</span></h6>
                                                    <ul className="list-disc ml-5 text-sm">
                                                    {
                                                        desc.map((descItem: string, index: number)=>{
                                                            return <li key={`desc-${index}`}>{descItem}</li>
                                                        })
                                                    }
                                                    </ul>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                }
                <hr className={`my-4 border ${currentTheme==="D" ? "border-stone-500" : "border-stone-600"}`}/>
                <div className={`h-12 flex gap-4 shrink-0 ${transitionClasses}`}>
                    {
                        source_code && (
                            <a className={`w-full flex justify-center items-center gap-2 ${currentTheme==="D" ? "bg-stone-600" : "bg-stone-400"} p-2 rounded-2xl text-center font-bold text-lg`} href={source_code}><Code/> Source Code</a>
                        )
                    }
                    {
                        web_link && (
                            <a className={`w-full flex justify-center items-center gap-2 ${currentTheme==="D" ? "bg-stone-600" : "bg-stone-400"} p-2 rounded-2xl text-center font-bold text-lg`} href={web_link}><CgWebsite/> Web Link</a>
                        )
                    }
                </div>
            </footer>
        </div>
    )
}

export function ProjectGridItem({
    name,short_description,description,reflection,skills,date,media_url,source_code,web_link,currentTheme,transitionClasses,changelog,about_header,reflection_header
} : ProjectProps) {

    const [currImgIndex, setCurrImgIndex] = useState(0);
    const [isChangelogOpened, setIsChangeLogOpened] = useState(false);
    const [reflectionOpened, setReflectionOpened] = useState(false);


    return (
        <div className={`flex flex-col rounded-2xl border border-stone-400/30 ${currentTheme==="D" ? "bg-stone-800" : "bg-stone-400"} ${transitionClasses}`}>
            <div className="relative group w-full aspect-video rounded-t-2xl overflow-hidden">
                {
                    media_url && Array.isArray(media_url) && media_url.length > 0 && (
                        <>
                            <img 
                                className="w-full aspect-video object-cover" 
                                src={media_url[currImgIndex]}
                                alt={name}
                            />
                            {
                                media_url.length > 1 && (
                                    <div className="absolute inset-0 flex items-center justify-between">
                                        <button onClick={()=>setCurrImgIndex((currImgIndex-1+media_url.length) % media_url.length)} className="pointer-events-auto h-full w-12 bg-black/20 opacity-100 flex items-center justify-center transition-opacity text-xl font-bold">
                                            <ChevronLeft/>
                                        </button>
                                        <div className="flex gap-2 p-2 rounded-full bg-black/50 self-end mb-2 opacity-50 hover:opacity-100 transition-opacity ease-in-out duration-200">
                                            {
                                                media_url.map((_,idx)=>(
                                                <button 
                                                    key={`circle-btn-${idx}`} 
                                                    onClick={()=>setCurrImgIndex(idx)} 
                                                    className={`w-3 h-3 hover:scale-125 transition-all rounded-full cursor-pointer ${idx==currImgIndex ? "bg-white" : "bg-white/50 hover:bg-white/75"}`}></button>
                                                ))
                                            }
                                        </div>
                                        <button onClick={()=>setCurrImgIndex((currImgIndex+1) % media_url.length)} className="pointer-events-auto h-full w-12 bg-black/20 opacity-100 flex items-center justify-center transition-opacity text-xl font-bold">
                                            <ChevronRight/>
                                        </button>
                                    </div>
                                )
                            }
                        </>
                    )
                }
                {/* <div className="absolute inset-0 flex items-center justify-between pointer-events-none">
                    <button className="pointer-events-auto h-full w-12 bg-black/80 opacity-0 hover:opacity-100 rounded-l-2xl flex items-center justify-center transition-opacity text-xl font-bold">
                        &lt;
                    </button>
                    <button className="pointer-events-auto h-full w-12 bg-black/80 opacity-0 hover:opacity-100 rounded-r-2xl flex items-center justify-center transition-opacity text-xl font-bold">
                        &gt;
                    </button>
                </div> */}
            </div>
            <div className={`rounded-b-2xl ${currentTheme==="D" ? "bg-stone-900" : "bg-stone-200"} p-4`}> 
                <div className="w-full text-left italic">
                    <h6 className="mb-0 font-light opacity-80">
                        {date && renderDate(date)}
                    </h6>
                </div>
                <div className="w-full">
                    <h3 className="m-0">{name}</h3>
                    <h6>{short_description}</h6>
                    <div className="flex gap-x-1 mb-2">
                        {
                            skills?.map((skill,index)=>{
                                return (
                                    <SkillTab currentTheme={currentTheme} name={skill} icon={(currentTheme==="D") ? projectSkillsTabsDark[skill] :  projectSkillsTabsLight[skill]} key={`skill-${index}`}/>
                                )
                            })
                        }
                    </div>
                </div>
                <hr className={`my-4 border-stone-400`}/>
                {/* MAIN CONTENT */}
                <div className="mb-4">
                    {/* BIO */}
                    <div className={`flex-1 ${currentTheme==="D" ? "bg-stone-800" : "bg-stone-300"} h-full mb-4 rounded-2xl p-4 overflow-y-auto ${transitionClasses}`}>
                        <h5>{about_header}</h5>
                        {description}
                    </div>
                    {/* REFLECTION */}
                    <div className={`${currentTheme==="D" ? "bg-mauve-800" : "bg-mauve-300"}  rounded-2xl p-4 mb-4 overflow-y-auto ${transitionClasses}`}>
                        <div onClick={()=>setReflectionOpened(!reflectionOpened)} className={`flex justify-between items-center`}>
                            <h5 className="mb-0">{reflection_header}</h5>
                            <ChevronDown className={`transform transition-transform duration-150 ${reflectionOpened ? "rotate-180" : "rotate-0"}`}/>
                        </div>
                        <div className={`transition-all duration-250 ease-in-out overflow-hidden ${reflectionOpened ? "max-h-10000 opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}>
                            <hr className={`my-2 border-stone-500`}/>
                            {reflection}
                        </div>
                    </div>
                    {/* CHANGELOG */}
                    {
                        changelog && (
                            <div className={`transition-all duration-250 ease-in-out rounded-2xl p-4 ${currentTheme==="D" ? "bg-stone-800" : "bg-stone-300"} mt-4`}>
                                <div onClick={()=>setIsChangeLogOpened(!isChangelogOpened)} className="flex justify-between items-center">
                                    <h5 className="mb-0">Changelog:</h5> <ChevronDown 
                                        className={`transform transition-transform ${isChangelogOpened ? "rotate-180" : "rotate-0"} relative`} 
                                    />
                                </div>
                                <div className={`transition-all duration-250 ease-in-out overflow-hidden ${isChangelogOpened ? "max-h-256 opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}>
                                    <hr className="mt-2 mb-4 border-stone-400"/>
                                    {
                                        changelog.map((item,index)=>{
                                            const {header, date, desc} = item;
                                            return (
                                                <div className="flex" key={`changelog-${index}`}>
                                                    <div className="flex-1 mr-2 flex flex-col items-center">
                                                        <div className={`w-3 h-3 rounded-full ${currentTheme==="D" ? "bg-stone-300" : "bg-stone-800"}`}></div>
                                                        <div className={`w-1 h-full rounded-full ${currentTheme==="D" ? "bg-stone-300" : "bg-stone-800"}`}></div>
                                                    </div>
                                                    <div className="flex-11 mb-4 -translate-y-1">
                                                        <h6>{header}<span className="ml-4 text-sm font-normal italic opacity-50">{renderDate(date)}</span></h6>
                                                        <ul className="list-disc ml-5 text-sm">
                                                        {
                                                            desc.map((descItem: string, index: number)=>{
                                                                return <li key={`desc-${index}`}>{descItem}</li>
                                                            })
                                                        }
                                                        </ul>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className="h-12 flex gap-4 shrink-0">
                    {
                        source_code && (
                            <a className={`w-full flex justify-center items-center gap-2 ${currentTheme==="D" ? "bg-stone-700" : "bg-stone-400"} p-2 rounded-2xl text-center font-bold text-md`} href={source_code}><Code/> Source Code</a>
                        )
                    }
                    {
                        web_link && (
                            <a className={`w-full flex justify-center items-center gap-2 ${currentTheme==="D" ? "bg-stone-700" : "bg-stone-400"} p-2 rounded-2xl text-center font-bold text-md`} href={web_link}><CgWebsite/> Web Link</a>
                        )
                    }
                </div>
            </div>
        </div>
    )
}