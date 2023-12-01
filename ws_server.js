const ws = require('ws').Server
const { WsActions } = require('./js/wsActions')
const { RedisData } = require('./js/redisHandler')
const wss = new ws({ port: 8080 });

setTimeout(() => {
    RedisData.connectRedis();
}, 2000);

console.log("Server turned on port 8080")
counter = 0;
wss.on('connection', async function connection(ws) {
    counter++;
    console.log("Received connection: " + counter);
    const connection = new WsActions(ws);
    ws.on('error', console.error);
    ws.on('message', function message(data) {
        const data_obj = JSON.parse(data);
        console.log(data_obj);
        switch (data_obj.action) {
            case "establish":
                connection.establish(data_obj.uuid);
                break;
            case "register":
                connection.register(data_obj.uuid, data_obj.payload.name, data_obj.payload.email);
                break;
            default:
                break;
        }
    });

});

