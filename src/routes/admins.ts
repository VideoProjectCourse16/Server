import express, { Request, Response } from "express";
import db from "../connection/connection";
import { auth } from "../middlewares/auth/auth";
import { Movie } from "../models/movies.model";
import { User } from "../models/user.model";
import { formatCollection } from "../utils";
import router from "./movies";
import { asAdmin } from '../middlewares/auth/asAdmin';

router.post(`/movies`, auth, asAdmin, async ({ body: movie }: Request<Partial<User>, {}, Movie, {}>, res) => {
    const movies = formatCollection<Movie>(await db.collection("Films").get());
    let max = Math.max(...movies.map(({ id }) => Number(id)) as number[]) + 1;
    let newMovie = {...movie, id: max}
    const hasSameType = JSON.stringify(Object.keys(newMovie).sort()) === JSON.stringify(Object.keys(movies[0]).sort());
    if (hasSameType) {
        const docRef = db.collection('Films').doc(String(max));
        await docRef.set({
            movie
        })
        res.status(200).json({ message: `Movie inserted correctly!`, movie: movie });
    } else {
        res.status(400).json({ error: 400, message: `Operation blocked, Please fill in all the required fields` })
    }
})

router.delete(`/movies/:id`, auth, asAdmin ,async ({ params: { id } }: Request<Partial<Movie>, {}, {}, {}>, res: Response) => {
    const movies = formatCollection<Movie>(await db.collection("Films").get());
    const index = movies.findIndex(({ id : movieId}) => id === movieId);
    if (index > -1) {
        db.collection('Films').doc(movies[index].id).delete();
        return res.status(200).json({ message: `Movie with ID: ${movies[index].id} removed` })
    }
    return res.json({ error: "404", message: `Movie with ID: ${id} not found` })
})

router.put('/user/:username1', auth, asAdmin, async({params: { username1} }: Request<{username1: string} , {}, {}, {}>, res:Response)=>{
    const users = formatCollection<User>(await db.collection("Users").get());
    const user = users.find(({username})=>username===username1);
    if(user) {
        db.collection("Users").doc(user.id).update({admin: true});
        res.json({message: "new admin setted"});
    }else {
        res.status(404).json({error: "404", message: "user not found"});
    }
})

export default router;
