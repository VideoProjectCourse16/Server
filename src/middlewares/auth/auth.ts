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
    /*res.locals.username;
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
        next();
    }*/
})
