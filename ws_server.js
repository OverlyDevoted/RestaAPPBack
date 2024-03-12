import WebSocket, { WebSocketServer } from 'ws'
import { WsActions } from './js/wsActions.js'
import { getTimestamp } from './js/stringUtils.js'
const wss = new WebSocketServer({ port: 8080 });



console.log("Server turned on port 8080")
let counter = 0;
wss.on('connection', async function connection(ws) {
    counter++;
    console.log(getTimestamp() + " Received connection. Connection occurance " + counter);
    const connection = new WsActions(ws);
    ws.on('error', console.error);
    ws.on('message', function message(data) {
        let data_obj;
        try {
            data_obj = JSON.parse(data);
            console.log("Received data is " + new Blob([data]).size + " bytes");
            console.log(data_obj);
        }
        catch (err) {
            console.error("Could not parse request, bad data.");
            connection.error();
            return;
        }
        console.log("Starting " + data_obj.action + " action.");
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

