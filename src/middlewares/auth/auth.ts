import { NextFunction, Request, Response } from "express";
import { getFirestore } from "firebase-admin/firestore";
import jwt from "jsonwebtoken";
import { User, UserSignup } from "../../models/user.model";
import { formatCollection } from '../../utils';


export const auth = (async ({headers: {token}}: Request, res: Response, next: NextFunction) => {
    try{
        res.locals.token =  jwt.verify((token! as string).split(' ')[1], 'shhhhh'); 
        next();
    } catch(e){
        res.status(401).json({error: 401, message: "not authorized"})
    }
})
