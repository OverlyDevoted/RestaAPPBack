const ws = require('ws')
const wss = new ws.WebSocketServer({port:8080});
console.log("Server turned on port 8080")

wss.on('connection', async function connection(ws) {
    console.log(getTimestamp() + " Received connection. Connection occurance " + counter);
    const connection = new WsActions(ws);
    ws.on('error', console.error);
    ws.on('message', function message(data) {
        
    });
});

module.exports = wss;