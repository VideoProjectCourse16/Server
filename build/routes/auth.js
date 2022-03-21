"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var encryption_1 = require("../middlewares/auth/encryption");
var addUser_1 = require("../middlewares/auth/addUser");
var checkData_1 = require("../middlewares/auth/checkData");
var router = express_1.default.Router();
router.post("/signup", encryption_1.passwordEncryption, addUser_1.addUser, function (_, res) {
    res.status(200).json({
        message: "User ".concat(res.locals.username, " succesfully registered!"),
        user: res.locals.username
    });
});
router.post("/signin", checkData_1.checkData, function (_, res) {
    var user = res.locals.user;
    user = {
        id: user.id,
        username: user.username
    };
    res.status(200).json({
        message: "Succesfully logged in!",
        user: user
    });
});
exports.default = router;
