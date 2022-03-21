import express from "express";
import { Request, Response } from "express";

import { passwordEncryption } from "../middlewares/auth/encryption";
import { addUser } from "../middlewares/auth/addUser";
import { checkData } from "../middlewares/auth/checkData";
import { User, UserSignup } from "../models/user.model";
import { formatCollection } from "../utils";
import { userInfo } from "../middlewares/auth/userInfo";

const router = express.Router();

router.post(`/signup`, passwordEncryption, addUser, (_, res) => {
    let { name, surname, username }: UserSignup = res.locals.user;
    res.status(200).json(
        {
            message: `User ${res.locals.username} succesfully registered!`,
            user: { name, surname, username }
        })
})

router.post(`/signin`, checkData, (_, res) => {
    let { name, surname, username, id } = res.locals.user;
    res.status(200).json(
        {
            message: `Succesfully logged in!`,
            user: { name, surname, username, id }
        })
})

router.get(`/me`, userInfo, (_, res) => {
    let { name, surname, username, id } = res.locals.user;
    return res.status(200).json({ message: `${username} Infos`, user: { name, surname, username, id } })
})

export default router;