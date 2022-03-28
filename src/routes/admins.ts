import express, { Request } from "express";
import db from "../connection/connection";
import { auth } from "../middlewares/auth/auth";
import { Favorite } from "../models/favorites.model";
import { Movie } from "../models/movies.model";
import { User } from "../models/user.model";
import { formatCollection } from "../utils";
import router from "./movies";

router.post(`/:username/movies`, auth, async ({ body: movie, params: {username} }: Request<Partial<User>, {}, Movie, {}>, res) => {
    const movies = formatCollection<Movie>(await db.collection("Films").get());
    const users = formatCollection<User>(await db.collection("Users").get());
    const index = users.findIndex(({ username: uUsername, admin }) => (admin==true && uUsername === username));
    if(index>-1) {
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
    }else {
        res.status(401).json({error: "401", message: "user nor authorized"})
    }

})

router.delete(`/:username/movies/:movieId`, auth ,async ({ params: { movieId, username } }: Request<{ movieId: string, username: string }, {}, {}, {}>, res) => {
    const movies = formatCollection<Movie>(await db.collection("Films").get());
    const users = formatCollection<User>(await db.collection("Users").get());
    const userIndex = users.findIndex(({ username: uUsername, admin }) => (admin==true && uUsername === username));
    if(userIndex>-1) {
        const index = movies.findIndex(({ id }) => id === movieId);
        if (index > -1) {
            const favorites = formatCollection<Favorite>(await db.collection("Favorites").get());
            const indexFavorite = favorites.findIndex(({ movieId: favMovieId }) => String(favMovieId) === movieId);
            if(indexFavorite > -1){
                db.collection('Favorites').doc(favorites[indexFavorite].id).delete();
            }
            db.collection('Films').doc(movies[index].id).delete();
            return res.status(200).json({ message: `Movie with ID: ${movies[index].id} removed` })
        }
            return res.json({ error: "404", message: `Movie with ID: ${movieId} not found` })
    }else {
        res.status(401).json({error: "401", message: "user nor authorized"});
    }
})

router.put('/:username/user/:username1', auth, async({params: {username, username1} }: Request<{username: string, username1: string} , {}, {}, {}>, res)=>{
    const users = formatCollection<User>(await db.collection("Users").get());
    const userIndex = users.findIndex(({ username: uUsername, admin }) => (admin==true && uUsername === username));
    if(userIndex>-1){
        const user = users.find(({username})=>username===username1);
        if(user) {
            db.collection("Users").doc(user.id).update({admin: true});
            res.json({message: "new admin setted"});
        }else {
            res.status(404).json({error: "404", message: "user not found"});
        }
    } else {
        res.status(401).json({error: "401", message: "user nor authorized"});
    }
})

export default router;
