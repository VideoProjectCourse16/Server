import express from "express";
import { Request, Response } from "express";

import { passwordEncryption } from "../middlewares/auth/encryption";
import { auth } from "../middlewares/auth/auth";
import { checkData } from "../middlewares/auth/checkData";
import { User, UserSignup } from '../models/user.model';
import { formatCollection } from "../utils";
import { userInfo } from "../middlewares/auth/userInfo";
import { getFirestore } from "firebase-admin/firestore";
import jwt from "jsonwebtoken";

const router = express.Router();

const db = getFirestore();

router.post(`/signup`, passwordEncryption, async(_, res) => {
    res.locals.username;
    let {name,surname,username}: UserSignup=res.locals.user;
    let password = res.locals.hashedPassword
    const users = formatCollection<User>(await db.collection("Users").get());
    if ( users.some(({username}) =>username === res.locals.username)) {
        return res.status(401).json({message:`Username ${username} already exists`});
    } else {
        const max = Math.max(...users.map(({ id }) => Number(id)) as number[]) + 1;
        const docRef = db.collection('Users').doc(String(max));
        await docRef.set({
            name,
            surname,
            username,
            password
        })
        res.locals.username = username;
        res.locals.user={name,surname,username};
    }
    res.status(200).json(
        {
            message: `User ${res.locals.username} succesfully registered!`,
        })
})

router.post(`/signin`, checkData, ({body}, res) => {
    let { username } = res.locals.user;
    const token = jwt.sign(body, 'shhhhh')
    res.status(200).json(
        {
            message: `Succesfully logged in!`,
            user: { username, token }
        })
})

router.get(`/me`,auth, (_, res) => {
    const user = res.locals.token;
    

    return res.status(200).json({ message: `${user.username} Infos`, user: { ...user } })
})

export default router;