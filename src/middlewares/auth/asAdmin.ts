import { NextFunction, Request, Response } from "express";
import { formatCollection } from '../../utils';
import { User, UserSignin } from "../../models/user.model";
import db from "../../connection/connection";

export const asAdmin = (async (_: Request, res: Response, next: NextFunction) => {
    const users = formatCollection<User>(await db.collection("Users").get());
    const {username} = res.locals.user;
    const exists = users.some(({ username: uUsername, admin }) => (admin && uUsername === username));
    exists ? next() : res.status(401).json({message: "not authorized"});
})