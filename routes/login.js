"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
exports.router = express_1.default.Router();
exports.router.get('/', (req, res) => {
    //check if user has bearer token
    //if not, redirect to login page
    //if so, redirect to home page
    //logic for checking if user has bearer token
    if (req.cookies['bearerToken'] === undefined) {
        res.redirect('/login');
    }
    else {
        res.redirect('/home');
    }
});
exports.router.get('/home', (req, res) => {
    const redirect = ((req.cookies['bearerToken'])) ? '/login' : '/home';
    //logic
});
//do you need to export the router?
module.exports = exports.router;
