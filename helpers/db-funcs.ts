import { MongoClient, MongoClientOptions, Db } from "mongodb";
import { User } from "../classes/User";
import { Giftcard } from "../classes/Giftcard";

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
/**
 * @returns basic info about the site e.g user count, sales, etc (Returns document in the form of)
 */
export async function getMeta()
{
    //final format
    /*
    {
        numUsers: 0,
        giftcards: [{id: 0, name: 'name', image: "https://example.com/image.png" priceInCents: 0, numSold: 0, numAvailable: 0, stars: 0}, ...],
        grossSales: 0,
        netSales: 0,
    }
    */
    let meta = {
        numbUsers: 0,
        giftcards: [] as any[],
        grossSales: 0,
        netSales: 0
    }
    //get num users and num sales, will be document called 'meta' with the fields 'numUsers' and 'numSales'
    let numbUsers = await numUsers();
    meta.numbUsers = numbUsers;
    //get giftcards
    let giftcards = await getCollection('giftcards').then((collection) => {
        return collection.find({}).toArray();
    });
    meta.giftcards = giftcards;
    //get gross sales
    let grossSales = 0;
    for (let i = 0; i < giftcards.length; i++)
    {
        grossSales += giftcards[i].numSold * giftcards[i].priceInCents;
    }
    meta.grossSales = grossSales;
    //get net sales
    let netSales = 0;
    for (let i = 0; i < giftcards.length; i++)
    {
        netSales += giftcards[i].numSold * giftcards[i].priceInCents * 0.9;
    }
    return meta;
}

export async function getGiftcard(id: number)
{
    return getCollection('giftcards').then((collection) => {
        return collection.findOne({id: id});
    });
}

async function numGiftcards()
{
    return getCollection('giftcards').then((collection) => {
        return collection.countDocuments();
    });
}
export async function getGiftcardIndex(id: number) : Promise<Giftcard>
{
    //get the index of the giftcard with the specified id
    let giftcards = await getCollection('giftcards').then((collection) => {
        return collection.find({}).toArray();
    });
    //turn into giftcard object
    for (let i = 0; i < giftcards.length; i++)
    {
        if (giftcards[i].id == id)
            return new Giftcard(giftcards[i].id, giftcards[i].name, giftcards[i].image, giftcards[i].priceInCents, giftcards[i].numSold, giftcards[i].numAvailable, giftcards[i].stars);
    }
    throw new Error('Giftcard not found');
}
export async function addGiftcard(giftcard: Giftcard)
{
    //add a giftcard and verify that it doesn't already exist + it has all the required fields
    //id is automatically generated by length of giftcards array
    let giftcards = await getCollection('giftcards').then((collection) => {
        return collection.find({}).toArray();
    });
    //check if giftcard already exists
    for (let i = 0; i < giftcards.length; i++)
    {
        if (giftcards[i].id == giftcard.getId())
            throw new Error('Giftcard already exists');
    }
    //check if giftcard has all required fields
    if (!giftcard.getName() || !giftcard.getImage() || !giftcard.getPriceInCents() || !giftcard.getNumSold() || !giftcard.getNumAvailable() || !giftcard.getStars())
        throw new Error('Giftcard does not have all required fields');
    //add giftcard
    return insertOne('giftcards', giftcard);
}