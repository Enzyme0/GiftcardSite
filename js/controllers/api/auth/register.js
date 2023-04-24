"use strict";
//register controller
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
const db = __importStar(require("../../../helpers/db-funcs"));
const User = __importStar(require("../../../classes/User"));
const express_validator_1 = require("express-validator");
class Register {
    static perform(req, res) {
        (0, express_validator_1.body)('email').isEmail(),
            (0, express_validator_1.body)('email').notEmpty(),
            (0, express_validator_1.body)('password').isLength({ min: 8 }),
            (0, express_validator_1.body)('password').notEmpty(),
            (0, express_validator_1.validationResult)(req).throw();
        const errors = req.validationErrors();
        if (errors) {
            return res.status(400).send(errors);
        }
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;
        //check if user exists by email
        db.findOne('users', { email: email }).then((user) => {
            if (user) {
                return Register.error(res, 'User already exists');
            }
            //create new user
            const newUser = new User.User(email, password);
            db.insertOne('users', newUser).then((result) => {
                return Register.response(res, result);
            }).catch((err) => {
                return Register.error(res, err);
            });
        }).catch((err) => {
            return Register.error(res, err);
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
exports.default = Register;
