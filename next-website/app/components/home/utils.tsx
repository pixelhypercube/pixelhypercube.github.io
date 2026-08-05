import { GET } from "@/app/api/strava/route";

export const renderDate = (date : Date) => {
    // capitalize 1st letter lmao :P
    let dateStr = date.toLocaleDateString('en-US', { 
            year:"numeric",
            month:"short"
        }).toLowerCase();
    dateStr = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
    return dateStr;
};

export const renderFullDate = (date: Date) => {
    let dateStr = date.toLocaleDateString('en-US', {
        year:"numeric",
        month:"short",
        day:"2-digit"
    }).toLowerCase();
    return dateStr;
}

export const renderBioText = (text: string) => {
    return text
    .split('\n\n')
    .map((para: string, index: number)=>{
        const tokens = para.split(/\*(.*?)\*/g);
        return (
            <p className="text-md font-light mb-4" key={`desc-${index}`}>
                {tokens.map((token: string, tokenIndex: number) => {
                    if (tokenIndex%2 === 1) {
                        return (
                            <strong 
                                key={`bold-${tokenIndex}`} 
                                className={`font-semibold transition-colors duration-200`}
                            >
                                {token}
                            </strong>
                        );
                    }
                    return token;
                })}
            </p>
        )
    })
}

// STRAVA API

export const getRunningData = async () => {
    try {
        const res = await GET(new Request(`https://www.strava.com/oauth/authorize?client_id=${process.env.STRAVA_CLIENT_ID}&response_type=code&redirect_uri=http://localhost&approval_prompt=force&scope=read_all,activity:read_all`));
        return res;
    } catch (e) {
        return e;
    }
}
