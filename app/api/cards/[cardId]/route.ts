import database from '@/services/database'
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";


export async function GET(request: Request, { params }: {
    params: {
        cardId: string;
    };
}){
    // Process a GET request
    const session = await getServerSession(authOptions);
    const { cardId } = params;
    const card = await database.getCardById(cardId);
    if (!card) return NextResponse.json({ error: 'Card does not exist'});
    // @ts-ignore: This field does exist
    if (!card.user_id?.equals(session?.user?.id)) {
        return NextResponse.json({ error: 'Card does not belong to you'});
    }
    return NextResponse.json({ data: card });
}

export async function PUT(request: Request, { params }: {
    params: {
        cardId: string;
    };
}){
    // Process a PUT request
    const session = await getServerSession(authOptions);
    const { cardId } = params;
    const body = await request.json();
    const originalCard = await database.getCardById(cardId);
    if (!originalCard) return NextResponse.json({ error: 'Card does not exist'});
    // @ts-ignore: This user id does exist
    if (!originalCard.user_id?.equals(session?.user?.id)) {
        return NextResponse.json({ error: 'Card does not belong to you'});
    }
    if (body._id) delete body._id;
    if (body.user_id) delete body.user_id;
    if (body.due_date) body.due_date = new Date(body.due_date);
    
    await database.updateCard(cardId, body);
    return NextResponse.json({ status: 'Success' });
}


export async function DELETE(request: Request, { params }: {
    params: {
        cardId: string;
    };
}){
    // Process a DELETE request
    const session = await getServerSession(authOptions);
    const { cardId } = params;
    const originalCard = await database.getCardById(cardId);
    if (!originalCard) return NextResponse.json({ error: 'Card does not exist'});
    // @ts-ignore: This user id does exist
    if (!originalCard.user_id?.equals(session?.user?.id)) {
        return NextResponse.json({ error: 'Card does not belong to you'});
    }
    await database.deleteCard(cardId);
    return NextResponse.json({ status: 'Success' });
}
