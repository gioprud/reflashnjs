import database from '@/services/database'
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function PUT(request: Request){
    // Process a PUT request
    // divide interval by 3
    // change date to today + 5 minutes
    const session = await getServerSession(authOptions);
    // @ts-ignore
    const interval = new session.user.interval / 3;
    const now = new Date();
    const date = new Date(now.getTime() + 5 * 60000);
    try {
        const { cardId } = await request.json();
        if (!cardId) {
            return NextResponse.json({ error: 'Missing cardId' });
        }
        const cardRes = await database.updateIntervalCorrect(cardId, interval, date);
        return NextResponse.json({ data: cardRes });
    } catch (error) {  
        console.error(error);
        return NextResponse.json({ error: 'Something went wrong' });
    }
}