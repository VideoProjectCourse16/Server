import express from "express";

import { passwordEncryption } from "../middlewares/auth/encryption";
import { addUser } from "../middlewares/auth/addUser";
import { checkData } from "../middlewares/auth/checkData";
import { UserSignup } from "../models/user.model";

const router = express.Router();

router.post(`/signup`, passwordEncryption, addUser, (_, res) => {
    let {name,surname,username}:UserSignup= res.locals.user;
    res.status(200).json(
        {
            message: `User ${res.locals.username} succesfully registered!`,
            user: {name,surname, username}
        })
})

router.post(`/signin`, checkData, (_, res) => {
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
