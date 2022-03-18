import { getFirestore }  from "firebase-admin/firestore";
import { initializeApp, cert } from "firebase-admin/app";
import { formatCollection } from '../utils';
import express from "express";
const serviceAccount = require('../../config.json'); //per configurare il project_id in firebase

const router = express.Router();

initializeApp({credential: cert(serviceAccount)}); //per utilizzarlo
const db = getFirestore();

router.get('/', async(_, res) => {
    const films = db.collection("Films");
    let resp =  formatCollection(await films.get());
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

export default router;