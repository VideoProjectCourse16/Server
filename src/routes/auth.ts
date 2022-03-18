import express from "express";

import { passwordEncryption } from "../middlewares/auth/encryption";
import { addUser } from "../middlewares/auth/addUser";
import { checkData } from "../middlewares/auth/checkData";

const router = express.Router();

router.post(`/auth/signup`, passwordEncryption, addUser, (_, res) => {
    res.status(200).json(
        {
            message: `User ${res.locals.username} succesfully registered!`,
            user: res.locals.username
        })
})

router.post(`/auth/signin`, checkData, (_, res) => {
    let user = res.locals.user;
    user = {
        id: user.id,              //tolgo la password così mando solo id e username
        username: user.username
    }
    res.status(200).json(
        {
            message: `Succesfully logged in!`,
            user: user
        })
})

export default router;
