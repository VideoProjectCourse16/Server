import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { formatCollection } from '../../utils';
import { User } from "../../models/user.model";
import db from "../../connection/connection";



export const auth = (async ({headers: {authorization}}: Request, res: Response, next: NextFunction) => {
    try{
        res.locals.token =  jwt.verify((authorization! as string).split(' ')[1], 'shhhhh');
        const users = formatCollection(await db.collection("Users").get()) as User[];
        const {username} = res.locals.token;
        const user =users.find((user) => user.username === username);
        res.locals.user=user;
        next();
    } catch(e){
        res.status(401).json({error: 401, message: "not authorized"})
    }
})
