import express from "express";
import { userInfo } from "../middlewares/auth/userInfo";
import { addFavorite } from "../middlewares/user/addFavorites";
import { getFavorites } from "../middlewares/user/getFavorites";
import { Favorite } from "../models/favorites.model";

const router = express.Router();

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

export default router;


