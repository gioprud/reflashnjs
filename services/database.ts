
import {
    Collection,
    Int32,
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
    interval: number;
    due_date: Date;
    seen: boolean;
    user_id: ObjectId;
    subject: string;
}

if (!process.env.NAMESPACE) throw new Error('No NAMESPACE env var set');
if (!process.env.MONGO_URI) throw new Error('No MONGO_URI env var set');

class Database {
    private connecting?: Promise<MongoClient>;

    public async getClient() {
        // use this method to make sure that if this function is called multiple times we only connect once
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

    // Function overloading
    async getCollection(name: 'users'): Promise<Collection<User>>
    async getCollection(name: 'cards'): Promise<Collection<Card>>
    async getCollection(name: string): Promise<Collection<Record<string, unknown>>>
    async getCollection(name: string): Promise<Collection<any>> {
        const client = await this.getClient();
        const db = client.db(process.env.NAMESPACE);
        const collection: Collection<User> = db.collection(name);
        return collection;
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
        const collection = await this.getCollection('users')
        return collection.findOne({ _id: new ObjectId(id) });
    }

    async userLogin(username: string, password: string) {
        const collection = await this.getCollection('users')
        // Check if user exists
        const user = await collection.findOne({ username });
        if (!user) return false;
        // Check if password is correct
        const result = await bcrypt.compare(password, user.password);
        if (!result) return false;
        return user;
    }

    async userRegister(username: string, password: string, data: Pick<User, 'firstName' | 'lastName' | 'email'>) {
        const collection = await this.getCollection('users')
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
    
    async createCard(subject: string, front: string, back: string, chapter: number, user_id: ObjectId) {
        const collection = await this.getCollection('cards');
        const result = await collection.insertOne({
            front,
            back,
            subject,
            chapter,
            interval: 1,
            due_date: new Date(),
            seen: false,
            user_id: new ObjectId(user_id)
        });
        return result.insertedId;
    }

    async getLatestCards(userid: string) {
        const collection = await this.getCollection('cards');
        const result = await collection.find({user_id: new ObjectId(userid)}).sort({ dueDate: 1 }).toArray();
        return result;
    }

    async getCardsBySubject(userid: string, subject: string) {
        const collection = await this.getCollection('cards');
        const result = await collection.find({user_id: new ObjectId(userid), subject}).sort({ dueDate: 1 }).toArray();
        return result;
    }

    async getCardsByChapter(userid: string, subject: string, chapter: number) {
        const collection = await this.getCollection('cards');
        const result = await collection.find({user_id: new ObjectId(userid), subject, chapter}).sort({ dueDate: 1 }).toArray();
        return result;
    }

    //gets a card by id
    async getCardById(cardid: string) {
        const collection = await this.getCollection('cards');
        const result = await collection.findOne({_id: new ObjectId(cardid)});
        return result;
    }

    //updates a card by id
    async updateCard(cardid: string, data: Partial<Card>) {
        const collection = await this.getCollection('cards');
        const result = await collection.updateOne({_id: new ObjectId(cardid)}, {$set: data});
        return result.modifiedCount;
    }

    //deletes a card by id
    async deleteCard(cardid: string) {
        const collection = await this.getCollection('cards');
        const result = await collection.deleteOne({_id: new ObjectId(cardid)});
        return result.deletedCount;
    }

    //returns all subjects for a given user
    async getSubjects(userid: ObjectId) {
        const collection = await this.getCollection('cards');
        const result = await collection.distinct('subject', {user_id: new ObjectId(userid)});
        return result;
    }

    //returns all chapters for a given subject
    async getChapters(userid: ObjectId, subject: string) {
        const collection = await this.getCollection('cards');
        const result = await collection.distinct('chapter', {user_id: new ObjectId(userid), subject});
        return result;
    }

    //returns cards that are due today
    async getCardsByDueDate(userid: ObjectId, date: Date) {
        const collection = await this.getCollection('cards');
        const result = await collection.find({user_id: new ObjectId(userid), due_date: {$lte: date}}).sort({ dueDate: 1 }).toArray();
        return result;
    }

    //returns number of cards in database
    async getCardCount(userid: string) {
        const collection = await this.getCollection('cards');
        const result = await collection.countDocuments({user_id: new ObjectId(userid)});
        return result;
    }

    //updates card interval
    async updateCardInterval(cardid: string, interval: number) {
        const collection = await this.getCollection('cards');
        const result = await collection.updateOne({_id: new ObjectId(cardid)}, {$set: {interval}});
        return result.modifiedCount;
    }

    //updates card due date
    async updateCardDueDate(cardid: string, due_date: Date) {
        const collection = await this.getCollection('cards');
        const result = await collection.updateOne({_id: new ObjectId(cardid)}, {$set: {due_date}});
        return result.modifiedCount;
    }

    //marks card as seen
    async updateCardSeen(cardid: string, seen: boolean) {
        const collection = await this.getCollection('cards');
        const result = await collection.updateOne({_id: new ObjectId(cardid)}, {$set: {seen}});
        return result.modifiedCount;
    }
    //returns number of cards in database by subject
    async getCardCountBySubject(userid: ObjectId, subject: string[]) {
        const collection = await this.getCollection('cards');
        const result = await collection.countDocuments({user_id: new ObjectId(userid), subject});
        return result;
    }
    
    async getCardCountByChapter(userid: string, subject: string, chapter: number) {
        const collection = await this.getCollection('cards');
        const result = await collection.countDocuments({user_id: new ObjectId(userid), subject, chapter});
        return result;
    }

    async updateIntervalCorrect(cardid: string, interval: number, date: Date) {
        const collection = await this.getCollection('cards');
        const result = await collection.updateOne({_id: new ObjectId(cardid)}, {$set: {interval}});
        return result.modifiedCount;
    }
}

export default new Database();
