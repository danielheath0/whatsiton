import express from "express";
import { createNewUser, login } from "../controllers/users.controller";

const router = express.Router()
router.post("/register", createNewUser)
router.post("/login", login)


export default router