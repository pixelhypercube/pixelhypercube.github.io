interface CustomToggleProps {
    values?: Array<any>;
    className?: string;
    selectedIndex: number;
    changeIndex?: any;
    currentTheme: string;
    iconSize?: number;
    transitionClasses?: string;
}


export default function CustomToggle({values, selectedIndex, className, changeIndex, currentTheme, transitionClasses} : CustomToggleProps) {
    return (
        <div className={`flex w-full ${className}`}>
            {values?.map((item : any, index: number)=>{
                return (
                    <div 
                    onClick={()=>changeIndex(index)}
                    key={`toggle-item-${index}`} 
                    className={`p-1 ${currentTheme==="D" ? "border-stone-200" : "border-stone-800"} border-t-2 border-b-2 ${selectedIndex==index ? (currentTheme==="D" ? "bg-stone-200" : "bg-stone-800") : ""} ${index==0 ? "rounded-l-full border-l-2" : ""} ${index==values.length-1 ? "rounded-r-full border-r-2" : ""}
                     ${transitionClasses}`}>
                        <div className={`${selectedIndex==index ? (currentTheme==="D" ? "text-stone-800" : "text-stone-200") : (currentTheme==="D" ? "text-stone-200" : "text-stone-800")}`}>{item}</div>
                    </div>
                )
            })}
        </div>
    )
}