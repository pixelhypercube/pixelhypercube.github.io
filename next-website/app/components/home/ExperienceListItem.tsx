import { projectSkillsTabsDark, projectSkillsTabsLight } from "@/app/globals";
import Canvas3D from "../Canvas3D";
import { ProjectSkillTab } from "./ProjectSkillTab";
import { renderDate } from "./utils";

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
}

export function ExperienceListItem({
    company,role,description,dates,currentTheme,skills,transitionClasses,jsonModel,isModelVisible
} : ExperienceProps) {

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
                {/* can consider list/grid layout toggle */}
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
            </main>
        </div>
    )
}