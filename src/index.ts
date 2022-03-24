import express from "express";
const cors = require('cors') 
import movies from "./routes/movies";
import auth from "./routes/auth";
import users from "./routes/users";


const app = express();
const port = process.env.PORT || 3001;
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());


//app.use('/movies', movies);
//app.use('/auth', auth);
//app.use('/users', users);

app.get(`/`, auth, (_, res) => {
    return res.status(200).json({message: "'ok"});
});


//const getFilms='https://api.themoviedb.org/3/discover/movie?api_key=d0e9057c846dee14124bd893b0ecdbfd&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1&with_watch_monetization_types=flatrate'

// puoi provare a fare una cosa, è drastica ma per iniziare bisogna farlo
// rimuovi tutti gli endpoint e le route, ne lasci solo una quì per vedere se funziona
// perfetto, fai un push

app.listen(port ,()=>console.log(`Project Work Server Is Running, port: ${port}`));
// mandato su telegram
export default app;

// fai il deploy su heroku adesso!