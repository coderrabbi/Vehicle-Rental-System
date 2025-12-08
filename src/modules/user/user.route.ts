import { Router } from "express";
import { Usercontroller } from "./user.controller";
import auth from "../../Middlewere/auth";

const router = Router();
router.post("/", Usercontroller.createUser);
router.get("/", auth("admin"), Usercontroller.gellAlluser);
router.put("/:id", auth("admin", "/:id"), Usercontroller.updateSingleUser);

export const userRoute = router;
