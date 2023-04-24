"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//logout route
const express_1 = __importDefault(require("express"));
const logout_1 = __importDefault(require("../../../controllers/api/auth/logout"));
const router = express_1.default.Router();
router.post('/api/auth/logout', (req, res) => {
    logout_1.default.perform(req, res);
});
router.get('/logout', (req, res) => {
    res.send('um this is NOT how you logout');
});
exports.default = router;
