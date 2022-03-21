import express from "express";
import { getFirestore }  from "firebase-admin/firestore";
import { initializeApp, cert } from "firebase-admin/app";
import { formatCollection } from '../utils';
import axios from "axios";
import { Movie } from '../models/movies.model';

const serviceAccount = require('../../config.json'); //per configurare il project_id in firebase

const router = express.Router();


initializeApp({credential: cert(serviceAccount)}); //per utilizzarlo
const db = getFirestore();

router.get('/', async({query: {title}}, res) => {
    const films = db.collection("Films");
    let resp =  formatCollection(await films.get());
    title && (resp=resp.filter(item => item.title.includes(title)));
    res.json(resp);
})


router.post('/', async ({body: {title, description}}, res) => {
    const resp = formatCollection(await db.collection("Films").get());
    const max = Math.max(...resp.map(({id}) => Number(id)) as number[]) + 1;
    const docRef = db.collection('Films').doc(String(max));
    await docRef.set({
        title: title,
        description: description
    })
    res.json({message: 'film aggiunto'});
})

router.get('/', async(_,res)=>{
    const films = db.collection("Films");
    let resp = formatCollection(await films.get());
    res.json(resp);
})

router.get('/axios', async(_,res)=>{
    const films =  await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=d0e9057c846dee14124bd893b0ecdbfd&language=It&sort_by=popularity.desc&include_adult=false&include_video=true&page=1&with_watch_monetization_types=flatrate`);;
    res.json(films);
})

/*router.get('/axios/:id', async({params: {id}}, res)=>{
    const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=d0e9057c846dee14124bd893b0ecdbfd&language=It`);
    const videoid = data.results.filter((item: SingleMov)=>item.type.includes("Trailer"));
    res.json(`https://www.youtube.com/watch?v=${videoid[0].key}`)
})*/

export default router;