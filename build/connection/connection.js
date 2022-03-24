"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("firebase-admin/app");
var firestore_1 = require("firebase-admin/firestore");
var serviceAccount = require('../../config.json');
(0, app_1.initializeApp)({ credential: (0, app_1.cert)(serviceAccount) });
var db = (0, firestore_1.getFirestore)();
exports.default = db;
