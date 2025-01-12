"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//login route
///api/auth/login
const express_1 = __importDefault(require("express"));
const login_1 = __importDefault(require("../../../controllers/api/auth/login"));
const router = express_1.default.Router();
router.post('/api/auth/login', (req, res) => {
    login_1.default.perform(req, res);
});
router.get('/login', (req, res) => {
    res.send('login (AWESOME POSSUM)');
});
exports.default = router;
