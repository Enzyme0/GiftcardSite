//logout route
import express from 'express';
import { Request, Response} from "express";
import Logout from "../../../controllers/api/auth/logout";
const router = express.Router();

router.post('/api/auth/logout', (req: Request, res: Response) => {
    Logout.perform(req, res);
});
router.get('/logout', (req: Request, res: Response) => {
    res.send('um this is NOT how you logout');
});

export default router;