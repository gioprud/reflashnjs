
import {
    Collection,
    MongoClient,
    ObjectId,
    UpdateFilter,
    WithId
} from 'mongodb';
import bcrypt from 'bcrypt';

export type User = {
    username: string;
    password: string;
    registration: Date;
    firstName: string;
    lastName: string;
    email: string;
}

export type Card = {
    front: string;
    back: string;
    chapter: number;
    id: number;
    due_date: Date;
    seen: boolean;
    user_id: ObjectId;
}

if (!process.env.NAMESPACE) throw new Error('No NAMESPACE env var set');
if (!process.env.MONGO_URI) throw new Error('No MONGO_URI env var set');

class Database {
    private connecting?: Promise<MongoClient>;

    public async getClient() {
        // We use this method to make sure that if this function is called multiple times we only connect once
        if (this.connecting) return this.connecting;
        this.connecting = new Promise<MongoClient>(async (resolve) => {
            const mongoUri = process.env.MONGO_URI;
            if (!mongoUri) throw new Error('No mongo_uri in connection call');
            console.debug('Connecting to MongoDB');
            const client = new MongoClient(mongoUri);
            await client.connect();
            console.debug('Connection established to mongo, pinging admin DM');
            await client.db('admin').command({ ping: 1 });
            console.debug('Connected successfully to database');
            resolve(client);
        });
        return this.connecting;
    }

    async ping() {
        const client = await this.getClient();
        // Check how long it takes to ping the database
        const start = performance.now();
        await client.db('admin').command({ ping: 1 });
        const end = performance.now();
        const duration = end - start;
        return duration;
    }

    async getUserById(id: string) {
        const client = await this.getClient();
        const db = client.db(process.env.NAMESPACE);
        const collection: Collection<User> = db.collection('users');
        return collection.findOne({ _id: new ObjectId(id) });
    }

    async userLogin(username: string, password: string) {
        const client = await this.getClient();
        const db = client.db(process.env.NAMESPACE);
        const collection: Collection<User> = db.collection('users');
        const user = await collection.findOne({ username });
        if (!user) return false;
        const result = await bcrypt.compare(password, user.password);
        if (!result) return false;
        return user;
    }

    async userRegister(username: string, password: string, data: Pick<User, 'firstName' | 'lastName' | 'email'>) {
        const client = await this.getClient();
        const db = client.db(process.env.NAMESPACE);
        const collection: Collection<User> = db.collection('users');
        // Check if user already exists
        const existingUser = await collection.findOne({ username });
        if (existingUser) throw new Error('User already exists');
        const hash = await bcrypt.hash(password, 10);
        const result = await collection.insertOne({
            username,
            password: hash,
            registration: new Date(),
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName
        });
        return result.insertedId;
    }
    
    async createCard(data: Card, user_id: ObjectId) {
        const client = await this.getClient();
        const db = client.db(process.env.NAMESPACE);
        const collection: Collection<Card> = db.collection('cards');
        const result = await collection.insertOne({
            front: data.front,
            back: data.back,
            chapter: data.chapter,
            id: data.id,
            due_date: data.due_date,
            seen: data.seen,
            user_id: user_id
        });
        return result.insertedId;
    }

    async getLatestCards(userid: string) {
        const client = await this.getClient();
        const db = client.db(process.env.NAMESPACE);
        const collection: Collection<Card> = db.collection('cards');
        const result = await collection.find({user_id: new ObjectId(userid)}).sort({ dueDate: 1 }).toArray();
        return result;
    }
}

export default new Database();
