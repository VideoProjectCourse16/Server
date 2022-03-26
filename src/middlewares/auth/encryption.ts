import { UserSignup } from "../../models/user.model";
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";


export const passwordEncryption = (async ({ body: {name,surname, username, password, repeatPassword, admin } }: Request<any, any, UserSignup>, res: Response, next: any) => {
    var hashedPassword: string;
    var user: UserSignup={
        name,surname,username,password,repeatPassword, admin
    }
    if (username! && password! && repeatPassword!) {
        if (password! === repeatPassword!) {
            // Encryption of the string password
            bcrypt.genSalt(10, function (err, Salt) {

                // The bcrypt is used for encrypting password.
                bcrypt.hash(password, Salt, function (err, hash) {

                    if (err) {
                        return console.log('Cannot encrypt');
                    }
                    hashedPassword = hash;
                    res.locals.user = user;
                    res.locals.username = username;
                    res.locals.hashedPassword = hashedPassword;
                    next();
                })
            })
        }else{
            return res.status(401).json({message:`Password and repeat Password are different`});
        }

    } else {
        return res.status(401).json({message:`Please insert all form fields`})
    }
})