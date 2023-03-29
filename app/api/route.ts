import { NextResponse } from 'next/server';

export async function GET() {

  const data = { name: 'John Doe' }

  return NextResponse.json({ data })
}