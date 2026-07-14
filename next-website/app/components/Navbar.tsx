import { ChevronsLeftRight, ChevronsRightLeft, Menu, Moon, Sun, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Ref } from "react";
import {content} from "../globals";

interface NavItem {
    id?: string;
    type: "link" | "dropdown" | "toggle";
    selectedLanguage?: string;
    transitionClasses?: string;
    currentTheme?: string;
    minSizeVisibility?: number;
    maxSizeVisibility?: number;
    
    mobileHovering?:boolean;

    // passed from parent
    isVisible?: boolean;
}

type ActionCallback = (value?: any) => void;

export interface ItemLinkProps extends NavItem {
    type: "link";
    name: string;
    link?: string;
    stylized: boolean; // for special items like home
    imageUrl?: string;
    action?: ActionCallback;
    isSelected?: boolean;
}

export interface ItemDropdownProps extends NavItem {
    type: "dropdown";
    // name: string;
    values: Array<any>;
    selectedValue: any; // current selected value
    action?: ActionCallback;
    showValues: boolean;
}

export interface ItemToggleProps extends NavItem {
    type: "toggle";
    values: Array<any>;
    selectedIndex: number; // current selected value
    action?: ActionCallback;
    showIcons: boolean;
}

// discriminated union type for array items
export type NavItemProps = ItemLinkProps | ItemDropdownProps | ItemToggleProps;

interface NavbarCallbacks {
    setScrollPosHome?: () => void;
    setScrollPosAboutMe?: () => void;
    setScrollPosSkills?: () => void;
    setScrollPosProjects?: () => void;
    setScrollPosExperience?: () => void;
    setScrollPosEducation?: () => void;
    onThemeToggle?: (str: string) => void;
    onLayoutWidthToggle?: (str: string) => void;
    onLanguageChange?: (lang: string) => void;
}

const getItemsLeft = (callbacks: NavbarCallbacks, selectedLanguage: string) : NavItemProps[] => [
    { id: "home", type: "link", name: content[selectedLanguage]["navbar"]["home"], link: "/", stylized: true, imageUrl:`./logo_${selectedLanguage}.svg`, action: callbacks.setScrollPosHome }
];

const getItemsCenter = (callbacks: NavbarCallbacks, selectedLanguage: string) : NavItemProps[] => [
    { id: "about_me", type: "link", name: content[selectedLanguage]["navbar"]["about_me"], link: "/", stylized: false, action: callbacks.setScrollPosAboutMe },
    { id: "skills", type: "link", name: content[selectedLanguage]["navbar"]["skills"], link: "/", stylized: false, action: callbacks.setScrollPosSkills },
    { id: "projects", type: "link", name: content[selectedLanguage]["navbar"]["projects"], link: "/", stylized: false, action: callbacks.setScrollPosProjects },
    { id: "experience", type: "link", name: content[selectedLanguage]["navbar"]["experience"], link: "/", stylized: false, action: callbacks.setScrollPosExperience },
    { id: "education", type: "link", name: content[selectedLanguage]["navbar"]["education"], link: "/", stylized: false, action: callbacks.setScrollPosEducation },
    // { id: "blogs", type: "link", name: content[selectedLanguage]["navbar"]["blogs"], link: "/blogs", stylized: false },
];

const getItemsRight = (callbacks: NavbarCallbacks, selectedLanguage: string) : NavItemProps[] => [
    // {
    //     id: "lang",
    //     type: "dropdown",
    //     selectedValue: ["en", "English"],
    //     values: [["en", "English"], ["zh-Hans", "简体中文"], ["zh-Hant", "繁體中文"], ["ja","日本語"]],
    //     action: callbacks.onLanguageChange,
    //     showValues:true,
    // },
    {
        id: "theme",
        type: "toggle",
        selectedIndex: 0, // 0 for 'D', 1 for 'L'
        values: [["D",(<Moon/>)], ["L",(<Sun/>)]],
        action: callbacks.onThemeToggle,
        showIcons:true,
    },
    {
        id: "width",
        type: "toggle",
        selectedIndex: 0, // 0 for 'D', 1 for 'L'
        values: [["N",(<ChevronsLeftRight/>)], ["W",(<ChevronsRightLeft/>)]],
        action: callbacks.onLayoutWidthToggle,
        showIcons:true,
        minSizeVisibility:1280, // only visible on xl
    }
];

function ItemLink({
    name, link, stylized, imageUrl, action, isSelected, transitionClasses, currentTheme, minSizeVisibility, maxSizeVisibility, isVisible, mobileHovering
} : Omit<ItemLinkProps, 'type'>) {
    const styles = (stylized) ? 
    `${currentTheme==="D" ? "bg-stone-900/80" : "bg-stone-400/80"} block backdrop-blur-lg border border-white/20 text-3xl rounded-full w-14 h-14 flex justify-center items-center font-extrabold` : 
    // "block p-3 bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl m-1";
    `text-lg ${!mobileHovering ? "hover:font-bold" : ""}`;

    const highlightBorderColorClasses = currentTheme==="D" ? "border-amber-300" : "border-amber-700";
    const highlightTextColorClasses = currentTheme==="D" ? "text-amber-300" : "text-amber-700";
    
    const highlightIconBorderColorClasses = currentTheme==="D" ? "border-stone-300" : "border-stone-700";

    const hoverColorClasses = currentTheme==="D" ? "hover:bg-black/15" : "hover:bg-white/15";

    return <div className={`mx-3 ${mobileHovering ? `${hoverColorClasses} py-2` : ""} ${isVisible ? "block" : "hidden"} rounded-xl transition-colors duration-150 ease-in-out`}>
        {
            usePathname() !== link ? 
            <a onClick={()=>action?.()} className={`${styles} ${transitionClasses} ${isSelected ? `${highlightIconBorderColorClasses} border-4` : ""}`} href={link ? link : "#"}>{imageUrl ? <img className="w-1/2" alt={name} src={imageUrl}/> : name}</a> :
            <div onClick={()=>action?.()} className={`${styles} ${transitionClasses} ${isSelected ? highlightTextColorClasses : ""} cursor-pointer select-none`}>{imageUrl ? <img className="w-1/2" alt={name} src={imageUrl}/> : name}</div>
        }
        <hr className={`${isSelected ? "w-full" : "w-0 opacity-0"} transition-all duration-500 ${highlightBorderColorClasses} border-[1.75px]`}/>
    </div>
}

function ItemDropdown({
    values, showValues, action, transitionClasses, currentTheme, minSizeVisibility, maxSizeVisibility, isVisible
} : Omit<ItemDropdownProps, 'type'>) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedKey, setSelectedKey] = useState(values[0]?.[0] || "");
    const dropdownRef = useRef<HTMLDivElement>(null);

    const currentItem = values.find(([key]) => key === selectedKey);
    const displayLabel = currentItem ? (showValues ? currentItem[1] : currentItem[0]) : "";

    // close when clicked outside
    useEffect(()=>{
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    },[]);

    return (
        <div className={`relative flex items-center ${isVisible ? "block" : "hidden"} rounded-xl`}>
            <button 
            type="button"
            className="pl-3 py-2 pr-8 bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl m-1 appearance-none"
            onClick={()=>setIsOpen(!isOpen)}
            >
                {displayLabel}
            </button>

            <div className="absolute right-3 pointer-events-none flex items-center text-white/60">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            {isOpen && (
                <ul className="absolute top-full left-0 min-w-35 bg-black backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    {values.map((item: any,index: number)=>{
                        const [key,val] = item;
                        const isSelected = key===selectedKey;

                        return (
                            <li key={index}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSelectedKey(key);
                                        action?.(key);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full text-left px-3 py-2 text-xs rounded-xl transition-colors font-medium ${
                                        isSelected 
                                            ? "bg-white/20 text-white" 
                                            : "text-white/80 hover:bg-white/10 hover:text-white"
                                    }`}
                                >
                                    {showValues ? val : key}
                                </button>
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}

// function ItemDropdown({
//     values, showValues, action
// } : Omit<ItemDropdownProps, 'type'>) {
//     return (
//         <div className="relative flex items-center">
//             <select className="pl-3 py-2 pr-8 bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl m-1 appearance-none" 
//             onChange={(v)=>{
//                 action?.(v.target.value);
//             }}> 
//                 {
//                     values.map((item,index)=>{
//                         const [key, val] = item;
//                         return (
//                             <option key={index} value={key}>{showValues ? val : key}</option>
//                         )
//                     })
//                 }
//             </select>

//             <div className="absolute right-3 pointer-events-none flex items-center text-white/60">
//                 <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                 </svg>
//             </div>
//         </div>
//     )
// }

function ItemToggle({
    values, selectedIndex = 1, showIcons = false, action, transitionClasses, currentTheme, minSizeVisibility, maxSizeVisibility, isVisible
} : Omit<ItemToggleProps, 'type'>) {
    const [currentIndex, setCurrentIndex] = useState<number>(selectedIndex);
    const [name, icon] = values[selectedIndex];

    const [currentName, setCurrentName] = useState<string>(name);
    const [currentIcon, setCurrentIcon] = useState<any>(icon);

    return (
        <button className={`p-2 bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl m-1 ${isVisible ? "flex" : "hidden"} rounded-xl`} 
        onClick={()=>{
            const nextIndex = (currentIndex + 1) % values.length;
            setCurrentIndex(nextIndex);
            
            // change new curr name and new curr icon
            const [newName, newIcon] = values[nextIndex];
            setCurrentName(newName);
            setCurrentIcon(newIcon);
            
            action?.(newName);
        }}>
            {
                showIcons ? 
                currentIcon : 
                currentName
            }
        </button>
    )
}


// STANDARDIZED RENDERER COMPONENT

function NavItemRenderer({ item, selectedLanguage, isSelected, transitionClasses, currentTheme, windowWidth, mobileHovering }: { item: NavItemProps; selectedLanguage?: string; isSelected?: boolean, transitionClasses?: string, currentTheme?: string, windowWidth: number, mobileHovering?: boolean}) {

    let isVisible = true;
    if (item.minSizeVisibility !== undefined) isVisible = windowWidth >= item.minSizeVisibility;
    if (item.maxSizeVisibility !== undefined) isVisible = windowWidth < item.maxSizeVisibility;

    switch (item.type) {
        case "link":
            return <ItemLink mobileHovering={mobileHovering} isVisible={isVisible} currentTheme={currentTheme} transitionClasses={transitionClasses} isSelected={isSelected} selectedLanguage={selectedLanguage} imageUrl={item.imageUrl} stylized={item.stylized} name={item.name} link={item.link} action={item.action} />;
        case "dropdown":
            return <ItemDropdown mobileHovering={mobileHovering} isVisible={isVisible} currentTheme={currentTheme} transitionClasses={transitionClasses} selectedLanguage={selectedLanguage} showValues={item.showValues} values={item.values} selectedValue={item.selectedValue} action={item.action} />;
        case "toggle":
            return <ItemToggle mobileHovering={mobileHovering} isVisible={isVisible} currentTheme={currentTheme} transitionClasses={transitionClasses} selectedLanguage={selectedLanguage} showIcons={item.showIcons} values={item.values} selectedIndex={item.selectedIndex} action={item.action} />;
        default:
            return null;
    }
}

interface NavbarProps {
    scrollY?: number,
    callbacks?: NavbarCallbacks,
    selectedLanguage: string,
    currentTheme: string,
    transitionClasses?: string,
    currentPos?: string,
    ref?:Ref<HTMLElement> | undefined;
}

export default function Navbar({
    scrollY = 0,
    callbacks = {},
    selectedLanguage,
    currentTheme,
    transitionClasses,
    currentPos,
    ref
} : NavbarProps) {

    const itemsLeft = getItemsLeft(callbacks, selectedLanguage);
    const itemsCenter = getItemsCenter(callbacks, selectedLanguage);
    const itemsRight = getItemsRight(callbacks, selectedLanguage);

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const [windowWidth, setWindowWidth] = useState<number>(0);

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <nav ref={ref} className={`
        z-50 flex justify-around m-10 p-5 ${currentTheme==="D" ? "bg-black/30 text-white" : "bg-white/30 text-black"} backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl justify-self-center w-8/9 fixed top-0 ${transitionClasses}`}>
            <div className="flex justify-start items-center">
                {
                    itemsLeft.map((item: any,index : number)=>(
                        <NavItemRenderer mobileHovering={false} windowWidth={windowWidth} currentTheme={currentTheme} isSelected={currentPos===item.id} selectedLanguage={selectedLanguage} key={`left-${index}`} item={item}/>
                    ))
                }
            </div>
            <div className="hidden lg:flex justify-center items-center">
                {
                    itemsCenter.map((item: any,index : number)=>(
                        <NavItemRenderer mobileHovering={false} windowWidth={windowWidth} currentTheme={currentTheme} isSelected={currentPos===item.id} selectedLanguage={selectedLanguage} key={`center-${index}`} item={item}/>
                    ))
                }
            </div>
            <div className="hidden lg:flex justify-end items-center">
                {
                    itemsRight.map((item: any,index : number)=>(
                        <NavItemRenderer mobileHovering={false} windowWidth={windowWidth} currentTheme={currentTheme} isSelected={currentPos===item.id} selectedLanguage={selectedLanguage} key={`right-${index}`} item={item}/>
                    ))
                }
            </div>

            <div className="flex lg:hidden items-center">
                <button 
                    className="p-3 bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl ml-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* MOBILE MENU DROPDOWN */}
            {isMobileMenuOpen && (
                <div className={`absolute top-[110%] left-0 w-full flex flex-col p-5 ${currentTheme==="D" ? "bg-stone-800/90" : "bg-stone-200/90"} backdrop-blur-3xl border border-white/20 shadow-xl rounded-2xl lg:hidden gap-4`}>
                    {/* Center Items for Mobile */}
                    <div className="flex flex-col items-center gap-2 w-full">
                        {itemsCenter.map((item: any, index: number) => (
                            <div key={item.id || `mob-center-${index}`} className="w-full text-center" onClick={() => setIsMobileMenuOpen(false)}>
                                <NavItemRenderer 
                                mobileHovering={true}
                                windowWidth={windowWidth}
                                item={item}/>
                            </div>
                        ))}
                    </div>
                    
                    <hr className="border-white/20 w-full" />
                    
                    {/* Right Items (Settings) for Mobile */}
                    <div className="flex justify-center items-center gap-4 w-full">
                        {itemsRight.map((item: any, index: number) => (
                            <NavItemRenderer 
                            mobileHovering={true}
                            windowWidth={windowWidth}
                            key={item.id || `mob-right-${index}`} 
                            item={item}/>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    )
}