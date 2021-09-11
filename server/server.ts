import express from "express";
import { promisify } from "util";
import { stat, createReadStream, createWriteStream } from "fs";

const server = express();

const fileInfo = promisify(stat);
const fileName = "./powder-day.mp4";

server.get('/', async (req, res, next) => {
    const { size } = await fileInfo(fileName);
    const range = req.headers.range;
    if (range) {
        const [start, end] = range.replace(/bytes=/, '').split('-');
        const startNum = parseInt(start,10);
        const endNum = end ? parseInt(end, 10) : size - 1;
        res.writeHead(206, {
            'Content-Range': `bytes ${startNum}-${endNum}/${size}`,
            "Accept-Ranges": 'bytes',
            "content-Length": (endNum-startNum) + 1,
            'Content-Type': 'video/mp4'
        });
        createReadStream(fileName, { start:startNum, end:endNum }).pipe(res);
    } else {
        res.writeHead(200, {
            'Content-Length': size,
            'Content-Type': 'video/mp4'
        });
        createReadStream(fileName).pipe(res);
    }

});



server.listen(1234);