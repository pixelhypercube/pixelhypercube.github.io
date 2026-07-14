"use client"
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import { content, IS_DEBUG, projectSkillsTabsDark, projectSkillsTabsLight, skills } from "./globals";
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
import resume_dark from "./voxelModels/links/dark/resume.json"
import linkedin_light from "./voxelModels/links/light/linkedin.json"
import github_light from "./voxelModels/links/light/github.json"
import email_light from "./voxelModels/links/light/email.json"
import resume_light from "./voxelModels/links/light/resume.json"

// additional json
// import { ntu_coursework } from "./globals";

import { addEffect, Canvas } from "@react-three/fiber";
import { View, Preload } from "@react-three/drei";
import Lenis from "lenis";
import { Atom, ChevronLeft, ChevronRight, CircleEllipsis, Code, Grid, List, Road, Rows3 } from "lucide-react";
import CustomToggle from "./components/CustomToggle";
import { CgWebsite } from "react-icons/cg";
import { useLanguage } from "./components/LanguageContext";


// NEW IMPORTS

import { renderBioText, renderDate } from "./components/home/utils";
import { HobbyButton, RunningPBDiv } from "./components/home/HobbyComponents";
// import { ProjectSkillTab } from "./components/home/ProjectSkillTab";
import { SkillContainer } from "./components/home/SkillContainer";
import { ExperienceListItem } from "./components/home/ExperienceListItem";
import { ProjectGridItem, ProjectListItem } from "./components/home/ProjectComponents";
import { EducationListItem } from "./components/home/EducationListItem";
import { BiCarousel } from "react-icons/bi";
import { RiCarouselView } from "react-icons/ri";
import { IoConstructOutline } from "react-icons/io5";
import { useChat } from "@ai-sdk/react";

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

    // STATES
    const {selectedLanguage, setSelectedLanguage} = useLanguage();
    const [selectedHobby, setSelectedHobby] = useState<any>(running);
    // const [scrollY, setScrollY] = useState(0);
    // const [isChatbotOpen, setChatbotOpen] = useState(false);

    const [currentTheme, setCurrentTheme] = useState("D");
    const [layoutWidth, setLayoutWidth] = useState("N");

    const [projectsToggleIndex, setProjectsToggleIndex] = useState(0);
    const [experienceToggleIndex, setExperienceToggleIndex] = useState(0);
    const [educationToggleIndex, setEducationToggleIndex] = useState(0);

    // REFS
    const containerRef = useRef<HTMLDivElement>(null);
    const containerHeroRef = useRef<HTMLDivElement>(null);
    const containerAboutMeRef = useRef<HTMLDivElement>(null);
    const containerSkillsRef = useRef<HTMLDivElement>(null);
    const containerProjectsRef = useRef<HTMLDivElement>(null);
    const containerExperienceRef = useRef<HTMLDivElement>(null);
    const containerEducationRef = useRef<HTMLDivElement>(null);

    const navbarRef = useRef<HTMLDivElement>(null);
    const chatbotRef = useRef<HTMLDivElement>(null);

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
    const transitionClasses = `transition-all ease-in-out duration-500`;

    // placeholder input styles

    const inputTheme = "border rounded-2xl m-1 p-2 w-full transition-colors duration-200 outline-none focus:ring-2 focus:ring-stone-500"
    const darkInputTheme = `bg-stone-700 border-stone-700 text-white placeholder-stone-400 ${inputTheme} ${transitionClasses}`;
    const lightInputTheme = `bg-white border-stone-300 text-stone-900 placeholder-stone-500 ${inputTheme} ${transitionClasses}`;

    const submitTheme = "w-full px-6 py-2 rounded-2xl font-bold text-lg cursor-pointer transition-colors duration-200"
    const darkSubmitTheme = `bg-stone-700 hover:bg-stone-600 text-white ${submitTheme} ${transitionClasses}`;
    const lightSubmitTheme = `bg-stone-300 hover:bg-stone-500 text-stone-900 ${submitTheme} ${transitionClasses}`;

    // FORM HANDLER

    // const [formData, setFormData] = useState({
    //     name: "",
    //     email: "",
    //     message: ""
    // });

    // const [status, setStatus] = useState("idle"); // idle, submitting, success, error

    // interface FormData {
    //     name: string;
    //     email: string;
    //     message: string;
    // }

    // interface HandleChangeEvent extends React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> {}

    // const handleChange = (e: HandleChangeEvent) => {
    //     const { name, value } = e.target;
    //     setFormData((prev: FormData) => ({
    //         ...prev,
    //         [name]: value
    //     }));
    // };

    // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     setStatus("submitting");

    //     try {
    //         // replace url with your actual API endpoint or email service provider URL
    //         const response = await fetch("https://api.example.com/contact", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(formData),
    //         });

    //         if (response.ok) {
    //             setStatus("success");
    //             setFormData({ name: "", email: "", message: "" }); // reset form
    //         } else {
    //             setStatus("error");
    //         }
    //     } catch (error) {
    //         setStatus("error");
    //     }
    // };
    
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

    // carousel states

    const [experienceIndex, setExperienceIndex] = useState(0);
    const [educationIndex, setEducationIndex] = useState(0);
    const [projectIndex, setProjectIndex] = useState(0);

    // CAROUSEL HEIGHT STATES
    const [projectHeight, setProjectHeight] = useState<number | string>("auto");
    const [experienceHeight, setExperienceHeight] = useState<number | string>("auto");
    const [educationHeight, setEducationHeight] = useState<number | string>("auto");

    // HEIGHT MEASUREMENT REFS
    const projectTrackRef = useRef<HTMLDivElement>(null);
    const experienceTrackRef = useRef<HTMLDivElement>(null);
    const educationTrackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (projectsToggleIndex !== 0 || !projectTrackRef.current) {
            setProjectHeight("auto");
            return;
        }

        let observer: ResizeObserver | null = null;
        const activeChild = projectTrackRef.current.children[projectIndex] as HTMLElement;

        if (activeChild) {
            observer = new ResizeObserver((entries) => {
                for (let entry of entries) {
                    // Captures height safely post-render and post-layout updates
                    setProjectHeight(entry.target.clientHeight);
                }
            });
            observer.observe(activeChild);
        }

        return () => {
            if (observer) observer.disconnect();
        };
    }, [projectIndex, projectsToggleIndex]);

    useEffect(() => {
        if (experienceToggleIndex !== 0 || !experienceTrackRef.current) {
            setExperienceHeight("auto");
            return;
        }

        let observer: ResizeObserver | null = null;
        const activeChild = experienceTrackRef.current.children[experienceIndex] as HTMLElement;

        if (activeChild) {
            observer = new ResizeObserver((entries) => {
                for (let entry of entries) {
                    setExperienceHeight(entry.target.clientHeight);
                }
            });
            observer.observe(activeChild);
        }

        return () => {
            if (observer) observer.disconnect();
        };
    }, [experienceIndex, experienceToggleIndex]);

    useEffect(() => {
        if (educationToggleIndex !== 0 || !educationTrackRef.current) {
            setEducationHeight("auto");
            return;
        }

        let observer: ResizeObserver | null = null;
        const activeChild = educationTrackRef.current.children[educationIndex] as HTMLElement;

        if (activeChild) {
            observer = new ResizeObserver((entries) => {
                for (let entry of entries) {
                    setEducationHeight(entry.target.clientHeight);
                }
            });
            observer.observe(activeChild);
        }

        return () => {
            if (observer) observer.disconnect();
        };
    }, [educationIndex, educationToggleIndex]);

    // DETECT WHETHER DEVICE IS TOUCHSCREEN OR NOT

    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(pointer: coarse)');
        setIsTouchDevice(mediaQuery.matches);

        const handler = (e: MediaQueryListEvent) => setIsTouchDevice(e.matches);
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    // WINDOW WIDTH GLOBAL VARIABLE
    
    const [windowWidth, setWindowWidth] = useState<number>(0);

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // CHATBOT MESSAGES

    const openingMessage: Record<string, string> = {
        "en": "Hi! It's me, KJ again! Feel free to ask me about anything here! Like literally anything!",
        "zh-Hans": "你好！又是我，凯杰！在这里你可以问我任何事情！真的是任何事情哦！",
        "zh-Hant": "你好！又是我，凱傑！在這裡你可以問我任何事情！真的是任何事情哦！",
        "ja": "こんにちは！またまたカイジエです！ここからは何でも気軽に聞いてね！本当に何でもいいよ！",
    };

    const { messages: chatbotMessages, sendMessage, status, error } = useChat({
        messages: IS_DEBUG ? [
            { id: '1', role: 'user', content: "this is a sender's message", parts: [{ type: 'text', text: "this is a sender's message" }] },
            { id: '2', role: 'assistant', content: "this is a receiver's message", parts: [{ type: 'text', text: "this is a receiver's message" }] }
        ] : [
            { id: '1', role: 'assistant', content: openingMessage[selectedLanguage], parts: [{ type: 'text', text: openingMessage[selectedLanguage] }] }
        ]
    });


    // FOR MOBILE PAGINATION

    const handleTouchScroll = (
        e: React.UIEvent<HTMLDivElement>,
        setIndex: React.Dispatch<React.SetStateAction<number>>
    ) => {
        if (!isTouchDevice) return;

        const container = e.currentTarget;
        const scrollLeft = container.scrollLeft;
        
        // each child item has a width of calc(100% - 32px) and the flex container has gap-4 (16px)
        const containerWidth = container.clientWidth;
        const itemWidth = containerWidth - 32;
        const gap = 16;
        const totalStepWidth = itemWidth + gap;

        // Compute the nearest scrolled item index
        const currentActiveIndex = Math.round(scrollLeft / totalStepWidth);
        
        setIndex(currentActiveIndex);
    };

    // determine smooth scrolling (desktop only)

    if (!isTouchDevice) addEffect((t)=>lenis.raf(t));

    return (
        <div ref={containerRef} className={`relative w-full min-h-screen 
        ${currentTheme==="D" ? 
        "bg-stone-900 text-white" : 
        "bg-stone-200 text-stone-900"} ${transitionClasses}`}>
            <Chatbot 
                messages={chatbotMessages}
                sendMessage={sendMessage}
                status={status}
                error={error}
                currentTheme={currentTheme}
                selectedLanguage={selectedLanguage}
                transitionClasses={transitionClasses}
                ref={chatbotRef}
            />
            <Navbar
                callbacks={{
                    setScrollPosHome: () => containerHeroRef.current?.scrollIntoView({ behavior: "smooth" }),
                    setScrollPosAboutMe: () => containerAboutMeRef.current?.scrollIntoView({ behavior: "smooth" }),
                    setScrollPosSkills: () => containerSkillsRef.current?.scrollIntoView({ behavior: "smooth" }),
                    setScrollPosProjects: () => containerProjectsRef.current?.scrollIntoView({ behavior: "smooth" }),
                    setScrollPosExperience: () => containerExperienceRef.current?.scrollIntoView({ behavior: "smooth" }),
                    setScrollPosEducation: () => containerEducationRef.current?.scrollIntoView({ behavior: "smooth" }),
                    onThemeToggle:(newTheme: string) => setCurrentTheme(newTheme),
                    onLayoutWidthToggle:(newLayoutWidth: string) => setLayoutWidth(newLayoutWidth),
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
                    <header ref={containerHeroRef} className="lg:flex text-center my-60">
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
                    <main className={`${layoutWidth==="N" ? "xl:w-6/9 w-8/9" : "w-8/9"} mx-8 justify-self-center ${transitionClasses}`}>
                        {/* ABOUT ME */}
                        <div ref={containerAboutMeRef} className="mb-64">
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
                            <div className="grid grid-cols-1 lg:grid-cols-2 p-5 gap-12 h-full items-center">
                                {/* 3d voxel about me */}
                                <div className="h-64 shrink-0">
                                    <Canvas3D voxelJson={kj}/>
                                </div>
                                <div className="grid gap-4">
                                    <div className={`${currentTheme==="D" ? "bg-stone-800" : "bg-stone-300"} rounded-4xl p-5 items-center ${transitionClasses}`}>
                                        <div>
                                            {
                                                aboutMeContent["bio"] && renderBioText(aboutMeContent["bio"])
                                            }
                                        </div>
                                        <hr className={`${currentTheme==="D" ? "border-stone-600" : "border-stone-400"} border-dashed mb-4 ${transitionClasses}`}/>
                                        <div>
                                            {
                                                aboutMeContent["bio2"] && renderBioText(aboutMeContent["bio2"])
                                            }
                                            <p className="text-sm font-light italic">{aboutMeContent["bio_bottom"]}</p>
                                        </div>
                                    </div>
                                    {/* <div className={`${currentTheme==="D" ? "bg-stone-800" : "bg-stone-300"} rounded-4xl p-5 items-center ${transitionClasses}`}>
                                        <div>
                                            {
                                                aboutMeContent["bio2"] && renderBioText(aboutMeContent["bio2"])
                                            }
                                            <p className="text-sm font-light italic">{aboutMeContent["bio_bottom"]}</p>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        {/* SKILLS */}
                        <div ref={containerSkillsRef} className="my-5">
                            <h1>{skillsInfo["header"]}</h1>
                            {
                                Object.keys(skills).map((skill:string,idx:number)=>{
                                    return (
                                        <div key={`skill-cat-${idx}`}>
                                            <h4 className="text-left">{skillsInfo[`${skill}_header`]}</h4>
                                            <div 
                                                className={`flex gap-4 mb-5 ${
                                                    isTouchDevice 
                                                        ? "flex-row flex-nowrap overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth" 
                                                        : "flex-wrap"
                                                }`}
                                            >
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
                                                                className={isTouchDevice ? "shrink-0 snap-start" : ""}
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
                                <CustomToggle transitionClasses={transitionClasses} currentTheme={currentTheme} changeIndex={(index: number)=>setProjectsToggleIndex(index)} className="w-full justify-end" values={[<RiCarouselView size={24}/>, <Rows3/>, <Grid/>]} selectedIndex={projectsToggleIndex}/>
                            </div>
                            {
                                projectsToggleIndex===0 && (
                                    <div className="relative w-full max-w-full min-w-0">
                                        <div 
                                            className={`w-full ${
                                                isTouchDevice 
                                                    ? "overflow-x-auto snap-x snap-mandatory no-scrollbar" 
                                                    : "overflow-hidden"
                                            }`}
                                            // style={{ height: isTouchDevice ? 'auto' : projectHeight }}
                                            style={{ height: projectHeight }}
                                            onScroll={(e) => handleTouchScroll(e, setProjectIndex)}
                                        >
                                            <div 
                                                ref={projectTrackRef}
                                                className={`flex flex-row gap-4 items-start ${
                                                    !isTouchDevice ? "transition-transform duration-500 ease-in-out" : ""
                                                }`}
                                                style={{ 
                                                    transform: isTouchDevice 
                                                        ? 'none' 
                                                        : `translateX(calc(-${projectIndex * 100}% - ${projectIndex * 16}px))` 
                                                }}
                                            >
                                                {
                                                    projectsContent["projects"].map((proj: any, index: number)=>{
                                                        const {name, short_description, description, reflection, skillsList, date, media_url, source_code, web_link, changelog} = proj;
                                                        
                                                        return <div 
                                                            key={`proj-${index}`} 
                                                            className={`shrink-0 ${
                                                                isTouchDevice 
                                                                    ? "w-[calc(100%-32px)] snap-center first:ml-4 last:mr-4" 
                                                                    : "w-full"
                                                            }`}
                                                        >
                                                            <ProjectListItem
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
                                                            />
                                                        </div>;
                                                    })
                                                }
                                            </div>
                                        </div>   
                                        {/* PAGINATION */}
                                        {!isTouchDevice && <div className="flex justify-center items-center gap-8">
                                            <button 
                                                onClick={()=>setProjectIndex(projectIndex-1)}
                                                className={`${windowWidth>=768 ? "absolute -left-16 top-1/2 -translate-y-1/2 z-10" : ""} rounded-full p-1 ${currentTheme==="D" ? "text-white hover:text-white/50 bg-white/10" : "text-black hover:text-black/50 bg-black/20"}
                                                ${projectIndex>0 ? "opacity-100" : "opacity-0 pointer-events-none"}
                                                transition-colors duration-200 ease-in-out
                                                hover:opacity-50
                                                `}
                                                aria-label="project-prev"
                                            >
                                                <ChevronLeft strokeWidth={2} size={48}/>
                                            </button>
                                            {
                                                projectsContent["projects"].map((_: any,idx: number)=>(
                                                    <button
                                                        key={`circle-btn-${idx}`} 
                                                        onClick={()=>setProjectIndex(idx)}
                                                        className={`w-4 h-4 hover:scale-125 transition-all rounded-full cursor-pointer 
                                                            ${idx==projectIndex ? 
                                                                (currentTheme==="D" ? "bg-white" : "bg-black") : 
                                                                (currentTheme==="D" ? "bg-white/50 hover:bg-white/75" : "bg-black/50 hover:bg-black/75")}
                                                            `}
                                                    >
                                                    </button>
                                                ))
                                            }
                                            <button 
                                                onClick={()=>setProjectIndex(projectIndex+1)}
                                                className={`${windowWidth>=768 ? "absolute -right-16 top-1/2 -translate-y-1/2 z-10" : ""} rounded-full p-1 ${currentTheme==="D" ? "text-white bg-white/10" : "text-black bg-black/20"}
                                                ${projectIndex < projectsContent["projects"].length-1 ? "opacity-100" : "opacity-0 pointer-events-none"}
                                                transition-colors duration-200 ease-in-out 
                                                hover:opacity-50`}
                                                aria-label="project-next"
                                            >
                                                <ChevronRight strokeWidth={2} size={48}/>
                                            </button>
                                        </div>}
                                    </div>
                                )
                            }
                            {
                                projectsToggleIndex===1 && (
                                    <div>
                                        {
                                            projectsContent["projects"].map((proj: any, index: number)=>{
                                                const {name, short_description, description, reflection, skillsList, date, media_url, source_code, web_link, changelog} = proj;
                                                
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
                                            })
                                        }
                                    </div>
                                )
                            }
                            {
                                projectsToggleIndex===2 && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {
                                            projectsContent["projects"].map((proj: any, index: number)=>{
                                                const {name, short_description, description, reflection, skillsList, date, media_url, source_code, web_link, changelog} = proj;
                                                
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
                                            })
                                        }
                                    </div>
                                )
                            }
                        </div>
                        
                        {/* EXPERIENCE */}
                        <div ref={containerExperienceRef} className="my-48">
                            <div className="flex items-center">
                                <div className="w-full">
                                    <h1 className="m-0">{experienceContent["header"]}</h1>
                                </div>
                                <CustomToggle transitionClasses={transitionClasses} currentTheme={currentTheme} changeIndex={(index: number)=>setExperienceToggleIndex(index)} className="w-full justify-end" values={[<RiCarouselView size={24}/>, <Rows3/>]} selectedIndex={experienceToggleIndex}/>
                            </div>
                            {/* experience container */}
                            <div>
                                {
                                    experienceToggleIndex === 0 && (
                                        <div className="relative w-full max-w-full min-w-0">
                                            <div style={{ height: experienceHeight }} className={`w-full ${
                                                isTouchDevice 
                                                    ? "overflow-x-auto snap-x snap-mandatory no-scrollbar" 
                                                    : "overflow-hidden"
                                            } transition-[height] duration-500 ease-in-out relative`}
                                            onScroll={(e) => handleTouchScroll(e, setExperienceIndex)}>
                                                <div 
                                                ref={experienceTrackRef}
                                                className={`flex flex-row gap-4 items-start ${
                                                    !isTouchDevice ? "transition-transform duration-500 ease-in-out" : ""
                                                }`}
                                                style={{ 
                                                    transform: isTouchDevice ? 
                                                    "none" :
                                                    `translateX(calc(-${experienceIndex * 100}% - ${experienceIndex * 16}px))` 
                                                }}
                                                >
                                                    {
                                                        experienceContent["experiences"].map((exp: any, index: number)=>{
                                                            const {company, role, description, dates, skills, reflection, json_model} = exp;
                                                            return (
                                                                <div key={`e-${index}`} className={`shrink-0 ${
                                                                    isTouchDevice 
                                                                        ? "w-[calc(100%-32px)] snap-center first:ml-4 last:mr-4" 
                                                                        : "w-full"
                                                                }`}>
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
                                                                        // isModelVisible = {experienceIndex===index}
                                                                        isModelVisible={true}
                                                                        bio_header = {experienceContent["bio_header"]}
                                                                        reflection = {reflection}
                                                                        reflection_header = {experienceContent["reflection_header"]}
                                                                    />
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                            {/* PAGINATION */}
                                            {!isTouchDevice && <div className="justify-center items-center flex gap-8">
                                                <button 
                                                    onClick={()=>setExperienceIndex(experienceIndex-1)}
                                                    className={`${windowWidth>=768 ? "absolute -left-16 top-1/2 -translate-y-1/2 z-10" : ""} rounded-full p-1 ${currentTheme==="D" ? "text-white hover:text-white/50 bg-white/10" : "text-black hover:text-black/50 bg-black/20"}
                                                    ${experienceIndex>0 ? "opacity-100" : "opacity-0 pointer-events-none"}
                                                    transition-colors duration-200 ease-in-out
                                                    hover:opacity-50
                                                    `}
                                                    aria-label="experience-prev"
                                                >
                                                    <ChevronLeft strokeWidth={2} size={48}/>                                            
                                                </button>
                                                {
                                                    experienceContent["experiences"].map((_: any,idx: number)=>(
                                                        <button
                                                            key={`circle-btn-${idx}`} 
                                                            onClick={()=>setExperienceIndex(idx)}
                                                            className={`w-4 h-4 hover:scale-125 transition-all rounded-full cursor-pointer 
                                                                ${idx==experienceIndex ? 
                                                                    (currentTheme==="D" ? "bg-white" : "bg-black") : 
                                                                    (currentTheme==="D" ? "bg-white/50 hover:bg-white/75" : "bg-black/50 hover:bg-black/75")}
                                                                `}
                                                        >
                                                        </button>
                                                    ))
                                                }
                                                <button 
                                                    onClick={()=>setExperienceIndex(experienceIndex+1)}
                                                    className={`${windowWidth>=768 ? "absolute -right-16 top-1/2 -translate-y-1/2 z-10" : ""} rounded-full p-1 ${currentTheme==="D" ? "text-white hover:text-white/50 bg-white/10" : "text-black hover:text-black/50 bg-black/20"}
                                                    ${experienceIndex < experienceContent["experiences"].length-1 ? "opacity-100" : "opacity-0 pointer-events-none"}
                                                    transition-colors duration-200 ease-in-out 
                                                    hover:opacity-50`}
                                                    aria-label="experience-next"
                                                >
                                                    <ChevronRight strokeWidth={2} size={48}/>
                                                </button>
                                            </div>}
                                        </div>
                                    )
                                }
                                {
                                    experienceToggleIndex === 1 && experienceContent["experiences"].map((exp: any, index: number)=>{
                                        const {company, role, description, dates, skills, reflection, json_model} = exp;
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
                                                isModelVisible = {true}
                                                bio_header = {experienceContent["bio_header"]}
                                                reflection = {reflection}
                                                reflection_header = {experienceContent["reflection_header"]}
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
                                <CustomToggle transitionClasses={transitionClasses} currentTheme={currentTheme} changeIndex={(index: number)=>setEducationToggleIndex(index)} className="w-full justify-end" values={[<RiCarouselView size={24}/>, <Rows3/>]} selectedIndex={educationToggleIndex}/>
                            </div>
                            <div>
                                {
                                    educationToggleIndex === 0 && (
                                        <div className="relative w-full max-w-full min-w-0">
                                            <div style={{ height: educationHeight }} className={`w-full ${
                                                isTouchDevice 
                                                    ? "overflow-x-auto snap-x snap-mandatory no-scrollbar" 
                                                    : "overflow-hidden"
                                            } transition-[height] duration-500 ease-in-out`}
                                            onScroll={(e) => handleTouchScroll(e, setProjectIndex)}>
                                                <div 
                                                className={`flex flex-row gap-4 items-start ${
                                                    !isTouchDevice ? "transition-transform duration-500 ease-in-out" : ""
                                                }`}
                                                ref={educationTrackRef}
                                                style={{ 
                                                    transform: isTouchDevice ? 
                                                    "none" : 
                                                    `translateX(calc(-${educationIndex * 100}% - ${educationIndex * 16}px))` 
                                                }}
                                                onScroll={(e) => handleTouchScroll(e, setEducationIndex)}
                                                >
                                                    {
                                                        educationContent["list"].map((edu: any, index: number)=>{
                                                            const {institution, 
                                                                certificate, 
                                                                relevant_coursework,
                                                                activities,
                                                                academic_projects,
                                                                awards,
                                                                bio,
                                                                dates,
                                                                media_url,
                                                                json_model,
                                                                skills} = edu;
                                                            
                                                                return (
                                                                    <div key={`e-${index}`} className={`shrink-0 ${
                                                                        isTouchDevice 
                                                                            ? "w-[calc(100%-32px)] snap-center first:ml-4 last:mr-4" 
                                                                            : "w-full"
                                                                    }`}>
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
                                                                            academic_projects={academic_projects}
                                                                            academicProjects={academic_projects}
                                                                            academic_projects_header={educationContent["academic_projects_header"]}
                                                                            awards={awards}
                                                                            awards_header={educationContent["awards_header"]}
                                                                            bio={bio}
                                                                            bio_header={educationContent["bio_header"]}
                                                                            dates={dates}
                                                                            media_url={media_url}
                                                                            jsonModel={json_model}
                                                                            skills={skills}
                                                                            // isModelVisible = {educationIndex===index || isTouchDevice}
                                                                            isModelVisible={true}
                                                                            windowWidth={windowWidth}
                                                                        />
                                                                    </div>
                                                                )
                                                        })
                                                    }
                                                    </div>
                                            </div>
                                            {/* PAGINATION */}
                                            {!isTouchDevice && <div className="justify-center items-center flex gap-8">
                                                <button 
                                                    onClick={()=>setEducationIndex(educationIndex-1)}
                                                    className={`${windowWidth>=768 ? "absolute -left-16 top-1/2 -translate-y-1/2 z-10" : ""} rounded-full p-1 ${currentTheme==="D" ? "text-white hover:text-white/50 bg-white/10" : "text-black hover:text-black/50 bg-black/20"}
                                                    ${educationIndex>0 ? "opacity-100" : "opacity-0 pointer-events-none"}
                                                    transition-colors duration-200 ease-in-out
                                                    hover:opacity-50
                                                    `}
                                                    aria-label="education-prev"
                                                >
                                                    <ChevronLeft strokeWidth={2} size={48}/>                                            
                                                </button>
                                                {
                                                    educationContent["list"].map((_: any,idx: number)=>(
                                                        <button
                                                            key={`circle-btn-${idx}`} 
                                                            onClick={()=>setEducationIndex(idx)}
                                                            className={`w-4 h-4 hover:scale-125 transition-all rounded-full cursor-pointer 
                                                                ${idx==educationIndex ? 
                                                                    (currentTheme==="D" ? "bg-white" : "bg-black") : 
                                                                    (currentTheme==="D" ? "bg-white/50 hover:bg-white/75" : "bg-black/50 hover:bg-black/75")}
                                                                `}
                                                        >
                                                        </button>
                                                    ))
                                                }
                                                <button 
                                                    onClick={()=>setEducationIndex(educationIndex+1)}
                                                    className={`${windowWidth>=768 ? "absolute -right-16 top-1/2 -translate-y-1/2 z-10" : ""} rounded-full p-1 ${currentTheme==="D" ? "text-white hover:text-white/50 bg-white/10" : "text-black hover:text-black/50 bg-black/20"}
                                                    ${educationIndex < educationContent["list"].length-1 ? "opacity-100" : "opacity-0 pointer-events-none"}
                                                    transition-colors duration-200 ease-in-out 
                                                    hover:opacity-50`}
                                                    aria-label="education-next"
                                                >
                                                    <ChevronRight strokeWidth={2} size={48}/>
                                                </button>
                                            </div>}
                                        </div>
                                    )
                                }
                                {
                                    educationToggleIndex === 1 && educationContent["list"].map((edu: any, index: number)=>{
                                        const {institution, 
                                            certificate, 
                                            relevant_coursework,
                                            activities,
                                            academic_projects,
                                            awards,
                                            bio,
                                            dates,
                                            media_url,
                                            json_model,
                                            skills} = edu;
                                        
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
                                                    academic_projects={academic_projects}
                                                    academicProjects={academic_projects}
                                                    academic_projects_header={educationContent["academic_projects_header"]}
                                                    awards={awards}
                                                    awards_header={educationContent["awards_header"]}
                                                    bio={bio}
                                                    bio_header={educationContent["bio_header"]}
                                                    dates={dates}
                                                    media_url={media_url}
                                                    jsonModel={json_model}
                                                    skills={skills}
                                                    isModelVisible = {true}
                                                    windowWidth={windowWidth}
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
                            <div className="md:w-full flex flex-col justify-center items-center">
                                <h1 className="text-6xl">{footerContent["header"]}</h1>
                                <h3 className="italic">{footerContent["subheader"]}</h3>
                                <div className="flex w-2/5 gap-1">
                                    {currentTheme === "D" && (
                                        <>
                                            <a 
                                                className="w-full h-20 relative group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500" 
                                                href="https://linkedin.com/in/kai-jie-teo"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Canvas3D autoRotateSpeed={0} voxelJson={linkedin_dark} />
                                                <div className="absolute top-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-xl border pointer-events-none whitespace-nowrap bg-black text-white border-stone-700 opacity-0 scale-95 transition-all duration-150 ease-out group-hover:opacity-100 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:scale-100">
                                                    <p className="m-0">Open LinkedIn</p>
                                                </div>
                                            </a>
                                            
                                            <a 
                                                className="w-full h-20 relative group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500" 
                                                href="https://github.com/pixelhypercube"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Canvas3D autoRotateSpeed={0} voxelJson={github_dark} />
                                                <div className="absolute top-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-xl border pointer-events-none whitespace-nowrap bg-black text-white border-stone-700 opacity-0 scale-95 transition-all duration-150 ease-out group-hover:opacity-100 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:scale-100">
                                                    <p className="m-0">Open GitHub</p>
                                                </div>
                                            </a>
                                            
                                            <a 
                                                className="w-full h-20 relative group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500" 
                                                href="mailto:kj.teo.work@gmail.com"
                                            >
                                                <Canvas3D autoRotateSpeed={0} voxelJson={email_dark} />
                                                <div className="absolute top-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-xl border pointer-events-none whitespace-nowrap bg-black text-white border-stone-700 opacity-0 scale-95 transition-all duration-150 ease-out group-hover:opacity-100 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:scale-100">
                                                    <p className="m-0">Send Email</p>
                                                </div>
                                            </a>

                                            <a 
                                                className="w-full h-20 relative group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500" 
                                                href="/Teo_Kai_Jie_Kendrick_Resume.pdf"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Canvas3D autoRotateSpeed={0} voxelJson={resume_dark} />
                                                <div className="absolute top-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-xl border pointer-events-none whitespace-nowrap bg-black text-white border-stone-700 opacity-0 scale-95 transition-all duration-150 ease-out group-hover:opacity-100 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:scale-100">
                                                    <p className="m-0">View Resume</p>
                                                </div>
                                            </a>
                                        </>
                                    )}
                                    {currentTheme === "L" && (
                                        <>
                                            <a 
                                                className="w-full h-20 relative group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500" 
                                                href="https://linkedin.com/in/kai-jie-teo"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Canvas3D autoRotateSpeed={0} voxelJson={linkedin_light} />
                                                <div className="absolute top-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-xl border pointer-events-none whitespace-nowrap bg-white text-stone-900 border-stone-200 opacity-0 scale-95 transition-all duration-150 ease-out group-hover:opacity-100 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:scale-100">
                                                    <p className="m-0">Open LinkedIn</p>
                                                </div>
                                            </a>
                                            
                                            <a 
                                                className="w-full h-20 relative group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500" 
                                                href="https://github.com/pixelhypercube"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Canvas3D autoRotateSpeed={0} voxelJson={github_light} />
                                                <div className="absolute top-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-xl border pointer-events-none whitespace-nowrap bg-white text-stone-900 border-stone-200 opacity-0 scale-95 transition-all duration-150 ease-out group-hover:opacity-100 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:scale-100">
                                                    <p className="m-0">Open GitHub</p>
                                                </div>
                                            </a>
                                            
                                            <a 
                                                className="w-full h-20 relative group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500" 
                                                href="mailto:kj.teo.work@gmail.com"
                                            >
                                                <Canvas3D autoRotateSpeed={0} voxelJson={email_light} />
                                                <div className="absolute top-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-xl border pointer-events-none whitespace-nowrap bg-white text-stone-900 border-stone-200 opacity-0 scale-95 transition-all duration-150 ease-out group-hover:opacity-100 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:scale-100">
                                                    <p className="m-0">Send Email</p>
                                                </div>
                                            </a>

                                            <a 
                                                className="w-full h-20 relative group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500" 
                                                href="Teo_Kai_Jie_Kendrick_Resume.pdf"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Canvas3D autoRotateSpeed={0} voxelJson={resume_light} />
                                                <div className="absolute top-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-xl border pointer-events-none whitespace-nowrap bg-white text-stone-900 border-stone-200 opacity-0 scale-95 transition-all duration-150 ease-out group-hover:opacity-100 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:scale-100">
                                                    <p className="m-0">View Resume</p>
                                                </div>
                                            </a>
                                        </>
                                    )}
                                </div>
                            </div>
                            {/* <form 
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
                            </form> */}
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