"use strict";
//route for fetching user based on token, returns user object without password
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
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const db = __importStar(require("../../../../helpers/db-funcs"));
const bearers = __importStar(require("../../../../helpers/bearer"));
class Fetch {
    static perform(req, res) {
        (0, express_validator_1.body)('token').notEmpty(),
            (0, express_validator_1.validationResult)(req).throw();
        const token = req.body.token;
        //check if token is valid
        bearers.verifyToken(token).then((decoded) => {
            //get user from db
            db.findOne('users', { email: decoded.email }).then((user) => {
                //remove password from user object
                delete user.password;
                return Fetch.response(res, user);
            }).catch((err) => {
                return Fetch.error(res, err);
            });
        }).catch((err) => {
            return Fetch.error(res, err);
        });
    }
    static error(res, message) {
        return res.json({
            success: false,
            error: message
        });
    }
    static response(res, data) {
        return res.json({
            success: true,
            data: data
        });
    }
}
exports.default = Fetch;
