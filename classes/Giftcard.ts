//import db, purchase, user
import { WithId } from 'mongodb';
import * as db from '../helpers/db-funcs';
import { Purchase } from './Purchase';
import { User } from './User';


export interface Giftcard {
    id: number,
    name: string,
    image: string,
    priceInCents: number,
    numSold: number,
    numAvailable: number,
    stars: number



}

export class Giftcard
{
    public id: number;
    public name: string;
    public image: string;
    public priceInCents: number;
    public numSold: number;
    public numAvailable: number;
    public stars: number;
    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getImage(): string {
        return this.image;
    }

    public setImage(image: string): void {
        this.image = image;
    }

    public getPriceInCents(): number {
        return this.priceInCents;
    }

    public setPriceInCents(priceInCents: number): void {
        this.priceInCents = priceInCents;
    }

    public getNumSold(): number {
        return this.numSold;
    }

    public setNumSold(numSold: number): void {
        this.numSold = numSold;
    }

    public getNumAvailable(): number {
        return this.numAvailable;
    }

    public setNumAvailable(numAvailable: number): void {
        this.numAvailable = numAvailable;
    }

    public getStars(): number {
        return this.stars;
    }

    public setStars(stars: number): void {
        this.stars = stars;
    }



    constructor(id? : number, name? : string, image? : string, priceInCents? : number, numSold? : number, numAvailable? : number, stars? : number)
    {
        this.id = id || 0;
        this.name = name || '';
        this.image = image || '';
        this.priceInCents = priceInCents || 0;
        this.numSold = numSold || 0;
        this.numAvailable = numAvailable || 0;
        this.stars = stars || 0;
    }

    public async getPurchaseHistory(): Promise<Purchase[]>
    {
        const raws = await db.getCollection('purchases').then(async (collection) => {
            return await collection.find({productId: this.id}).toArray();
        });
        let purchases = [];
        //construct purchases from raws
        for (let i = 0; i < raws.length; i++)
        {
            purchases.push(new Purchase(raws[i].id, raws[i].userId, raws[i].productId, raws[i].date, raws[i].quantity, raws[i].price, raws[i].giftCard));
        }
        return purchases;
    }

    public async getPurchasers(): Promise<number[]>
    {
        let purchases = await this.getPurchaseHistory();
        let users = [];
        for (let i = 0; i < purchases.length; i++)
        {
            users.push(await purchases[i].getId());
        }
        return users;
    }
    public async byId(id: number): Promise<Giftcard>
    {
        //run db.getGiftCardIndex(id) to get the index of the giftcard in the db
        const gc = await db.getGiftcardIndex(id);
        //if the values are default of this object, set them to the values of the giftcard in the db
        if (this.id == 0)
            this.id = gc.id;
        if (this.name == '')
            this.name = gc.name;
        if (this.image == '')   
            this.image = gc.image;
        if (this.priceInCents == 0)
            this.priceInCents = gc.priceInCents;
        if (this.numSold == 0)
            this.numSold = gc.numSold;
        if (this.numAvailable == 0)
            this.numAvailable = gc.numAvailable;
        if (this.stars == 0)
            this.stars = gc.stars;
        return this;
    }

    
    
}


