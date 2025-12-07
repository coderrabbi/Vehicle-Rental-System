import { Router } from "express";
import { Usercontroller } from "./user.controller";
import auth from "../../Middlewere/auth";

const router = Router();
router.post("/", Usercontroller.createUser);
router.get("/", auth(), Usercontroller.gellAlluser);

export const userRoute = router;
