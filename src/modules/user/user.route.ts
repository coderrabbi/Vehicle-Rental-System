import { Router } from "express";
import { Usercontroller } from "./user.controller";
import auth from "../../Middlewere/auth";
import Verify from "../../Middlewere/verify";
import { Roles } from "../auth/auth.constant";

const router = Router();
router.post("/", Usercontroller.createUser);
router.get("/", auth(Roles.admin), Usercontroller.gellAlluser);
router.put("/:id", Verify(), Usercontroller.updateSingleUser);
router.delete("/:id", auth(Roles.admin), Usercontroller.deleteUser);

export const userRoute = router;
