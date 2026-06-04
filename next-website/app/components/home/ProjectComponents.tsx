import { useState } from "react";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Code } from "lucide-react";
import { CgWebsite } from "react-icons/cg";
import { renderDate } from "./utils";
import { ProjectSkillTab } from "./ProjectSkillTab";
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
    
    // headers
    about_header?: string,
    reflection_header?: string,
}

export function ProjectListItem({
    name,short_description,description,reflection,skills,date,media_url,source_code,web_link,currentTheme,transitionClasses,about_header,reflection_header
} : ProjectProps) {
    const [currImgIndex, setCurrImgIndex] = useState(0);

    return (
        <div className={`${currentTheme==="D" ? "bg-stone-800" : "bg-stone-300"} rounded-2xl p-5 text-left my-5 ${transitionClasses}`}>
            <header className="flex w-full mb-5">
                <div className="w-full">
                    <h3 className="m-0">{name}</h3>
                    <h6>{short_description}</h6>
                    <div className="flex gap-x-1">
                        {
                            skills?.map((skill,index)=>{
                                return (
                                    <ProjectSkillTab currentTheme={currentTheme} name={skill} icon={(currentTheme==="D") ? projectSkillsTabsDark[skill] :  projectSkillsTabsLight[skill]} key={`skill-${index}`}/>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="w-full text-right italic">
                    <h6>
                        {date && renderDate(date)}
                    </h6>
                </div>
            </header>
            <hr className="border-stone-500"/>
            <main className="md:flex justify-stretch mt-4 gap-4">
                {/* can consider list/grid layout toggle */}
                <div className="w-full mb-4 md:mb-0 md:w-3/5 flex flex-col">
                    <div className="lg:flex gap-4">
                        <div className={`flex-1 ${currentTheme==="D" ? "bg-stone-700" : "bg-stone-400"}  rounded-2xl p-4 mb-4 overflow-y-auto ${transitionClasses}`}>
                            <h5>{about_header}</h5>
                            {description}
                        </div>
                        <div className={`flex-1 ${currentTheme==="D" ? "bg-mauve-700" : "bg-mauve-400"}  rounded-2xl p-4 mb-4 overflow-y-auto ${transitionClasses}`}>
                            <h5>{reflection_header}</h5>
                            {reflection}
                        </div>
                    </div>
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
                </div>
                <div className="w-full md:w-2/5 flex flex-col justify-between">
                    <div className="relative group w-full aspect-video border border-stone-500 rounded-2xl overflow-hidden">
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
                                                <button onClick={()=>setCurrImgIndex((currImgIndex-1+media_url.length) % media_url.length)} className="pointer-events-auto h-full w-12 bg-black/80 opacity-0 hover:opacity-100 rounded-l-2xl flex items-center justify-center transition-opacity text-xl font-bold">
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
                                                <button onClick={()=>setCurrImgIndex((currImgIndex+1) % media_url.length)} className="pointer-events-auto h-full w-12 bg-black/80 opacity-0 hover:opacity-100 rounded-r-2xl flex items-center justify-center transition-opacity text-xl font-bold">
                                                    <ChevronRight/>
                                                </button>
                                            </div>
                                        )
                                    }
                                </>
                            )
                        }
                    </div>
                </div>
            </main>
        </div>
    )
}

export function ProjectGridItem({
    name,short_description,description,skills,date,media_url,source_code,web_link,currentTheme
} : ProjectProps) {

    return (
        <div className={`flex flex-col`}>
            <div className="relative group w-full aspect-video rounded-t-2xl overflow-hidden">
                {
                    media_url && Array.isArray(media_url) && media_url.length > 0 && (
                        <img 
                        className="w-full aspect-video object-cover rounded-t-2xl" 
                        src={media_url[0]}
                        alt={name}
                        />
                    )
                }
                <div className="absolute inset-0 flex items-center justify-between pointer-events-none">
                    <button className="pointer-events-auto h-full w-12 bg-black/80 opacity-0 hover:opacity-100 rounded-l-2xl flex items-center justify-center transition-opacity text-xl font-bold">
                        &lt;
                    </button>
                    <button className="pointer-events-auto h-full w-12 bg-black/80 opacity-0 hover:opacity-100 rounded-r-2xl flex items-center justify-center transition-opacity text-xl font-bold">
                        &gt;
                    </button>
                </div>
            </div>
            <div className={`rounded-b-2xl ${currentTheme==="D" ? "bg-stone-700" : "bg-stone-300"} p-4`}> 
                <div className="w-full">
                    <h3 className="m-0">{name}</h3>
                    {/* <h6>{short_description}</h6> */}
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
                <div className="w-full text-left italic">
                    <h6>
                        {date && renderDate(date)}
                    </h6>
                </div>
                <hr/>
                <div className="my-2">
                    {short_description}
                </div>
                <div className="h-12 flex gap-4 shrink-0">
                    {
                        source_code && (
                            <a className={`w-full flex justify-center items-center gap-2 ${currentTheme==="D" ? "bg-stone-500" : "bg-stone-400"} p-2 rounded-2xl text-center font-bold text-md`} href={source_code}><Code/> Source Code</a>
                        )
                    }
                    {
                        web_link && (
                            <a className={`w-full flex justify-center items-center gap-2 ${currentTheme==="D" ? "bg-stone-500" : "bg-stone-400"} p-2 rounded-2xl text-center font-bold text-md`} href={web_link}><CgWebsite/> Web Link</a>
                        )
                    }
                </div>
            </div>
        </div>
    )
}