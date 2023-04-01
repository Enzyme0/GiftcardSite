import { MongoClient, MongoClientOptions, Db } from "mongodb";
import { User } from "../classes/User";

const dburl: string  = 'mongodb://localhost:27017';
const mongoclient = new MongoClient(dburl);

//how do i make all these exportable?
//a: 



export async function connectToDb(): Promise<MongoClient> {
    const options: MongoClientOptions = {}; // Add any required MongoClientOptions here

    try {
        console.log(dburl)
        console.log('connecting to db')

        const client = await MongoClient.connect(dburl, options);
        return client;
    } catch (err) {
        throw err;
    }
}

export async function getDb() {
    return connectToDb().then((client) => {
        return mongoclient.db('giftcardwebsite');
    });
}

export async function getCollection(collectionName: string) {
    return getDb().then((db) => {
        return db.collection(collectionName);
    });
}

export async function insertOne(collectionName: string, document: any) {
    return getCollection(collectionName).then((collection) => {
        return collection.insertOne(document);
    });
}

export async function findOne(collectionName: string, query: any) {
    return getCollection(collectionName).then((collection) => {
        return collection.findOne(query);
    });
}

export async function getUser(userId: number) {
    const user = findOne('users', {id: userId})
    return user;
}


export async function addUser(user: User)
{
    //make sure no user with this id exists
    let userExists = await getUser(user.getId());
    if (userExists)
        throw new Error('User already exists');
    return insertOne('users', user);
}
//should set any new properties to values specified in the user object
export async function updateUser(user: User)
{
    return await getCollection('users').then(async (collection) =>{
        console.log('updating user');
        return await collection.updateOne({id: user.getId()}, {$set: 
        {
            name: user.getName(),
            email: user.getEmail(),
            password: user.getPassword(),
            balance: user.getBalance(),
            numberBought: user.getNumberBought(),
            isAdmin: user.getIsAdmin(),
            purchases: user.getPurchases()
        }
        });
    });
}

export async function numUsers() {
    return getCollection('users').then((collection) => {
        return collection.countDocuments();
    });
}
