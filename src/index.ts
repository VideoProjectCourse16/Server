import express from "express";
const cors = require('cors') 
import movies from "./routes/movies";
import auth from "./routes/auth";
import users from "./routes/users";


const app = express();
const port=process.env.port || 3000;
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());


app.use('/movies', movies)
app.use('/auth', auth)
app.use('/users', users)


//const getFilms='https://api.themoviedb.org/3/discover/movie?api_key=d0e9057c846dee14124bd893b0ecdbfd&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1&with_watch_monetization_types=flatrate'


app.listen(port,()=>console.log(`Project Work Server Is Running, port: " ${port}`));