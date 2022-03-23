import { User, UserSignin } from "../../models/user.model";
import { Request, Response } from "express";
import { formatCollection } from '../../utils';
import * as bcrypt from "bcrypt";
import db from "../../connection/connection";



export const checkData = (async ({ body: { username, password } }: Request<any, any, UserSignin>, res: Response, next: any) => {
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