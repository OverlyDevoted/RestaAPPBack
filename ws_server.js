const ws = require('ws').Server

const { WsActions } = require('./js/wsActions')

const wss = new ws({ port: 8080 });
connections = {}
console.log("Server turned on port 8080")

wss.on('connection', function connection(ws) {
    const connection = new WsActions(ws)
    ws.on('error', console.error);
    ws.on('message', function message(data) {
        const data_obj = JSON.parse(data);
        console.log(data_obj);
        switch(data_obj.action){
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

