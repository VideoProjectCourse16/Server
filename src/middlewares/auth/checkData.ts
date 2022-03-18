import { User } from "../../models/user.model";
import { Request, Response } from "express";
import { getFirestore } from "firebase-admin/firestore";
import { formatCollection } from '../../utils';
import * as bcrypt from "bcrypt";

const db = getFirestore();

export const checkData = (async ({ body: { username, password } }: Request<any, any, User>, res: Response, next: any) => {
    const users = formatCollection(await db.collection("Users").get()) as User[]
    const user = users.find((user) => user.username === username);
    if (user!) {
        if (await bcrypt.compare(password, user.password)) {
            res.locals.user = user;
            next();
        } else {
            return res.status(401).json({
                message: `Access denied!`,
                error: `Wrong Password`
            });
        }
    } else {
        return res.status(401).json({
            message: `Access denied!`,
            error: `User doesn't exist`
        });
    }
})