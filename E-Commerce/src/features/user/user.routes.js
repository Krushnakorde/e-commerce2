
import UserController from "./user.controller.js";
import express from "express";

const userController = new UserController();

const router = express.Router();

router.post("/signup",(req,res)=>{
    userController.signUp(req, res);
});
router.post("/signin",(req,res)=>{
    userController.signIn(req, res);
});


export default router;