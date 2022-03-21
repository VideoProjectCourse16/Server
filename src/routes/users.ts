import express from "express";
import { userInfo } from "../middlewares/auth/userInfo";
import { addFavorite } from "../middlewares/user/addFavorites";
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

export default router;
