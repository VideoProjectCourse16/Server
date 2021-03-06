import express from "express";
import { passwordEncryption } from "../middlewares/auth/encryption";
import { auth } from "../middlewares/auth/auth";
import { checkData } from "../middlewares/auth/checkData";
import { User, UserSignup } from '../models/user.model';
import { formatCollection } from "../utils";
import jwt from "jsonwebtoken";
import { Token } from "../models/token.models";
import db from "../connection/connection";

const router = express.Router();

router.post(`/signup`, passwordEncryption, async (_, res) => {
    let { name, surname, username }: UserSignup = res.locals.user;
    let password: string = res.locals.hashedPassword
    const users = formatCollection<User>(await db.collection("Users").get());
    if (users.some(({ username }) => username === res.locals.username)) {
        return res.status(422).json({ message: `Username ${username} already exists` });
    } else {
        let max = Math.max(...users.map(({ id }) => Number(id)) as number[]) + 1;
        max = max < 1 ? 1 : max
        const docRef = db.collection('Users').doc(String(max));
        await docRef.set({
            name,
            surname,
            username,
            password,
            admin: false
        })
    }
    res.status(200).json(
        {
            message: `User ${res.locals.username} succesfully registered!`,
        })
})

router.post(`/signin`, checkData, ({ body }, res) => {
    let { username }: User = res.locals.user;
    const token = jwt.sign(body, 'shhhhh')
    res.status(200).json(
        {
            message: `Succesfully logged in!`,
            user: { username, token }
        })
})

router.get(`/me`, auth, (_, res) => {
    const { username, iat }: Token = res.locals.token;
    const { name, surname, id }: {id: number} & User = res.locals.user;
    const user = { username, id, name, surname, iat }

    return res.status(200).json({
        message: `${user.username} Infos`, user: { ...user },
    })
})

export default router;