//login controller
import express from 'express';
//login function
import { Request } from "express";
import * as bearers from '../../helpers/bearer';

export async function login(req: any, res: any) {
    //logic
    //if login is successful, redirect to home page
    //if login is unsuccessful, redirect to login page
    //logic for checking if login is successful
    if (req.cookies['bearerToken'] === undefined) {
        res.redirect('/login');
    } else {
        //logic for checking if user has bearer token, valid bearer token
        const token = req.cookies['bearerToken'];
        const bearer = await bearers.verifyToken(token);
        if (bearer == null || bearer == undefined) {
            res.redirect('/login');
        } else {
            res.redirect('/home');
        }
        //check if bearer was rejected
        //if so, redirect to login page, and delete the cookie
}