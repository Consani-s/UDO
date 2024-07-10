import express from 'express';
const server = express();
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';

server.use(bodyParser.raw({ type: 'application/octet-stream', limit: '500mb' }));
server.use(express.json({ limit: '500mb' }));
server.use(cors());
server.use(express.urlencoded({ extended: true }));

server.use(express.static(path.join(import.meta.dirname, '..', 'assets', 'views')));

server.listen(8080, function(){
    console.log("- - - ONLINE - - -");
})