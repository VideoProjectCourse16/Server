import { Request, Response } from "express";
import { getFirestore } from "firebase-admin/firestore";
import { User } from "../../models/user.model";
import { formatCollection } from '../../utils';

const db = getFirestore();

export const userInfo = (async (_: Request, res: Response, next: any) => {
    const users = formatCollection(await db.collection("Users").get()) as User[]
    const {username} = res.locals.token;
    const user = users.find((user) => user.username === username);
    (user!) ?
        (res.locals.user = user,
        next()) :
        (res.status(404).json({error:'404',message:`insert the right username`}))

    }  
)