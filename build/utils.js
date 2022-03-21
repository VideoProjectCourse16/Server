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
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatCollection = void 0;
var formatCollection = function (collection) {
    var data = [];
    collection.forEach(function (doc) {
        data.push(__assign({ id: doc.id }, doc.data()));
    });
    return data;
};
exports.formatCollection = formatCollection;
