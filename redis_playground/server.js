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
    console.time("/api/test took")
    console.log(request.body);
    const body = [request.body];
    redisDB.json.set(`uuid:${request.body.uuid}`,'$', body.map(({uuid, ...rest})=>rest)[0])
    response.sendStatus(200);
    console.timeEnd("/api/test took");
});
app.get('/api/get', async function (request, response) {
    console.time("/api/test took")
    const uuid = request.query.uuid;
    console.log(uuid);
    const answa = await redisDB.json.get(`uuid:${uuid}`)
    console.log(answa);
    response.sendStatus(200);
    console.timeEnd("/api/test took");
});
app.get('/api/flush', async function (request, response){
    
    const res = await redisDB.flushAll();
    response.json("{redis:"+ res +"}")
})
app.listen(3000, function () {
    console.log("Demo running at http://localhost:3000/");
});
