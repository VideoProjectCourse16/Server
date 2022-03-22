import express from "express";
import { getFirestore } from "firebase-admin/firestore";
import { userInfo } from "../middlewares/auth/userInfo";
import { addFavorite } from "../middlewares/user/addFavorites";
import { getFavorites } from "../middlewares/user/getFavorites";
import { Favorite } from "../models/favorites.model";
import { User } from "../models/user.model";
import { formatCollection } from "../utils";

const router = express.Router();

const db = getFirestore();

router.post(`/favorites`,userInfo,addFavorite,(_,res)=>{
    let favorite:Favorite = {
        username: res.locals.username,
        movieId:res.locals.movieId
    }
    return res.status(200).json({ message: `${favorite.username} added to favorites movie with id:${favorite.movieId}`,
    favorite: favorite})
})
router.get(`/favorites`,userInfo,getFavorites,(_,res)=>{

    return res.status(200).json({ message: `${res.locals.username} favorites movies:`,
    favorites:res.locals.userFavorites })
})

router.delete('/:id', async({params: {id}}, res)=>{
    const users = formatCollection<User>(await db.collection("Users").get());
    const index = users.findIndex(({id: uid})=>uid===id);
    if(index>-1) {
        db.collection('Users').doc(id).delete();
        res.json({message: "user removed"}) 
    } else {
        res.status(404).json({error: "404", message: "User not found"})
    }
})

export default router;


