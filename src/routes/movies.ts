import express, {  Request } from "express";
import { formatCollection } from '../utils';
import { Movie } from '../models/movies.model';
import db from "../connection/connection";

const router = express.Router();

router.get('/', async({query: {title,genre}}: Request<{}, {}, {}, Movie>, res) => {
    const films = db.collection("Films");
    let movies=  formatCollection<Movie>(await films.get());
    title && (movies=movies.filter(({title: mTitle}) => mTitle.toLocaleLowerCase().includes(title.toLocaleLowerCase())));
    genre && (movies=movies.filter(({genre: mGenre}) => mGenre.toLocaleLowerCase().includes(genre.toLocaleLowerCase())));
    res.json(movies);
})

router.get('/:id', async ({ params: { id }}: Request<Movie, {}, {}, {}>, res) => {
    const films = db.collection("Films");
    let movies = formatCollection<Movie>(await films.get());
    let movie = movies.find(({id: mId}) => id === mId)
    return movie ?
        res.status(200).json({movie: movie} ) :
        res.status(404).json({
            error: '404',
            message: `Not found movie with id: ${id}`
        })
})


export default router;