import express from "express";

import { passwordEncryption } from "../middlewares/auth/encryption";
import { addUser } from "../middlewares/auth/addUser";

const router = express.Router();

router.post(`/auth/signup`, passwordEncryption,addUser, (_, res) => {
    res.status(200).json(
        {
            message: "Registered "+res.locals.username,
            user: res.locals.username
        })
})

export default router;
