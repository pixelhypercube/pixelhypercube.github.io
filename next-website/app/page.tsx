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

import { addEffect, Canvas } from "@react-three/fiber";
import { View, Preload } from "@react-three/drei";
import { ChevronLeft, ChevronRight, Rows3, Grid } from "lucide-react";
import CustomToggle from "./components/CustomToggle";
import { useLanguage } from "./components/LanguageContext";

// NEW IMPORTS
import { renderBioText, renderDate } from "./components/home/utils";
import { SkillContainer } from "./components/home/SkillContainer";
import { ExperienceListItem, ExperienceTimelineElem } from "./components/home/ExperienceComponents";
import { ProjectGridItem, ProjectListItem } from "./components/home/ProjectComponents";
import { EducationListItem, EducationTimelineElem } from "./components/home/EducationComponents";
import { RiCarouselView } from "react-icons/ri";
import { useChat } from "@ai-sdk/react";
import Lenis from "lenis";

export default function Home() {
    // STATES
    const {selectedLanguage, setSelectedLanguage} = useLanguage();
    const [selectedHobby, setSelectedHobby] = useState<any>(running);

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
    const containerOldProjectsRef = useRef<HTMLDivElement>(null);
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
    var oldProjectsContent = home["old_projects"];
    var educationContent = home["education"];

    var footerContent = home["footer"];

    const transitionClasses = `transition-all ease-in-out duration-500`;

    const [currentDiv, setCurrentDiv] = useState("");

    // AUTO SET THEME BASED ON BROWSER'S THEME PREFERENCES
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        console.log(mediaQuery)
        
        setCurrentTheme(mediaQuery.matches ? "D" : "L");

        const handleChange = (e: MediaQueryListEvent) => {
            setCurrentTheme(e.matches ? "D" : "L");
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);


    useEffect(() => {
        const onScroll = () => {
            const navbarHeight = navbarRef.current?.clientHeight;
            
            const divs: Record<string, DOMRect | undefined> = {
                "hero": containerHeroRef.current?.getBoundingClientRect(),
                "about_me": containerAboutMeRef.current?.getBoundingClientRect(),
                "skills": containerSkillsRef.current?.getBoundingClientRect(),
                "projects": containerProjectsRef.current?.getBoundingClientRect(),
                "experience": containerExperienceRef.current?.getBoundingClientRect(),
                "education": containerEducationRef.current?.getBoundingClientRect(),
            }

            for (const key of Object.keys(divs)) {
                if (!navbarHeight) continue;

                const div = divs[key];
                if (!div) continue;

                const {top, height} = div;
                if (!top || !height) continue;

                if (top - navbarHeight - 50 <= 0 && top + height - navbarHeight - 50 >= 0) {
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
        "en": "Hi! It's me, KJ again! Feel free to ask me about anything here! Like literally anything! Take note that this chatbot is currently in its beta phase, and that means that there will be a lot more improvements along the way!",
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
        
        const containerWidth = container.clientWidth;
        const itemWidth = containerWidth - 32;
        const gap = 16;
        const totalStepWidth = itemWidth + gap;

        const currentActiveIndex = Math.round(scrollLeft / totalStepWidth);
        setIndex(currentActiveIndex);
    };

    // useEffect(() => {
    //     // This instantiates Lenis safely only when the browser environment is active
    //     const lenisInstance = new Lenis({ syncTouch: true });

    //     let removeR3FEffect: (() => void) | undefined;

    //     // Safely bind the frame request animation loop on desktop devices
    //     if (!isTouchDevice) {
    //         removeR3FEffect = addEffect((t) => {
    //             lenisInstance.raf(t);
    //         });
    //     }

    //     // Clean up listeners and loops when the component unmounts
    //     return () => {
    //         if (removeR3FEffect) removeR3FEffect();
    //         lenisInstance.destroy();
    //     };
    // }, [isTouchDevice]);

    return (
        <div 
            ref={containerRef} 
            className={`relative w-full min-h-screen touch-pan-y ${currentTheme === "D" ? "bg-stone-900 text-white" : "bg-stone-200 text-stone-900"} ${transitionClasses}`}
            style={{ touchAction: "pan-y" }}
        >
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
                    onThemeToggle: (newTheme: string) => setCurrentTheme(newTheme),
                    onLayoutWidthToggle: (newLayoutWidth: string) => setLayoutWidth(newLayoutWidth),
                    onLanguageChange: (newLanguage: string) => setSelectedLanguage(newLanguage)
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
                            <Canvas3D voxelJson={computer} className="h-126 lg:w-full sm:w-1/2 justify-self-center z-11"/>
                        </div>
                    </header>
                    <main className={`${layoutWidth === "N" ? "xl:w-6/9 w-8/9" : "w-8/9"} mx-8 justify-self-center ${transitionClasses}`}>
                        {/* ABOUT ME */}
                        <div ref={containerAboutMeRef} className="mb-64">
                            <div className="grid grid-cols-1 lg:grid-cols-2 p-5 gap-12 h-full items-center">
                                <div className="h-64 shrink-0">
                                    <Canvas3D voxelJson={kj}/>
                                </div>
                                <div className="grid gap-4">
                                    <div className={`${currentTheme === "D" ? "bg-stone-800" : "bg-stone-300"} rounded-4xl p-5 items-center ${transitionClasses}`}>
                                        <div>
                                            {aboutMeContent["bio"] && renderBioText(aboutMeContent["bio"])}
                                        </div>
                                        <hr className={`${currentTheme === "D" ? "border-stone-600" : "border-stone-400"} border-dashed mb-4 ${transitionClasses}`}/>
                                        <div>
                                            {aboutMeContent["bio2"] && renderBioText(aboutMeContent["bio2"])}
                                            <p className="text-sm font-light italic">{aboutMeContent["bio_bottom"]}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* SKILLS */}
                        <div ref={containerSkillsRef} className="my-5">
                            <h1>{skillsInfo["header"]}</h1>
                            {
                                Object.keys(skills).map((skill: string, idx: number) => {
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
                                                    skills[skill].map((s: any, index: number) => {
                                                        const {name, dict_obj, skill_proficiency, jsonModelDark, jsonModelLight, camPosition, fov} = s;
                                                        const proficiency = 
                                                            dict_obj === "lang" ? 
                                                            skillsInfo["language_proficiencies"][skill_proficiency] : 
                                                            dict_obj === "none" ?
                                                            skill_proficiency :
                                                            skillsInfo["skill_proficiencies"][skill_proficiency];
                                                        
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
                                                                camPosition={camPosition}
                                                                fov={fov}
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
                            <div className="flex items-center mb-12">
                                <div className="w-full">
                                    <h1 className="m-0">{projectsContent["header"]}</h1>
                                    <p className="m-0 text-light italic">{projectsContent["description"]}</p>
                                </div>
                                {/* {!isTouchDevice && <CustomToggle transitionClasses={transitionClasses} currentTheme={currentTheme} changeIndex={(index: number) => setProjectsToggleIndex(index)} className="w-full justify-end" values={[<RiCarouselView size={24}/>, <Rows3/>, <Grid/>]} selectedIndex={projectsToggleIndex}/>} */}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mb-12">
                                {
                                    projectsContent["projects"].map((proj: any, index: number) => {
                                        const {name, short_description, description, reflection, skillsList, date, media_url, source_code, web_link, changelog} = proj;
                                        return (
                                            <ProjectGridItem
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
                                        );
                                    })
                                }
                            </div>

                            <div className="flex items-center mb-12">
                                <div className="w-full">
                                    <h2 className="m-0">{oldProjectsContent["header"]}</h2>
                                    <p className="m-0 text-light italic">{oldProjectsContent["description"]}</p>
                                </div>
                                {/* {!isTouchDevice && <CustomToggle transitionClasses={transitionClasses} currentTheme={currentTheme} changeIndex={(index: number) => setProjectsToggleIndex(index)} className="w-full justify-end" values={[<RiCarouselView size={24}/>, <Rows3/>, <Grid/>]} selectedIndex={projectsToggleIndex}/>} */}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                                {
                                    oldProjectsContent["projects"].map((proj: any, index: number) => {
                                        const {name, short_description, description, reflection, skillsList, date, media_url, source_code, web_link, changelog} = proj;
                                        return (
                                            <ProjectGridItem
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
                                                isArchived={true}
                                            />
                                        );
                                    })
                                }
                            </div>
                        </div>
                        {/* EXPERIENCE */}
                        <div ref={containerExperienceRef} className="my-48">
                            <div className="flex items-center mb-12">
                                <div className="w-full">
                                    <h1 className="m-0">{experienceContent["header"]}</h1>
                                </div>
                                {/* {!isTouchDevice && <CustomToggle transitionClasses={transitionClasses} currentTheme={currentTheme} changeIndex={(index: number) => setExperienceToggleIndex(index)} className="w-full justify-end" values={[<RiCarouselView size={24}/>, <Rows3/>]} selectedIndex={experienceToggleIndex}/>} */}
                            </div>
                            <div>
                                {
                                    experienceContent["experiences"].map((exp: any, index: number) => {
                                        const {company, role, description, dates, skills, reflection, json_model, json_model_cam_settings} = exp;
                                        const fov = json_model_cam_settings?.["fov"];
                                        const camPosition = json_model_cam_settings?.["camPosition"];

                                        return (
                                            <div key={`e-${index}`}>
                                                <ExperienceTimelineElem 
                                                    key={`e-${index}`}
                                                    transitionClasses={transitionClasses}
                                                    skills={skills}
                                                    currentTheme={currentTheme}
                                                    company={company}
                                                    role={role}
                                                    description={description}
                                                    dates={dates}
                                                    jsonModel={json_model}
                                                    jsonModelFov={fov}
                                                    jsonModelCamPosition={camPosition}
                                                    isModelVisible={true}
                                                    bio_header={experienceContent["bio_header"]}
                                                    reflection={reflection}
                                                    reflection_header={experienceContent["reflection_header"]}
                                                />
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>

                        {/* EDUCATION */}
                        <div ref={containerEducationRef} className="my-48">
                            <div className="flex items-center mb-12">
                                <div className="w-full">
                                    <h1 className="m-0">{educationContent["header"]}</h1>
                                </div>
                                {/* {!isTouchDevice && <CustomToggle transitionClasses={transitionClasses} currentTheme={currentTheme} changeIndex={(index: number) => setEducationToggleIndex(index)} className="w-full justify-end" values={[<RiCarouselView size={24}/>, <Rows3/>]} selectedIndex={educationToggleIndex}/>} */}
                            </div>
                            <div>
                                {
                                    educationContent["list"].map((edu: any, index: number) => {
                                        const {institution, certificate, relevant_coursework, activities, academic_projects, awards, bio, dates, media_url, json_model, json_model_cam_settings, skills} = edu;
                                        const fov = json_model_cam_settings?.["fov"];
                                        const camPosition = json_model_cam_settings?.["camPosition"];
                                        
                                        return (
                                            <EducationTimelineElem
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
                                                jsonModelFov={fov}
                                                jsonModelCamPosition={camPosition}
                                                skills={skills}
                                                isModelVisible={true}
                                                windowWidth={windowWidth}
                                            />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </main>
                    <footer className={`${currentTheme === "D" ? "bg-stone-800" : "bg-stone-400"} text-center ${transitionClasses} py-20`}>
                        <div className="lg:flex p-5">
                            <div className="md:w-full flex flex-col justify-center items-center">
                                <h1 className="text-6xl">{footerContent["header"]}</h1>
                                <h3 className="italic">{footerContent["subheader"]}</h3>
                                <div className="flex justify-center gap-4">
                                    {currentTheme === "D" && (
                                        <>
                                            <a 
                                                className="w-16 h-16 relative group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500" 
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
                                                className="w-16 h-16 relative group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500" 
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
                                                className="w-16 h-16 relative group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500" 
                                                href="mailto:kj.teo.work@gmail.com"
                                            >
                                                <Canvas3D autoRotateSpeed={0} voxelJson={email_dark} />
                                                <div className="absolute top-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-xl border pointer-events-none whitespace-nowrap bg-black text-white border-stone-700 opacity-0 scale-95 transition-all duration-150 ease-out group-hover:opacity-100 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:scale-100">
                                                    <p className="m-0">Send Email</p>
                                                </div>
                                            </a>

                                            <a 
                                                className="w-16 h-16 relative group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500" 
                                                href="/Teo_Kai_Jie_Kendrick_Resume.pdf"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Canvas3D autoRotateSpeed={0} camPosition={[0,5,30]} voxelJson={resume_dark} />
                                                <div className="absolute top-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-xl border pointer-events-none whitespace-nowrap bg-black text-white border-stone-700 opacity-0 scale-95 transition-all duration-150 ease-out group-hover:opacity-100 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:scale-100">
                                                    <p className="m-0">View Resume</p>
                                                </div>
                                            </a>
                                        </>
                                    )}
                                    {currentTheme === "L" && (
                                        <>
                                            <a 
                                                className="w-16 h-16 relative group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500" 
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
                                                className="w-16 h-16 relative group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500" 
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
                                                className="w-16 h-16 relative group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500" 
                                                href="mailto:kj.teo.work@gmail.com"
                                            >
                                                <Canvas3D autoRotateSpeed={0} voxelJson={email_light} />
                                                <div className="absolute top-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-xl border pointer-events-none whitespace-nowrap bg-white text-stone-900 border-stone-200 opacity-0 scale-95 transition-all duration-150 ease-out group-hover:opacity-100 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:scale-100">
                                                    <p className="m-0">Send Email</p>
                                                </div>
                                            </a>

                                            <a 
                                                className="w-16 h-16 relative group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500" 
                                                href="Teo_Kai_Jie_Kendrick_Resume.pdf"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Canvas3D autoRotateSpeed={0} camPosition={[0,5,30]} voxelJson={resume_light} />
                                                <div className="absolute top-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-xl border pointer-events-none whitespace-nowrap bg-white text-stone-900 border-stone-200 opacity-0 scale-95 transition-all duration-150 ease-out group-hover:opacity-100 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:scale-100">
                                                    <p className="m-0">View Resume</p>
                                                </div>
                                            </a>
                                        </>
                                    )}
                                </div>
                            </div>
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
                className="fixed! inset-0! pointer-events-none z-10"
                events={undefined}
                camera={{fov: 10, zoom: 0.5}}
            >
                <View.Port />
                <Preload all/>
            </Canvas>
        </div>
    )
}