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

    jsonModel?:Record<string, any>;
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
    transitionClasses,
    jsonModel
} : EducationProps) {

    const [selectedRelCWIndex, setSelectedRelCWIndex] = useState(0);
    const [selectedActivitiesIndex, setSelectedActivitiesIndex] = useState(0);

    return (
        <div className={`${currentTheme==="D" ? "bg-stone-800 text-white" : "bg-stone-300 text-stone-900"} rounded-2xl p-5 text-left my-5 ${transitionClasses} gap-4`}>
            <div className="w-full">
                <header className="flex w-full gap-4">
                    <div className={`w-32 ${currentTheme==="D" ? "bg-stone-700 text-white" : "bg-stone-400 text-stone-900"} rounded-xl`}>
                        {jsonModel && <Canvas3D voxelJson={jsonModel}/>}
                    </div>
                    <div className="w-full">
                        <h3 className="m-0">{institution}</h3>
                        <h5 className="m-0 font-normal">{certificate}</h5>
                    </div>
                    <div className="min-w-48 text-right italic">
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
                {/* <hr className={currentTheme==="D" ? "border-stone-700" : "border-stone-400"}/>
                <main className="my-4">
                    {bio && bio.length>0 && (
                        <div className={`${currentTheme==="D" ? "bg-stone-700 text-stone-100" : "bg-stone-400 text-stone-950"} rounded-xl p-3 w-full mb-3 ${transitionClasses}`}>
                            <ul className="list-disc ml-5 mr-5">{
                                bio?.map((item: any, index: number)=>(
                                    <li key={`bio-${index}`}>{item}</li>
                                ))
                            }</ul>
                        </div>
                    )}
                </main> */}
            </div>
        </div>
    )
}