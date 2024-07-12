"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handlers_1 = require("../handlers");
const express = require("express");
const userRouter = new express.Router();
const cors = require("cors");
const userAuth = (req, res, next) => {
    next();
};
userRouter.use(userAuth);
userRouter.get("/home", (req, res) => {
    res.send({ message: "hello" });
});
userRouter.post("/adduser", handlers_1.addDbUserHandler, (req, res) => {
    res.send({ message: "thanks" });
});
module.exports = userRouter;
//# sourceMappingURL=userRouter.js.map