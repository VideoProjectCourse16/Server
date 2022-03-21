// import { Request, Response } from "express";
// import { getFirestore } from "firebase-admin/firestore";
// import { Favorite } from "../../models/favorites.model";
// import { UserSignup } from "../../models/user.model";
// import { formatCollection } from '../../utils';

// const db = getFirestore();

// export const addFavorite = (async ({body: {username,movieId }} : Request<any, any, Favorite>, res: Response, next: any) => {
//     const films = db.collection("Films");
//     let movies=  formatCollection(await films.get());
//     const favorites = formatCollection(await db.collection("Favorites").get());

//     if ( users.some((user) =>user.username === res.locals.username)) {
//         return res.status(401).json({message:`Username ${username} already exists`});
//     } else {
//         const max = Math.max(...users.map(({ id }) => Number(id)) as number[]) + 1;
//         const docRef = db.collection('Users').doc(String(max));
//         await docRef.set({
//             name,
//             surname,
//             username,
//             password
//         })
//         res.locals.username = username;
//         res.locals.user={name,surname,username};
//         next();
//     }
// })