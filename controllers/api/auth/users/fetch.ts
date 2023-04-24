//route for fetching user based on token, returns user object without password

import { Result, body, validationResult } from 'express-validator';
import * as db from '../../../../helpers/db-funcs';
import * as User from "../../../../classes/User";
import * as bearers from "../../../../helpers/bearer";

class Fetch
{
    public static perform(req:any, res:Result)
    {
        body('token').notEmpty(),
        validationResult(req).throw();

        const token = req.body.token;

        //check if token is valid
        bearers.verifyToken(token).then((decoded:any) => {
            //get user from db
            db.findOne('users', {email: decoded.email}).then((user:any) => {
                //remove password from user object
                delete user.password;
                return Fetch.response(res, user);
            }).catch((err:any) => {
                return Fetch.error(res, err);
            });
        }).catch((err:any) => {
            return Fetch.error(res, err);
        });
    }

        private static error(res: any, message: string)
        {
            return res.json({
                success: false,
                error: message
            })
        }

        private static response(res: any, data: object)
        {
            return res.json({
                success: true,
                data: data
            })
    }
}

export default Fetch;