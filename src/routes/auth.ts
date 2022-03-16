import express from "express";

const router = express.Router();

router.post(`/auth/signup`,()=>{ // encryption,creation <-- these will be 2 middlewares.
                                    // encryption should encript user password.
                                    // creation should check whether user datas are valid and then add those datas to the database
})
// router.post(`/auth/login`,)