import database from '@/services/database'
import type { Collection } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'

type UserResponse = {
  name: string
}


// Documentation on API routes: https://nextjs.org/docs/api-routes/introduction

// Typescript typings: https://nextjs.org/docs/basic-features/typescript#api-routes

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST': {
      
      return;
    }
    default: {
      // Handle any other HTTP method
      res.status(200).json({ name: 'John Doe' })
      return;
    }
  }
}

export async function POST(request: Request) {

  // Process a POST request
  // Login as a user
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ error: 'Missing username or password' });
      return;
    }
    const user = await database.userLogin(req.body.username, req.body.password);
    if (!user) {
      res.status(401).json({ user: false });
      return;
    }
    res.status(200).json({ user })
    // Valid login: return user object
    // Invalid login: return { user: false }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as any).message });
  }
}
