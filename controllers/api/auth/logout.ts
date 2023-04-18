//logout controller

import * as jwt from 'jsonwebtoken';

class Logout
{
    public static perform(req: any, res: any)
    {
        //remove token from user
        const token = req.headers.authorization;
        jwt.verify(token, process.env.BEARER_HASH!, (err :any, decoded: any) => {
            //if token is invalid
            if (err) {
                return res.json({
                    success: false,
                    error: err
                })
            }
            //if token is valid
            else {
                //remove token from user
                req.cookies.token = undefined;
                return res.json({
                    success: true,
                    data: 'Logged out'
                })
            }
        });
    }
}
export default Logout;