import {
     User } from "../classes/User";
import * as db from './db-funcs';

export async function newUser(name: string, email: string, password: string) {
    const user = new User(await db.numUsers(), name, email, password, 0, 0, false, []);
    //add to dddddb
    try {
        await db.addUser(user);
    }
    catch (err) {
        throw err;
    }
    return user;
}
