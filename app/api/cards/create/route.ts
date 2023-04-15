import database from '@/services/database'
import { Collection, Int32, ObjectId } from 'mongodb'
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

type CardBody = {
    front: string;
    back: string;
    chapter: Int32;
    subject: string;
    due_date: Date;
    seen: boolean;
}


export async function POST(request: Request) {
    // Process a POST request
    // Create a new card
    const session = await getServerSession(authOptions);
    // @ts-ignore
    const user = new ObjectId(session.user.id);
    try {
        const body = await request.json() as CardBody;
        const { subject, front, back, chapter } = body;
        if (!subject || !front || !back || !chapter) {
            return NextResponse.json({ error: 'Missing subject, front, or back' });
        }
        const parsedChapter = parseInt(chapter.toString(), 10);
        const parChapter= new Int32(parsedChapter);
        const cardRes = await database.createCard(subject, front, back, parChapter, user);
        return NextResponse.json({ data: cardRes });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Something went wrong' });
    }
}