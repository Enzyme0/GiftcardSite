import express from 'express';
import { Request } from "express";

export const router = express.Router();
router.get('/', (req: Request, res: any) => {
    //check if user has bearer token
    //if not, redirect to login page
    //if so, redirect to home page
    //logic for checking if user has bearer token
    if (req.cookies['bearerToken'] === undefined) {
        res.redirect('/login');
    } else {
        res.redirect('/home');
    }
});
router.get('/home', (req: Request, res: any) => {
    const redirect = ((req.cookies['bearerToken'])) ? '/login' : '/home';
    //logic
});


//do you need to export the router?
module.exports = router;
