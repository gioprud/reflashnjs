import database from '@/services/database'
import { Collection, ObjectId } from 'mongodb'
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

// get all subjects and number of cards for each subject

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) throw new Error('Not logged in')
    // @ts-ignore: Id is defined
    const user = new ObjectId(session.user.id);
    try {
        const collection = await database.getCollection('cards');
        const userSubjects = await collection.distinct('subject', {
            user_id: user
        })
        return NextResponse.json({ data: userSubjects });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Something went wrong' });
    }
}