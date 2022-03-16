"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
var port = 3000;
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.get('/ciao', function (req, res) {
    res.json({ message: "HI" });
});
app.listen(port, function () { return console.log("Project Work Server Is Running, port: " + port); });
