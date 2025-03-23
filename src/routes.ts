import { Router } from "express";
import { testDB, getUsers, createUser } from "./controllers"

const router = Router();

router.get("/", testDB);
router.get("/usuarios", getUsers);
router.post("/register", createUser);

export default router;