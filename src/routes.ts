import { Router } from "express";
import { testDB, getUsers, createUser, login } from "./controllers"

const router = Router();

router.get("/", testDB);
router.get("/usuarios", getUsers);
router.post("/register", createUser);
router.post("/login", login);

export default router;