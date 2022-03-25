import express, { Request } from "express";
import db from "../connection/connection";
import { Movie } from "../models/movies.model";
import { formatCollection } from "../utils";
import router from "./movies";

router.post(`/films`, async ({ body: movie }: Request<{}, {}, Movie>, res) => {
    const movies = formatCollection<Movie>(await db.collection("Films").get());
    const hasSameType=  JSON.stringify(Object.keys(movie).sort()) === JSON.stringify(Object.keys(movies[0]).sort());
    const isIdPresent = movies.some(({ id }) => id === movie.id);
    if(hasSameType){
        if (isIdPresent) {
            res.status(400).json({ error: 400, message: `Operation blocked, ID: ${movie.id} is already present` })
        } else {
            const docRef = db.collection('Films').doc(String(movie.id));
            await docRef.set({
                movie
            })
            res.status(200).json({ message: `Movie inserted correctly!`, movie: movie });
        }
    }else{
        res.status(400).json({ error: 400, message: `Operation blocked, Please fill in all the required fields` })
    }
    
})

export default router;
