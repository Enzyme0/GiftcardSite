//login route
///api/auth/login
import express from 'express';
import { Request, Response} from "express";
import Login from "../../../controllers/api/auth/login";
const router = express.Router();

router.post('/api/auth/login', (req: Request, res: Response) => {
    Login.perform(req, res);
});
router.get('/login', (req: Request, res: Response) => {
    res.send('login (AWESOME POSSUM)');
});

export default router;