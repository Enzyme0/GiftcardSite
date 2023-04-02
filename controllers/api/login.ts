//login controller

import * as jwt from 'jsonwebtoken';

import * as db from '../../helpers/db-funcs';

import * as User from "../../classes/User";

import * as bearers from "../../helpers/bearer";

class Login
{
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
    public static perform(req: any, res: any)
    {
        req.assert('email', 'Email cannot be blank').notEmpty();
        req.assert('email', 'Email is not valid').isEmail();
        req.assert('password', 'Password cannot be blank').notEmpty();
        req.assert('password', 'Password must be at least 8 characters long').len({ min: 8 });
        req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

        const errors = req.validationErrors();
        if(errors)
        {
            return res.status(400).send(errors);
        }

        const email = req.body.email;
        const password = req.body.password;

        //check if user exists by email
        db.findOne('users', {email: email}).then((user :any) => {
            if(!user)
            {
                return Login.error(res, 'User does not exist');
            }
            //check if password is correct
            if(user.password != password)
            {
                return Login.error(res, 'Incorrect password');
            }
            const token = bearers.createToken(user);
            user.token = undefined;
            user.password = undefined;
            return Login.response(res, {token: token, user: user});
        }).catch((err: any) => {
            return Login.error(res, err);
        });
    }
}

export default Login;