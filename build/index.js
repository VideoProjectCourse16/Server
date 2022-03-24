"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors = require('cors');
var movies_1 = __importDefault(require("./routes/movies"));
var auth_1 = __importDefault(require("./routes/auth"));
var users_1 = __importDefault(require("./routes/users"));
var app = (0, express_1.default)();
var port = process.env.PORT || 3001;
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(cors());
app.use('/movies', movies_1.default);
app.use('/auth', auth_1.default);
app.use('/users', users_1.default);
//const getFilms='https://api.themoviedb.org/3/discover/movie?api_key=d0e9057c846dee14124bd893b0ecdbfd&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1&with_watch_monetization_types=flatrate'
app.listen(port, function () { return console.log("Project Work Server Is Running, port: ".concat(port)); });
exports.default = app;
// fai il deploy su heroku adesso!
