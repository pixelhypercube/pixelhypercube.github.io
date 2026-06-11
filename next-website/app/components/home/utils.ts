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

// STRAVA API

export const getRunningData = async () => {
    try {
        const res = await GET(new Request(`https://www.strava.com/oauth/authorize?client_id=${process.env.STRAVA_CLIENT_ID}&response_type=code&redirect_uri=http://localhost&approval_prompt=force&scope=read_all,activity:read_all`));
        return res;
    } catch (e) {
        return e;
    }
}