import database from '@/services/database'
import type { Collection } from 'mongodb'
import { NextResponse } from 'next/server';

type RegisterBody = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
}
// https://beta.nextjs.org/docs/routing/route-handlers


export async function POST(request: Request) {
  // Process a POST request
  // Register a new user
  try {
    const body = await request.json() as RegisterBody;
    const { username, password } = body;
    if (!username || !password) {
      return NextResponse.json({ error: 'Missing username or password' });
    }
    const extraUserData = {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email
    }
    const registrationRes = await database.userRegister(username, password, extraUserData);
    return NextResponse.json({ data: registrationRes });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' });
  }
}