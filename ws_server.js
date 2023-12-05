import WebSocket, { WebSocketServer } from 'ws'
import { WsActions } from './js/wsActions.js'
import { RedisData } from './js/redisHandler.js'
const wss = new WebSocketServer({ port: 8080 });

try {
    await RedisData.connectRedis();
}
catch (err) {
    console.log("Unexpected error while connecting to REDIS " + err);
}


console.log("Server turned on port 8080")
let counter = 0;
wss.on('connection', async function connection(ws) {
    counter++;
    console.log("Received connection: " + counter);
    const connection = new WsActions(ws);
    ws.on('error', console.error);
    ws.on('message', function message(data) {
        let data_obj;
        try {
            data_obj = JSON.parse(data);
            console.log(data_obj);
        }
        catch (err) {
            console.error("Could not parse request, bad data.");
            connection.error();
            return;
        }
        switch (data_obj.action) {
            case "establish":
                connection.establish(data_obj.uuid);
                break;
            case "register":
                connection.register(data_obj);
                break;
            default:
                connection.error("Bad Request. Every request must contain action parameter and appropriate data for the actions.");
                break;
        }
    });

});

