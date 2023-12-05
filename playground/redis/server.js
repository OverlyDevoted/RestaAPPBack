import express from 'express';
import path from 'path';
import cors from 'cors'

import { redisDB } from "./redisDB.js";
console.log("Awaiting");
const app = new express();

process.title = "RestaAR";
app.use(cors());
app.use(express.json());

app.post('/api/json', async function (request, response) {
    console.time("/api/json took")
    console.log(request.body);
    const body = [request.body];
    redisDB.json.set(`uuid:${request.body.uuid}`, '$', body.map(({ uuid, ...rest }) => rest)[0])
    response.sendStatus(200);
    console.timeEnd("/api/json took");
});
app.post('/api/append', async function (request, response) {
    console.time("/api/append took")
    const { uuid, photo } = request.body;
    const answa = await redisDB.json.arrAppend(`uuid:${uuid}`, '.photos_taken', photo);

    console.log(answa);
    response.sendStatus(200);
    console.timeEnd("/api/append took");
});
app.get('/api/get', async function (request, response) {
    console.time("/api/get took")
    const uuid = request.query.uuid;

    const res = await redisDB.json.get(`uuid:${uuid}`, {path:['.photos_taken[0].link']})
    //const res = await redisDB.json.arrIndex(`uuid:${uuid}`, ".photos_taken", { qr_id: 112 });
    //const res = await redisDB.json.get(`uuid:${uuid}`, {path:['.photos_taken']})
    //const res = await redisDB.json.get(`uuid:${uuid}`)
    console.log(res);
    response.sendStatus(200);
    console.timeEnd("/api/get took");
});
app.get('/api/mem', async function (request, response) {
    console.time("/api/get took")
    const { uuid } = request.query;

    // const parameter = await redisDB.json.get(`uuid:${uuid}`, {path:['.photos_taken[0].link']})
    const mem = await redisDB.json.debugMemory(`uuid:${uuid}`);
    //const parameter = await redisDB.json.get(`uuid:${uuid}`, {path:['.photos_taken']})
    //const answa = await redisDB.json.get(`uuid:${uuid}`)
    console.log(mem);
    response.sendStatus(200);
    console.timeEnd("/api/get took");
});
app.get('/api/flush', async function (request, response) {

    const res = await redisDB.flushAll();
    response.json("{redis:" + res + "}")
})
app.listen(3000, function () {
    console.log("Demo running at http://localhost:3000/");
});
