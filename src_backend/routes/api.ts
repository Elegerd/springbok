import { Router } from 'express';
import api from "../config/api.json";

const router = Router();


router.get("/", (req, res) => {
    res.json({
        data: {
            version: api.version
        }
    });
});

export default router;