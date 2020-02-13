import { Router } from 'express';
import api from "./api";
import users from "./users";
import tokens from "./tokens";

const router = Router();

router.use(api);
router.use(`/users/`, users);
router.use(`/tokens/`, tokens);

export default router;
