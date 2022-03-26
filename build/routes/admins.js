"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var connection_1 = __importDefault(require("../connection/connection"));
var auth_1 = require("../middlewares/auth/auth");
var utils_1 = require("../utils");
var movies_1 = __importDefault(require("./movies"));
movies_1.default.post("/:username/movies", auth_1.auth, function (_a, res) {
    var movie = _a.body, username = _a.params.username;
    return __awaiter(void 0, void 0, void 0, function () {
        var movies, _b, users, _c, index, max, newMovie, hasSameType, docRef;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _b = utils_1.formatCollection;
                    return [4 /*yield*/, connection_1.default.collection("Films").get()];
                case 1:
                    movies = _b.apply(void 0, [_d.sent()]);
                    _c = utils_1.formatCollection;
                    return [4 /*yield*/, connection_1.default.collection("Users").get()];
                case 2:
                    users = _c.apply(void 0, [_d.sent()]);
                    index = users.findIndex(function (_a) {
                        var uUsername = _a.username, admin = _a.admin;
                        return (admin == true && uUsername === username);
                    });
                    if (!(index > -1)) return [3 /*break*/, 6];
                    max = Math.max.apply(Math, movies.map(function (_a) {
                        var id = _a.id;
                        return Number(id);
                    })) + 1;
                    newMovie = __assign(__assign({}, movie), { id: max });
                    hasSameType = JSON.stringify(Object.keys(newMovie).sort()) === JSON.stringify(Object.keys(movies[0]).sort());
                    if (!hasSameType) return [3 /*break*/, 4];
                    docRef = connection_1.default.collection('Films').doc(String(max));
                    return [4 /*yield*/, docRef.set({
                            movie: movie
                        })];
                case 3:
                    _d.sent();
                    res.status(200).json({ message: "Movie inserted correctly!", movie: movie });
                    return [3 /*break*/, 5];
                case 4:
                    res.status(400).json({ error: 400, message: "Operation blocked, Please fill in all the required fields" });
                    _d.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    res.status(403).json({ error: "403", message: "user nor authorized" });
                    _d.label = 7;
                case 7: return [2 /*return*/];
            }
        });
    });
});
movies_1.default.delete("/:username/movies/:movieId", auth_1.auth, function (_a, res) {
    var _b = _a.params, movieId = _b.movieId, username = _b.username;
    return __awaiter(void 0, void 0, void 0, function () {
        var movies, _c, users, _d, userIndex, index, favorites, _e, indexFavorite;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _c = utils_1.formatCollection;
                    return [4 /*yield*/, connection_1.default.collection("Films").get()];
                case 1:
                    movies = _c.apply(void 0, [_f.sent()]);
                    _d = utils_1.formatCollection;
                    return [4 /*yield*/, connection_1.default.collection("Users").get()];
                case 2:
                    users = _d.apply(void 0, [_f.sent()]);
                    userIndex = users.findIndex(function (_a) {
                        var uUsername = _a.username, admin = _a.admin;
                        return (admin == true && uUsername === username);
                    });
                    if (!(userIndex > -1)) return [3 /*break*/, 5];
                    index = movies.findIndex(function (_a) {
                        var id = _a.id;
                        return id === movieId;
                    });
                    if (!(index > -1)) return [3 /*break*/, 4];
                    _e = utils_1.formatCollection;
                    return [4 /*yield*/, connection_1.default.collection("Favorites").get()];
                case 3:
                    favorites = _e.apply(void 0, [_f.sent()]);
                    indexFavorite = favorites.findIndex(function (_a) {
                        var favMovieId = _a.movieId;
                        return String(favMovieId) === movieId;
                    });
                    if (indexFavorite > -1) {
                        connection_1.default.collection('Favorites').doc(favorites[indexFavorite].id).delete();
                    }
                    connection_1.default.collection('Films').doc(movies[index].id).delete();
                    return [2 /*return*/, res.status(200).json({ message: "Movie with ID: ".concat(movies[index].id, " removed") })];
                case 4: return [2 /*return*/, res.json({ error: "404", message: "Movie with ID: ".concat(movieId, " not found") })];
                case 5:
                    res.status(403).json({ error: "403", message: "user nor authorized" });
                    _f.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    });
});
movies_1.default.put('/:username/user/:username1', auth_1.auth, function (_a, res) {
    var _b = _a.params, username = _b.username, username1 = _b.username1;
    return __awaiter(void 0, void 0, void 0, function () {
        var users, _c, userIndex, user;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _c = utils_1.formatCollection;
                    return [4 /*yield*/, connection_1.default.collection("Users").get()];
                case 1:
                    users = _c.apply(void 0, [_d.sent()]);
                    userIndex = users.findIndex(function (_a) {
                        var uUsername = _a.username, admin = _a.admin;
                        return (admin == true && uUsername === username);
                    });
                    if (userIndex > -1) {
                        user = users.find(function (_a) {
                            var username = _a.username;
                            return username === username1;
                        });
                        if (user) {
                            connection_1.default.collection("Users").doc(user.id).update({ admin: true });
                            res.json({ message: "new admin setted" });
                        }
                        else {
                            res.status(404).json({ error: "404", message: "user not found" });
                        }
                    }
                    else {
                        res.status(403).json({ error: "403", message: "user nor authorized" });
                    }
                    return [2 /*return*/];
            }
        });
    });
});
exports.default = movies_1.default;
