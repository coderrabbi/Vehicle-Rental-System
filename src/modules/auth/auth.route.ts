import { Router } from "express";
import { AuthController } from "./auth.contoller";

const router = Router();

router.post("/", AuthController.loginUser);

export const authRouter = router;
