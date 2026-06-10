import { NextResponse } from "next/server";

async function getAccessToken() {
    const res = await fetch("https://www.strava.com/oauth/token", {
        method:"POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify({
            client_id: process.env.STRAVA_CLIENT_ID,
            client_secret: process.env.STRAVA_CLIENT_SECRET,
            refresh_token: process.env.STRAVA_REFRESH_TOKEN,
            grant_type: 'refresh_token',
        })
    });

    if (!res.ok) throw new Error("Failed to refresh Strava access token");

    const data = await res.json();
    return data.access_token;
}

export async function GET(req: Request) {
    try {
        const accessToken = await getAccessToken();

        const response = await fetch('https://www.strava.com/api/v3/athlete', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Failed to fetch athlete profile from Strava' },
                { status: response.status }
            );
        }

        const athleteData = await response.json();
        return NextResponse.json(athleteData);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}