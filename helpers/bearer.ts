import { User } from '../classes/User';
import * as jwt from 'jsonwebtoken';
import { Date } from 'mongoose';

require("dotenv").config();
//const HASH = process.env.BEARER_HASH!;
const HASH = 'fart';

export interface Bearer
{
    sub: number // Subject (user ID)
    name: string,
    isAdmin: boolean,
    iat: number, // Issued at (timestamp)
    exp: number // Expires at (timestamp)
      
}
export const verifyToken = (token: string) : Promise<Bearer> => {
    return new Promise((resolve : any, reject : any) => {
        jwt.verify(token, HASH, (err, decoded: any) => {
            if (err) {
                reject(err);
            } else {
                //clauses for bad tokens
                if (decoded == null || decoded == undefined) {
                    reject('Token is invalid');
                }
                //token will be a string that we need to turn into a User object
                if (decoded == null || decoded == undefined) {
                    reject('Token is invalid');
                }
                //check if token was created 2 weeks ago or more
                const now = Date.now().valueOf() / 1000;
                if (decoded.iat < now - 1209600) 
                    reject('Token is expired');
                //check for any wack tokens
                if (decoded.sub == null || decoded.sub == undefined) {
                    reject('Token is invalid');
                }
                if (decoded.name == null || decoded.name == undefined) {
                    reject('Token is invalid');
                }
                if (decoded.isAdmin == null || decoded.isAdmin == undefined) {
                    reject('Token is invalid');
                }
                resolve(decoded);
            }
        });
    });
}

export const bearerToUser = (bearer: Bearer) => {
    const user = new User();
    user.setId(bearer.sub);
    user.load();
    return user;
  };

  export const getUser = async (req: any): Promise<User> => {
    const token = req.headers.authorization;
    const bearer = (await verifyToken(token)) as Bearer; // Ensure that the verifyToken function returns an object with the correct Bearer type
    const user = bearerToUser(bearer);
    return user;
  };
  

  

//create a bearer token

export const createToken = (user: User | string) => {
    //convert user to a bearer object, then sign that
    if (typeof user === 'string') {
        user = JSON.parse(user);
    }
    //expect user to be a User object
    user = user as User;
    const bearer = {
        sub: user.id,
        name: user.name,
        isAdmin: user.isAdmin,
        iat: Date.now().valueOf() / 1000,
        exp: Date.now().valueOf() / 1000 + 60 * 60 * 24 * 7 * 2 //2 weeks
    }
    return jwt.sign(bearer, HASH);
}