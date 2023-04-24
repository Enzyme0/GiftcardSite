import { Data } from "electron";
import { Giftcard } from "./Giftcard";
import { User } from "./User";
import * as db from "../helpers/db-funcs";

export interface Purchase {
    id: number;
    userId: number;
    productId: number;
    quantity: number;
    price: number;
    date: Date;
    giftCard: Giftcard;
}


export class Purchase
{

    id: number;
    userId: number;
    productId: number;
    quantity: number;
    price: number;
    date: Date;
    giftCard: Giftcard;


    public getId(): number {
        return this.id;
    }
    public setId(id: number): void {
        this.id = id;
    }
    public getUserId(): number {
        return this.userId;
    }

    public getDate(): Date {
        return this.date;
    }

    public setDate(Date: Date): void {
        this.date = Date;
    }

    public getGiftcard(): Giftcard {
        return this.giftCard;
    }

    public setGiftcard(Giftcard: Giftcard): void {
        this.giftCard = Giftcard;
    }


    constructor(id: number, userId: number, productId: number, quantity: number, price: number, date: Date, giftCard: Giftcard)
    {
        this.id = id;
        this.userId = userId;
        this.productId = productId;
        this.quantity = quantity;
        this.price = price;
        this.date = date;
        this.giftCard = giftCard;
    }


    public async getUser(): Promise<User>
    {
        //loads user from user class using load()
        let user = new User();
        user.setId(this.userId);
        await user.load();
        //return user
        return user;
    }
    

    //load a purchase 

}