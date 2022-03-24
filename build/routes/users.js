"use strict";
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
var express_1 = __importDefault(require("express"));
var userInfo_1 = require("../middlewares/auth/userInfo");
var addFavorites_1 = require("../middlewares/user/addFavorites");
var getFavorites_1 = require("../middlewares/user/getFavorites");
var auth_1 = require("../middlewares/auth/auth");
var utils_1 = require("../utils");
var connection_1 = __importDefault(require("../connection/connection"));
var router = express_1.default.Router();
router.post("/favorites", auth_1.auth, userInfo_1.userInfo, addFavorites_1.addFavorite, function (_, res) {
    var favorite = {
        //username: res.locals.username,
        movieId: res.locals.movieId
    };
    var username = res.locals.token.username;
    return res.status(200).json({ message: "".concat(username, " added to favorites movie with id:").concat(favorite.movieId),
        favorite: favorite });
});
router.get("/favorites", auth_1.auth, userInfo_1.userInfo, getFavorites_1.getFavorites, function (_, res) {
    return res.status(200).json({ message: "".concat(res.locals.username, " favorites movies:"),
        favorites: res.locals.userFavorites });
});
router.delete("/:id/favorites/:movieId", auth_1.auth, function (_a, res) {
    var _b = _a.params, id = _b.id, movieId = _b.movieId;
    return __awaiter(void 0, void 0, void 0, function () {
        var users, _c, index, favorites, _d, indFav;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _c = utils_1.formatCollection;
                    return [4 /*yield*/, connection_1.default.collection("Users").get()];
                case 1:
                    users = _c.apply(void 0, [_e.sent()]);
                    index = users.findIndex(function (_a) {
                        var uId = _a.id;
                        return uId === id;
                    });
                    if (!(index > -1)) return [3 /*break*/, 3];
                    _d = utils_1.formatCollection;
                    return [4 /*yield*/, connection_1.default.collection("Favorites").get()];
                case 2:
                    favorites = _d.apply(void 0, [_e.sent()]);
                    indFav = favorites.findIndex(function (_a) {
                        var favMovieId = _a.movieId;
                        return favMovieId === movieId;
                    });
                    if (indFav > -1) {
                        connection_1.default.collection('Favorites').doc(favorites[indFav].id).delete();
                        res.json({ message: "favorite film ".concat(favorites[indFav].movieId, " removed") });
                    }
                    else {
                        res.status(404).json({ error: "404", message: "favorite movie not found" });
                    }
                    return [3 /*break*/, 4];
                case 3:
                    res.status(404).json({ error: "404", message: "User not found" });
                    _e.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
});
router.delete('/:id', function (_a, res) {
    var id = _a.params.id;
    return __awaiter(void 0, void 0, void 0, function () {
        var users, _b, index;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = utils_1.formatCollection;
                    return [4 /*yield*/, connection_1.default.collection("Users").get()];
                case 1:
                    users = _b.apply(void 0, [_c.sent()]);
                    index = users.findIndex(function (_a) {
                        var uid = _a.id;
                        return uid === id;
                    });
                    if (index > -1) {
                        connection_1.default.collection('Users').doc(id).delete();
                        res.json({ message: "user removed" });
                    }
                    else {
                        res.status(404).json({ error: "404", message: "User not found" });
                    }
                    return [2 /*return*/];
            }
        });
    });
});
exports.default = router;
