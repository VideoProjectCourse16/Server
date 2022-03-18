import { Request, Response } from "express";
import { getFirestore } from "firebase-admin/firestore";
import { formatCollection } from '../../utils';

const db = getFirestore();

export const addUser = (async (_: Request, res: Response, next: any) => {
    let username = res.locals.username;
    let password = res.locals.hashedPassword
    const users = formatCollection(await db.collection("Users").get());
    
    
    if ( users.some((user) =>user.username === res.locals.username)) {
        return res.status(401).json({message:`Username ${username} already exists`});
    } else {
        const max = Math.max(...users.map(({ id }) => Number(id)) as number[]) + 1;
        const docRef = db.collection('Users').doc(String(max));
        await docRef.set({
            username,
            password
        })
        res.locals.username = username;
        next();
    }
})
