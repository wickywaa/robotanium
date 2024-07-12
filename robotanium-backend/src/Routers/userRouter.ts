import { NextFunction, Response } from "express";

import { RequestCustom } from "../interfaces/userInterfaces/userInterfaces";
import { addDbUserHandler } from "../handlers";

const express = require("express");
export const userRouter = new express.Router();
const cors = require("cors");

const userAuth = (req: RequestCustom, res: Response, next: NextFunction) => {
  next();
};

userRouter.use(userAuth);

userRouter.get("/home", (req: any, res: any) => {
  res.send({ message: "hello" });
});

userRouter.post("/adduser", addDbUserHandler, (req: any, res: any) => {
  res.send({ message: "thanks" });
});
