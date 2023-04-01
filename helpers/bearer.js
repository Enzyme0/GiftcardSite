"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = exports.getUser = exports.bearerToUser = exports.verifyToken = void 0;
const User_1 = require("../classes/User");
const jwt = __importStar(require("jsonwebtoken"));
require("dotenv").config();
//const HASH = process.env.BEARER_HASH!;
const HASH = 'fart';
const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, HASH, (err, decoded) => {
            if (err) {
                reject(err);
            }
            else {
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
};
exports.verifyToken = verifyToken;
const bearerToUser = (bearer) => {
    const user = new User_1.User();
    user.setId(bearer.sub);
    user.load();
    return user;
};
exports.bearerToUser = bearerToUser;
const getUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    const bearer = (yield (0, exports.verifyToken)(token)); // Ensure that the verifyToken function returns an object with the correct Bearer type
    const user = (0, exports.bearerToUser)(bearer);
    return user;
});
exports.getUser = getUser;
//create a bearer token
const createToken = (user) => {
    //convert user to a bearer object, then sign that
    if (typeof user === 'string') {
        user = JSON.parse(user);
    }
    //expect user to be a User object
    user = user;
    const bearer = {
        sub: user.id,
        name: user.name,
        isAdmin: user.isAdmin,
        iat: Date.now().valueOf() / 1000,
        exp: Date.now().valueOf() / 1000 + 60 * 60 * 24 * 7 * 2 //2 weeks
    };
    return jwt.sign(bearer, HASH);
};
exports.createToken = createToken;
