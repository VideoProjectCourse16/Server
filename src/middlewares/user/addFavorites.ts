import { Request, Response } from "express";
import db from "../../connection/connection";
import { Favorite } from "../../models/favorites.model";
import { Movie } from "../../models/movies.model";
import { Token } from "../../models/token.models";
import { formatCollection } from '../../utils';

export const addFavorite = (async ({ body: { movieId } }: Request<{},{},Partial<Favorite>,{}>, res: Response, next: any) => {
    let { username }: Token = res.locals.token;
    const films = db.collection("Films");
    let movies = formatCollection<Movie>(await films.get());
    const favorites = formatCollection<Favorite>(await db.collection("Favorites").get());
    if (movies.some((movie) => movie.id === String(movieId))) {
        if (favorites.some((favorite) => favorite.username === username && favorite.movieId === movieId)) {
            return res.status(401).json({ message: `Movie ${movieId} is already in the ${username}'s favorites` });
        } else {
            let max = Math.max(...favorites.map(({ id }) => Number(id)) as number[]) + 1;
            max=max<1 ? 1: max
            const docRef = db.collection('Favorites').doc(String(max));
            await docRef.set({
                username,
                movieId
            })
            res.locals.username = username;
            res.locals.movieId = movieId;
            next();
        }
    } else {
        return res.status(404).json({ error: '404', message: `Not found movieId ${movieId}` });
    }

})