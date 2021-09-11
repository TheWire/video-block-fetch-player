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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const util_1 = require("util");
const fs_1 = require("fs");
const server = (0, express_1.default)();
const fileInfo = (0, util_1.promisify)(fs_1.stat);
const fileName = "./powder-day.mp4";
server.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { size } = yield fileInfo(fileName);
    const range = req.headers.range;
    if (range) {
        const [start, end] = range.replace(/bytes=/, '').split('-');
        const startNum = parseInt(start, 10);
        const endNum = end ? parseInt(end, 10) : size - 1;
        res.writeHead(206, {
            'Content-Range': `bytes ${startNum}-${endNum}/${size}`,
            "Accept-Ranges": 'bytes',
            "content-Length": (endNum - startNum) + 1,
            'Content-Type': 'video/mp4'
        });
        (0, fs_1.createReadStream)(fileName, { start: startNum, end: endNum }).pipe(res);
    }
    else {
        res.writeHead(200, {
            'Content-Length': size,
            'Content-Type': 'video/mp4'
        });
        (0, fs_1.createReadStream)(fileName).pipe(res);
    }
}));
server.listen(1234);
