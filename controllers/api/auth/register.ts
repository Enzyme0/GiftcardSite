//register controller

import * as jwt from 'jsonwebtoken';
import * as db from '../../../helpers/db-funcs';
import * as User from "../../../classes/User";
import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

class Register
{
    public static perform(req: any, res: Response)
{
    body('email').isEmail(),
    body('email').notEmpty(),
    body('password').isLength({ min: 8 }),
    body('password').notEmpty(),
    validationResult(req).throw();
        const errors = req.validationErrors();
        if(errors)
        {
            return res.status(400).send(errors);
        }

        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;

        //check if user exists by email
        db.findOne('users', {email: email}).then((user :any) => {
            if(user)
            {
                return Register.error(res, 'User already exists');
            }
            //create new user
            const newUser = new User.User(email, password);
            db.insertOne('users', newUser).then((result: any) => {
                return Register.response(res, result);
            }).catch((err: any) => {
                return Register.error(res, err);
            });
        }).catch((err: any) => {
            return Register.error(res, err);
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

export default Register;