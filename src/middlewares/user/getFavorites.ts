import { Request, Response } from "express";
import db from "../../connection/connection";
import { Favorite } from "../../models/favorites.model";
import { UserSignup } from "../../models/user.model";
import { formatCollection } from '../../utils';


export const getFavorites = (async (_: Request, res: Response, next: any) => {
    let { username } = res.locals.user;
    
    const favorites = formatCollection(await db.collection("Favorites").get());
    if (favorites.some((favorite) => favorite.username === username)) {
        let userFavorites = favorites.filter(( favorite) => favorite.username === username)
        res.locals.username= username
        res.locals.userFavorites = userFavorites;
        next();

    } else {
        return res.json({ message: `${username} has not favorites movies yet` });
    }

})