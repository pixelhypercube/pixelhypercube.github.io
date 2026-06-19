import { useState } from "react";
import { Grid, List } from "lucide-react";
import CustomToggle from "../CustomToggle";
import Canvas3D from "../Canvas3D";
import { renderDate } from "./utils";

interface EducationProps {
    institution: string;
    certificate: string;
    relevant_coursework?: Record<string, any>;
    relevant_coursework_header: string;
    activities?: Record<string, any>;
    activities_header: string;
    awards?: Record<string, any>;
    awards_header: string;
    bio?: Array<string>;
    dates: Array<Array<any>>;
    media_url?: string;
    currentTheme: string;
    transitionClasses?: string;
}

export function EducationListItem({
    institution,
    certificate,
    relevant_coursework,
    relevant_coursework_header,
    activities,
    activities_header,
    awards,
    awards_header,
    bio,
    dates,
    media_url,
    currentTheme,
    transitionClasses
} : EducationProps) {

    const [selectedRelCWIndex, setSelectedRelCWIndex] = useState(0);
    const [selectedActivitiesIndex, setSelectedActivitiesIndex] = useState(0);

    return (
        <div className={`${currentTheme==="D" ? "bg-stone-800 text-white" : "bg-stone-300 text-stone-900"} rounded-2xl p-5 text-left my-5 ${transitionClasses}`}>
            <header className="flex w-full mb-5">
                <div className="w-full">
                    <h3 className="m-0">{institution}</h3>
                    <h5 className="m-0">{certificate}</h5>
                </div>
                <div className="w-full text-right italic">
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
            <hr className={currentTheme==="D" ? "border-stone-700" : "border-stone-400"}/>
            <main className="my-4">
                {/* BIO */}
                {bio && bio.length>0 && (
                    <div className={`${currentTheme==="D" ? "bg-stone-700 text-stone-100" : "bg-stone-400 text-stone-950"} rounded-xl p-3 w-full mb-3 ${transitionClasses}`}>
                        <ul className="list-disc ml-5 mr-5">{
                            bio?.map((item: any, index: number)=>(
                                <li key={`bio-${index}`}>{item}</li>
                            ))
                        }</ul>
                    </div>
                )}
                <hr className={`${currentTheme==="D" ? "border-stone-700" : "border-stone-400"} mb-4`}/>
                {
                    (activities || relevant_coursework || awards) && (
                        <div className="flex flex-col gap-4">
                            {/* RELEVANT COURSEWORK */}
                            {
                                relevant_coursework && (
                                    // ${currentTheme==="D" ? 
                                    // "bg-stone-700 text-stone-100" : 
                                    // "bg-stone-400 text-stone-950"} 
                                    <div className={`
                                    rounded-xl w-full ${transitionClasses}`}>
                                        <div className={`flex w-full justify-between ${transitionClasses}`}>
                                            <div>
                                                <h4>{relevant_coursework_header}</h4>
                                            </div>
                                            <div className="flex justify-end h-fit text-inherit">
                                                <CustomToggle transitionClasses={transitionClasses} currentTheme={currentTheme} selectedIndex={selectedRelCWIndex} changeIndex={(index: number)=>setSelectedRelCWIndex(index)} values={[<List size={18}/>, <Grid size={18}/>]} />
                                            </div>
                                        </div>
                                        <div className={`${selectedRelCWIndex === 0 ? "flex flex-wrap gap-2" : "grid md:grid-cols-3 sm:grid-cols-2 gap-3"} ${transitionClasses}`}>
                                            {
                                                Object.keys(relevant_coursework).map((moduleCode : string, index : number)=>{
                                                    if (selectedRelCWIndex===0) {
                                                        return <div key={`mod-${index}`} className={`${currentTheme==="D" ? "bg-mauve-700 text-white" : "bg-mauve-400 text-stone-900"} rounded-2xl p-2  ${transitionClasses}`}>
                                                            <p className="text-sm">{moduleCode} : {relevant_coursework[moduleCode]["name"]}</p>
                                                        </div>
                                                    } else if (selectedRelCWIndex===1) {
                                                        return <div key={`mod-${index}`} className={`${currentTheme==="D" ? "bg-mauve-700 text-white" : "bg-mauve-400 text-stone-900"} rounded-2xl p-2 flex flex-col  ${transitionClasses}`}>
                                                            <div className="w-full h-24">
                                                                <Canvas3D voxelJson={relevant_coursework[moduleCode]["jsonModel"]} />
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
                            {/* ACTIVITIES & SOCIETIES */}
                            {
                                activities && (
                                    // ${currentTheme==="D" ? 
                                    // "bg-stone-700 text-stone-100" : 
                                    // "bg-stone-400 text-stone-950"}
                                    <div className={`
                                    rounded-xl w-full ${transitionClasses}`}>
                                        <div className={`flex justify-between ${transitionClasses}`}>
                                            <div>
                                                <h4>{activities_header}</h4>
                                            </div>
                                            <div className="flex justify-end h-fit text-inherit">
                                                <CustomToggle transitionClasses={transitionClasses} currentTheme={currentTheme} selectedIndex={selectedActivitiesIndex} changeIndex={(index: number)=>setSelectedActivitiesIndex(index)} values={[<Grid size={18}/>, <List size={18}/>]} />
                                            </div>
                                        </div>
                                        <div className={`flex flex-col ${transitionClasses}`}>
                                            <div className={`gap-4 ${selectedActivitiesIndex === 0 ? "grid md:grid-cols-2 sm:grid-cols-1" : "flex flex-col"}`}>
                                            {
                                                activities.map((activity: Record<string, any>, index: number)=>{
                                                    const {name, dates, bio} = activity;
                                                    
                                                    if (selectedActivitiesIndex === 0) {
                                                        return (
                                                            <div key={`activities-${index}`} 
                                                            className={`${currentTheme==="D" ? "bg-stone-700 text-stone-100" : "bg-stone-400 text-stone-950"} rounded-2xl p-2 ${transitionClasses}`}>
                                                                <div className="w-full h-36">
                                                                    <Canvas3D voxelJson={activity["jsonModel"]} />
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
                                                                        <Canvas3D voxelJson={activity["jsonModel"]} />
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
                            {/* AWARDS */}
                            {
                                awards && (
                                    // ${currentTheme==="D" ? "bg-stone-700 text-stone-100" : "bg-stone-400 text-stone-950"}
                                    <div className={`rounded-xl w-full flex flex-col gap-2 ${transitionClasses}`}>
                                        <h4 className="my-0">{awards_header} 🎖️</h4>
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
                    )
                }
            </main>
        </div>
    )
}