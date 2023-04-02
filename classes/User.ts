import { Purchase } from "./Purchase";
//import all functions from '../helpers/db-funcs.ts'
import * as db from '../helpers/db-funcs';


export class User {
    id: number;
    name: string;
    email: string;
    password: string;
    balance: number;
    numberBought: number;
    isAdmin: boolean;
    purchases: Array<Purchase>;

    constructor(id?: number, name?: string, email?: string, password?: string, balance?: number, numberBought?: number, isAdmin?: boolean, purchases?: Array<Purchase>)
    {
        this.id = id || 0;
        this.name = name || '';
        this.email = email || '';
        this.password = password || '';
        this.balance = balance || 0;
        this.numberBought = numberBought || 0;
        this.isAdmin = isAdmin || false;
        this.purchases = purchases || [];
    }
    //constructor for just email and password and name



    public getId(): number {
        return this.id;
    }
    public getName(): string {
        return this.name;
    }
    public getEmail(): string {
        return this.email;
    }
    public getPassword(): string {
        return this.password;
    }
    public getBalance(): number {
        return this.balance;
    }
    public getNumberBought(): number {
        return this.numberBought;
    }
    public getIsAdmin(): boolean {
        return this.isAdmin;
    }
    public getPurchases(): Array<Purchase> {
        return this.purchases;
    }
    public setId(id: number): void {
        this.id = id;
    }
    public setName(name: string): void {
        this.name = name;
    }
    public setEmail(email: string): void {
        this.email = email;
    }
    public setPassword(password: string): void {
        this.password = password;
    }
    public setBalance(balance: number): void {
        this.balance = balance;
    }
    public setNumberBought(numberBought: number): void {
        this.numberBought = numberBought;
    }
    public setIsAdmin(isAdmin: boolean): void {
        this.isAdmin = isAdmin;
    }
    public setPurchases(purchases: Array<Purchase>): void {
        this.purchases = purchases;
    }

    public addPurchase(purchase: Purchase): void {
        this.purchases.push(purchase);
    }

    public async save(): Promise<void> {
        await db.updateUser(this);
    }

    public async newUser(): Promise<void> {
        //check to see if user exists
        let user = await db.getUser(this.id);
        if (user)
            throw new Error('User already exists');
        await db.addUser(this);
    }

    public async load(): Promise<void> {
        let user = await db.getUser(this.id);
        if (!user)
            throw new Error('User does not exist');
        console.log(user)
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.balance = user.balance;
        this.numberBought = user.numberBought;
        this.isAdmin = user.isAdmin;
        this.purchases = user.purchases;
    }

    public async loadByEmail(): Promise<void> {
        let user = await db.findOne('users', { email: this.email });
        if (!user)
            throw new Error('User does not exist');
        this.id = user.id;
        this.name = user.name;
        this.password = user.password;
        this.balance = user.balance;
        this.numberBought = user.numberBought;
        this.isAdmin = user.isAdmin;
        this.purchases = user.purchases;
    }

    public toString(): string {
        return JSON.stringify(this);
    }

}


export async function getUser(userId: number) {
    return db.findOne('users', { id: userId });
}

//by email, find user
export async function findUser(email: string): Promise<User | null> {
    const userDoc = await db.findOne('users', { email: email });
    if (!userDoc)
        return null;
    const user = new User(userDoc.id, userDoc.name, userDoc.email, userDoc.password, userDoc.balance, userDoc.numberBought, userDoc.isAdmin, userDoc.purchases);
    return user;
}