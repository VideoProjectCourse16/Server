"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors = require('cors');
var auth_1 = __importDefault(require("./routes/auth"));
var app = (0, express_1.default)();
var port = process.env.PORT || 3001;
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(cors());
//app.use('/movies', movies);
//app.use('/auth', auth);
//app.use('/users', users);
app.get("/", auth_1.default, function (_, res) {
    return res.status(200).json({ message: "'ok" });
});
//const getFilms='https://api.themoviedb.org/3/discover/movie?api_key=d0e9057c846dee14124bd893b0ecdbfd&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1&with_watch_monetization_types=flatrate'
// puoi provare a fare una cosa, è drastica ma per iniziare bisogna farlo
// rimuovi tutti gli endpoint e le route, ne lasci solo una quì per vedere se funziona
app.listen(port, function () { return console.log("Project Work Server Is Running, port: ".concat(port)); });
// mandato su telegram
exports.default = app;
// fai il deploy su heroku adesso!
