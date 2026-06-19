"use client"
import { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import { content, projectSkillsTabsDark, projectSkillsTabsLight, skills } from "./globals";
import Chatbot from "./components/Chatbot/Chatbot";
import Canvas3D from "./components/Canvas3D";

// JSON 3D Models
import computer from "./voxelModels/computer.json"
import kj from "./voxelModels/kj.json"
import bouldering from "./voxelModels/bouldering.json"
import gymming from "./voxelModels/gymming.json"
import gaming from "./voxelModels/gaming.json"
import running from "./voxelModels/running.json"
import speedcubing from "./voxelModels/speedcubing.json"

import linkedin_dark from "./voxelModels/links/dark/linkedin.json"
import github_dark from "./voxelModels/links/dark/github.json"
import email_dark from "./voxelModels/links/dark/email.json"
import linkedin_light from "./voxelModels/links/light/linkedin.json"
import github_light from "./voxelModels/links/light/github.json"
import email_light from "./voxelModels/links/light/email.json"

// additional json
// import { ntu_coursework } from "./globals";

import { addEffect, Canvas } from "@react-three/fiber";
import { View, Preload } from "@react-three/drei";
import Lenis from "lenis";
import { Atom, CircleEllipsis, Code, Grid, List, Road } from "lucide-react";
import CustomToggle from "./components/CustomToggle";
import { CgWebsite } from "react-icons/cg";
import { useLanguage } from "./components/LanguageContext";


// NEW IMPORTS

import { renderDate } from "./components/home/utils";
import { HobbyButton, RunningPBDiv } from "./components/home/HobbyComponents";
// import { ProjectSkillTab } from "./components/home/ProjectSkillTab";
import { SkillContainer } from "./components/home/SkillContainer";
import { ExperienceListItem } from "./components/home/ExperienceListItem";
import { ProjectGridItem, ProjectListItem } from "./components/home/ProjectComponents";
import { EducationListItem } from "./components/home/EducationListItem";

// function ExperienceRoadmapPoint({
//     institution,
//     certificate,
//     relevant_coursework,
//     relevant_coursework_header,
//     activities,
//     activities_header,
//     bio,
//     dates,
//     media_url,
//     currentTheme
// } : ExperienceProps) {

//     return (
//         <div className={`${currentTheme==="D" ? "bg-stone-800 text-white" : "bg-stone-200 text-stone-900"} w-40 h-20 rounded-full`}>
//             {
//                 dates && dates.map((dateArr,_)=>{
//                     const [startDate, endDate] = dateArr;
//                     return renderDate(startDate) + " - " + (endDate instanceof Date ? renderDate(endDate) : endDate);
//                 }).join(", ")
//             }
//             {institution}
//         </div>
//     )
// }

// interface ExperienceRoadmapProps {
//     list:[]
// }

// function ExperienceRoadmap({list} : ExperienceRoadmapProps) {

//     return (
//         <>
//             {list && list.map((item: any, index: number)=>{
                
//             })}
//         </>
//     )
// }


export default function Home() {
    const lenis = new Lenis({syncTouch:true});

    addEffect((t)=>lenis.raf(t));

    // STATES
    const {selectedLanguage, setSelectedLanguage} = useLanguage();
    const [selectedHobby, setSelectedHobby] = useState<any>(running);
    // const [scrollY, setScrollY] = useState(0);
    // const [isChatbotOpen, setChatbotOpen] = useState(false);

    const [currentTheme, setCurrentTheme] = useState("D");

    const [projectsToggleIndex, setProjectsToggleIndex] = useState(0);
    // const [experienceToggleIndex, setExperienceToggleIndex] = useState(0);
    // const [educationToggleIndex, setEducationToggleIndex] = useState(0);

    // REFS
    const containerRef = useRef<HTMLDivElement>(null);
    const containerHeroRef = useRef<HTMLDivElement>(null);
    const containerAboutMeRef = useRef<HTMLDivElement>(null);
    const containerSkillsRef = useRef<HTMLDivElement>(null);
    const containerProjectsRef = useRef<HTMLDivElement>(null);
    const containerExperienceRef = useRef<HTMLDivElement>(null);
    const containerEducationRef = useRef<HTMLDivElement>(null);

    const navbarRef = useRef<HTMLDivElement>(null);

    var currContent = content[selectedLanguage];
    const {home} = currContent;

    var headerContent = home["header"];
    var aboutMeContent = home["about_me"];
    var skillsInfo = home["skills"];
    var experienceContent = home["experience"];
    var projectsContent = home["projects"];
    var educationContent = home["education"];

    var ntuCoursework = home["ntu_coursework"];

    var footerContent = home["footer"];
    var formContent = footerContent["form"];

    const {hobbies} = aboutMeContent;

    // for smooth transition between light and dark
    const transitionClasses = `transition-color ease-in-out duration-500`;

    // placeholder input styles

    const inputTheme = "border rounded-2xl m-1 p-2 w-full transition-colors duration-200 outline-none focus:ring-2 focus:ring-stone-500"
    const darkInputTheme = `bg-stone-700 border-stone-700 text-white placeholder-stone-400 ${inputTheme} ${transitionClasses}`;
    const lightInputTheme = `bg-white border-stone-300 text-stone-900 placeholder-stone-500 ${inputTheme} ${transitionClasses}`;

    const submitTheme = "w-full px-6 py-2 rounded-2xl font-bold text-lg cursor-pointer transition-colors duration-200"
    const darkSubmitTheme = `bg-stone-700 hover:bg-stone-600 text-white ${submitTheme} ${transitionClasses}`;
    const lightSubmitTheme = `bg-stone-300 hover:bg-stone-500 text-stone-900 ${submitTheme} ${transitionClasses}`;

    // FORM HANDLER

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [status, setStatus] = useState("idle"); // idle, submitting, success, error

    interface FormData {
        name: string;
        email: string;
        message: string;
    }

    interface HandleChangeEvent extends React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> {}

    const handleChange = (e: HandleChangeEvent) => {
        const { name, value } = e.target;
        setFormData((prev: FormData) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("submitting");

        try {
            // replace url with your actual API endpoint or email service provider URL
            const response = await fetch("https://api.example.com/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", message: "" }); // reset form
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };
    
    // determine current div pos

    const [currentDiv, setCurrentDiv] = useState("");

    useEffect(()=>{
        const onScroll = () => {

            // NAVBAR HEIGHT
            const navbarHeight = navbarRef.current?.clientHeight;
            
            const divs: Record<string, DOMRect | undefined> = {
                "hero":containerHeroRef.current?.getBoundingClientRect(),
                "about_me":containerAboutMeRef.current?.getBoundingClientRect(),
                "skills":containerSkillsRef.current?.getBoundingClientRect(),
                "projects":containerProjectsRef.current?.getBoundingClientRect(),
                "experience":containerExperienceRef.current?.getBoundingClientRect(),
                "education":containerEducationRef.current?.getBoundingClientRect(),
            }

            for (const key of Object.keys(divs)) {
                if (!navbarHeight) continue;

                const div = divs[key];
                if (!div) continue;

                // SKILLS CONTAINER
                const {top,height} = div;
                if (!top) continue;
                if (!height) continue;
                

                // console.log(key,top,height,top<=0 && top+height>=0)
                if (top-navbarHeight-50<=0 && top+height-navbarHeight-50>=0) {
                    setCurrentDiv(key);
                }
            }
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [currentDiv]);

    return (
        <div ref={containerRef} className={`relative w-full min-h-screen 
        ${currentTheme==="D" ? 
        "bg-stone-900 text-white" : 
        "bg-stone-200 text-stone-900"} ${transitionClasses}`}>
            <Chatbot 
                    // isOpen={false}
                    currentTheme={currentTheme}
                    selectedLanguage={selectedLanguage}
                    transitionClasses={transitionClasses}
                />
            <Navbar
                callbacks={{
                    setScrollPosHome: () => containerRef.current?.scrollIntoView({ behavior: "smooth" }),
                    setScrollPosAboutMe: () => containerAboutMeRef.current?.scrollIntoView({ behavior: "smooth" }),
                    setScrollPosSkills: () => containerSkillsRef.current?.scrollIntoView({ behavior: "smooth" }),
                    setScrollPosProjects: () => containerProjectsRef.current?.scrollIntoView({ behavior: "smooth" }),
                    setScrollPosExperience: () => containerExperienceRef.current?.scrollIntoView({ behavior: "smooth" }),
                    setScrollPosEducation: () => containerEducationRef.current?.scrollIntoView({ behavior: "smooth" }),
                    onThemeToggle:(newTheme: string) => setCurrentTheme(newTheme),
                    onLanguageChange:(newLanguage: string) => setSelectedLanguage(newLanguage)
                }}
                selectedLanguage={selectedLanguage}
                currentTheme={currentTheme}
                transitionClasses={transitionClasses}
                currentPos={currentDiv}
                ref={navbarRef}
            />
            {/* MAIN CONTENT */}
            <div className="relative z-10">
                <div className="flex-col align-middle text-left">
                    <header ref={containerHeroRef} className="lg:flex text-center mt-54">
                        <div className="w-full my-12 self-center">
                            <h3>{headerContent["top"]}</h3>
                            <h1 className="text-8xl">{headerContent["name"]}</h1>
                            <h4>{headerContent["bottom"]}</h4>
                        </div>
                        <div className="w-full my-12 flex justify-center items-center">
                            {/* 3d computer model */}
                            <Canvas3D voxelJson={computer} className="h-126 lg:w-full sm:w-1/2 justify-self-center z-11"/>
                        </div>
                    </header>
                    <main className="lg:w-4/5 xl:w-3/5 mx-8 justify-self-center">
                        {/* ABOUT ME */}
                        <div ref={containerAboutMeRef} className="flex flex-col mb-64">
                            {/* <div ref={containerAboutMeRef} className="flex flex-col mb-64">
                                <div className="flex flex-col lg:flex-row p-5 gap-5 lg:h-96">
                                    <div className="w-full lg:w-1/2 h-64 lg:h-auto shrink-0">
                                        <Canvas3D voxelJson={kj}/>
                                    </div>
                                    <div className={`${currentTheme==="D" ? "bg-stone-800" : "bg-stone-300"} w-full lg:w-1/2 rounded-4xl p-5 flex items-center ${transitionClasses}`}>
                                        <div>
                                            <p className="text-xl font-light mb-4">{aboutMeContent["bio"]}</p>
                                            <p className="text-md font-light italic">{aboutMeContent["bio2"]}</p>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <div className="flex flex-col p-5 gap-12 h-full items-center">
                                {/* 3d voxel about me */}
                                <div className="w-full h-64 shrink-0">
                                    <Canvas3D voxelJson={kj}/>
                                </div>
                                <div className={`${currentTheme==="D" ? "bg-stone-800" : "bg-stone-300"} w-full rounded-4xl p-5 flex items-center ${transitionClasses}`}>
                                    <div>
                                        {
                                            aboutMeContent["bio"] && aboutMeContent["bio"]
                                            .split('\n\n')
                                            .map((sentence: string,index: number)=>{
                                                return <p className="text-xl font-light mb-4" key={`desc-${index}`}>{sentence}</p>
                                            })
                                        }
                                        {/* <p className="text-xl font-light mb-4">
                                            {
                                                aboutMeContent["bio"] && aboutMeContent["bio"]
                                                .split('\n\n')
                                                .map((sentence: string,index: number)=>{
                                                    return <p className="my-4" key={`desc-${index}`}>{sentence}</p>
                                                })
                                            }
                                        </p> */}
                                        <p className="text-md font-light italic">{aboutMeContent["bio2"]}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* SKILLS */}
                        <div ref={containerSkillsRef} className="my-5">
                            <h1>{skillsInfo["header"]}</h1>
                            {/* TODO: make the display more flexible like auto generate categories or something like that */}
                            {
                                Object.keys(skills).map((skill:string,idx:number)=>{
                                    return (
                                        <div key={`skill-cat-${idx}`}>
                                            <h4 className="text-left">{skillsInfo[`${skill}_header`]}</h4>
                                            <div className="flex flex-wrap gap-4 mb-5">
                                                {
                                                    skills[skill].map((s: any, index: number)=>{
                                                        const {name, dict_obj, skill_proficiency, jsonModelDark, jsonModelLight} = s;

                                                        const proficiency = 
                                                        dict_obj==="lang" ? 
                                                        skillsInfo["language_proficiencies"][skill_proficiency] : 
                                                        dict_obj==="none" ?
                                                        skill_proficiency :
                                                        skillsInfo["skill_proficiencies"][skill_proficiency]
                                                        
                                                        return (
                                                            <SkillContainer
                                                                key={`skill-${index}`}
                                                                transitionClasses={transitionClasses}
                                                                currentTheme={currentTheme}
                                                                name={name}
                                                                proficiency={proficiency}
                                                                jsonModelDark={jsonModelDark}
                                                                jsonModelLight={jsonModelLight}
                                                            />
                                                        )
                                                    })
                                                }
                                                
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        {/* PROJECTS */}
                        <div ref={containerProjectsRef} className="my-48">
                            <div className="flex items-center">
                                <div className="w-full">
                                    <h1 className="m-0">{projectsContent["header"]}</h1>
                                </div>
                                <CustomToggle transitionClasses={transitionClasses} currentTheme={currentTheme} changeIndex={(index: number)=>setProjectsToggleIndex(index)} className="w-full justify-end" values={[<List/>, <Grid/>, <Road/>]} selectedIndex={projectsToggleIndex}/>
                            </div>
                            <div className={projectsToggleIndex==1 ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : ""}>
                                {
                                    projectsContent["projects"].map((proj: any, index: number)=>{
                                        const {name, short_description, description, reflection, skillsList, date, media_url, source_code, web_link, changelog} = proj;

                                        switch (projectsToggleIndex) {
                                            case 0:
                                                return <ProjectListItem
                                                    key={`proj-${index}`}
                                                    reflection={reflection}
                                                    transitionClasses={transitionClasses}
                                                    currentTheme={currentTheme}
                                                    name={name}
                                                    short_description={short_description}
                                                    description={description}
                                                    skills={skillsList}
                                                    date={date}
                                                    media_url={media_url}
                                                    source_code={source_code}
                                                    web_link={web_link}
                                                    about_header={projectsContent["about_header"]}
                                                    reflection_header={projectsContent["reflection_header"]}
                                                    changelog={changelog}
                                                />;
                                            case 1:
                                                return <ProjectGridItem
                                                    key={`proj-${index}`}
                                                    reflection={reflection}
                                                    transitionClasses={transitionClasses}
                                                    currentTheme={currentTheme}
                                                    name={name}
                                                    short_description={short_description}
                                                    description={description}
                                                    skills={skillsList}
                                                    date={date}
                                                    media_url={media_url}
                                                    source_code={source_code}
                                                    web_link={web_link}
                                                />;
                                        }
                                    })
                                }
                            </div>
                        </div>
                        
                        {/* EXPERIENCE */}
                        <div ref={containerExperienceRef} className="my-48">
                            <div className="flex items-center">
                                <div className="w-full">
                                    <h1 className="m-0">{experienceContent["header"]}</h1>
                                </div>
                                {/* <CustomToggle transitionClasses={transitionClasses} currentTheme={currentTheme} changeIndex={(index: number)=>setExperienceToggleIndex(index)} className="w-full justify-end" values={[<List/>, <Road/>]} selectedIndex={experienceToggleIndex}/> */}
                            </div>
                            {/* experience container */}
                            <div>
                                {
                                    experienceContent["experiences"].map((exp : any, index : number)=>{
                                        const {company, role, description, dates, skills, json_model} = exp;
                                        return (
                                            <ExperienceListItem 
                                                key={`e-${index}`}
                                                transitionClasses={transitionClasses}
                                                skills={skills}
                                                currentTheme={currentTheme}
                                                company = {company}
                                                role = {role}
                                                description = {description}
                                                dates = {dates}
                                                jsonModel = {json_model}
                                            />
                                        )
                                    })
                                }
                            </div>
                        </div>

                        {/* EDUCATION */}
                        <div ref={containerEducationRef} className="my-48">
                            <div className="flex items-center">
                                <div className="w-full">
                                    <h1 className="m-0">{educationContent["header"]}</h1>
                                </div>
                                {/* <CustomToggle transitionClasses={transitionClasses} currentTheme={currentTheme} changeIndex={(index: number)=>setEducationToggleIndex(index)} className="w-full justify-end" values={[<List/>, <Road/>]} selectedIndex={educationToggleIndex}/> */}
                            </div>
                            <div>
                                {
                                    educationContent["list"].map((edu: any, index: number)=>{
                                        const {institution, 
                                            certificate, 
                                            relevant_coursework,
                                            activities,
                                            awards,
                                            bio,
                                            dates,
                                            media_url,
                                            json_model} = edu;
                                        
                                            return (
                                                <EducationListItem
                                                    key={`edu-${index}`}
                                                    transitionClasses={transitionClasses}
                                                    currentTheme={currentTheme}
                                                    institution={institution}
                                                    certificate={certificate}
                                                    relevant_coursework={relevant_coursework}
                                                    relevant_coursework_header={educationContent["relevant_coursework_header"]}
                                                    activities={activities}
                                                    activities_header={educationContent["activities_header"]}
                                                    awards={awards}
                                                    awards_header={educationContent["awards_header"]}
                                                    bio={bio}
                                                    dates={dates}
                                                    media_url={media_url}
                                                    jsonModel={json_model}
                                                />
                                            )
                                    })
                                }
                            </div>
                        </div>
                        {/* HOBBIES ( COMING SOON ) */}
                        
                    </main>
                    <footer className={`${currentTheme==="D" ? "bg-stone-800" : "bg-stone-400"} text-center ${transitionClasses} py-20`}>
                        <div className="lg:flex p-5">
                            <div className="lg:w-1/2 md:w-full flex flex-col justify-center items-center">
                                <h1 className="text-6xl">{footerContent["header"]}</h1>
                                <h3 className="italic">{footerContent["subheader"]}</h3>
                                <div className="flex w-2/5 gap-1">
                                    {currentTheme === "D" && (
                                        <>
                                            <a className="w-full h-20" href="https://linkedin.com/in/kai-jie-teo">
                                                <Canvas3D autoRotateSpeed={0} voxelJson={linkedin_dark} />
                                            </a>
                                            
                                            <a className="w-full h-20" href="https://github.com/pixelhypercube">
                                                <Canvas3D autoRotateSpeed={0} voxelJson={github_dark} />
                                            </a>
                                            
                                            <a className="w-full h-20" href="mailto:kj.teo.work@gmail.com">
                                                <Canvas3D autoRotateSpeed={0} voxelJson={email_dark} />
                                            </a>
                                        </>
                                    )}
                                    {currentTheme === "L" && (
                                        <>
                                            <a className="w-full h-20" href="https://linkedin.com/in/kai-jie-teo">
                                                <Canvas3D autoRotateSpeed={0} voxelJson={linkedin_light} />
                                            </a>
                                            
                                            <a className="w-full h-20" href="https://github.com/pixelhypercube">
                                                <Canvas3D autoRotateSpeed={0} voxelJson={github_light} />
                                            </a>
                                            
                                            <a className="w-full h-20" href="mailto:kj.teo.work@gmail.com">
                                                <Canvas3D autoRotateSpeed={0} voxelJson={email_light} />
                                            </a>
                                        </>
                                    )}
                                </div>
                            </div>
                            <form 
                            className="lg:w-1/2 md:w-full flex flex-col text-left gap-y-4 p-5"
                            onSubmit={handleSubmit}>
                                <div className="flex flex-col">
                                    <label htmlFor="Name">{formContent["name"]}</label>
                                    <input className={
                                        currentTheme === "D" ? darkInputTheme : lightInputTheme
                                    } type="text" 
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required/>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="Email">{formContent["email"]}</label>
                                    <input className={
                                        currentTheme === "D" ? darkInputTheme : lightInputTheme
                                    } type="email" 
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required/>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="Message">{formContent["message"]}</label>
                                    <textarea className={
                                        `${currentTheme === "D" ? darkInputTheme : lightInputTheme} h-25`
                                    }
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required></textarea>
                                </div>
                                <hr className="w-full border-stone-400 self-center"/>
                                <div>
                                    <input 
                                    className={currentTheme==="D" ? darkSubmitTheme : lightSubmitTheme} 
                                    type="submit"
                                    disabled={status === "submitting"}
                                    value={status === "submitting" ? "Sending..." : "Submit"} 
                                    />
                                </div>
                                {status === "success" && <p className="text-green-500 mt-2">Message sent successfully!</p>}
                                {status === "error" && <p className="text-red-500 mt-2">Failed to send message. Try again.</p>}
                            </form>
                        </div>
                        <div className="mt-10 pb-10">
                            <p className="italic font-light">{footerContent["bottom"]}</p>
                        </div>
                    </footer>
                </div>
            </div>
            {/* GLOBAL CANVAS */}
            <Canvas 
                eventSource={containerRef as React.RefObject<HTMLElement>}
                className="inset-0! pointer-events-none z-10 fixed!"
                events={undefined}
                camera={{fov:10,zoom:0.5}}
            >
                <View.Port />
                <Preload all/>
            </Canvas>
        </div>
    )
}