import express from "express";
import { getFirestore } from "firebase-admin/firestore";
import { initializeApp, cert } from "firebase-admin/app";
import { formatCollection } from '../utils';
import { Movie } from '../models/movies.model';

const serviceAccount = require('../../config.json'); //per configurare il project_id in firebase

const router = express.Router();


initializeApp({ credential: cert(serviceAccount) }); //per utilizzarlo
const db = getFirestore();




router.get('/', async ({ query: { title, genre } }, res) => {
    const films = db.collection("Films");
    let movies = formatCollection(await films.get());
    title && (movies = movies.filter(movie => movie.title.includes(title)));
    genre && (movies = movies.filter(movie => movie.genre === genre!));
    return res.status(200).json(movies);
})

router.get('/:id', async ({ params: { id } }, res) => {
    const films = db.collection("Films");
    let movies = formatCollection(await films.get());
    let movie = movies.find(movie => id === movie.id)
    return movie ?
        res.status(200).json({ movie: movie }) :
        res.status(404).json({
            error: '404',
            message: `Not found movie with id: ${id}`
        })
})

// router.post('/', async ({body: {title, description}}, res) => {
//     const resp = formatCollection(await db.collection("Films").get());
//     const max = Math.max(...resp.map(({id}) => Number(id)) as number[]) + 1;
//     const docRef = db.collection('Films').doc(String(max));
//     await docRef.set({
//         title: title,
//         description: description
//     })
//     res.json({message: 'film aggiunto'});
// })



export default router;