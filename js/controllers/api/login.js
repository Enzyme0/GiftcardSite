"use strict";
//login controller
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
const db = __importStar(require("../../helpers/db-funcs"));
const bearers = __importStar(require("../../helpers/bearer"));
class Login {
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
    static perform(req, res) {
        req.assert('email', 'Email cannot be blank').notEmpty();
        req.assert('email', 'Email is not valid').isEmail();
        req.assert('password', 'Password cannot be blank').notEmpty();
        req.assert('password', 'Password must be at least 8 characters long').len({ min: 8 });
        req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });
        const errors = req.validationErrors();
        if (errors) {
            return res.status(400).send(errors);
        }
        const email = req.body.email;
        const password = req.body.password;
        //check if user exists by email
        db.findOne('users', { email: email }).then((user) => {
            if (!user) {
                return Login.error(res, 'User does not exist');
            }
            //check if password is correct
            if (user.password != password) {
                return Login.error(res, 'Incorrect password');
            }
            const token = bearers.createToken(user);
            user.token = undefined;
            user.password = undefined;
            return Login.response(res, { token: token, user: user });
        }).catch((err) => {
            return Login.error(res, err);
        });
    }
}
exports.default = Login;
