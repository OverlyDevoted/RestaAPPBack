const express = require('express');
const path = require('path');

const cors = require('cors')
const app = new express();

process.title = "RestaAR";
app.use(cors());
app.use(express.json());
app.get('/api/test', function (request, response) {
    console.log("Got request")
    return response.json({response:"MF"})
});

app.listen(3000, function () {
    console.log("Demo running at http://localhost:3000/");
});
