const ws = require('ws').Server
const { nanoid } = require('nanoid')

const wss = new ws({ port: 8080 });
connections = {}
console.log("Server turned on port 8080")

wss.on('connection', function connection(ws) {
    
    ws.on('error', console.error);
    ws.on('message', function message(data) {
        
        const data_obj = JSON.parse(data);
        console.log(data_obj);
        switch(data_obj.action){
            case "establish":
                let user = data_obj.uuid? data_obj.uuid: nanoid();
                isRegistered = false;
                console.log("User uuid: " +data_obj.uuid);    
                if(data_obj.uuid)
                {
                    console.log("Check existing user")
                    // get from data base and instantiate object and if the user already has 
                    // name and email setup send that as a payload and change the action to registered   
                    isRegistered = connections.hasOwnProperty(user)
                    if(!isRegistered)
                        connections[user] = {}
                }
                send(ws, buildPayload(user,isRegistered? "registered" : "establish"));
                break;
            case "register":
                console.log(`User data: ${data_obj.payload.name}`)
                //data validation here
                const payload = validateRegister(data_obj.payload.name, data_obj.payload.email)
                let action = "registered"
                if(payload)
                    action = "failed"
                send(ws, buildPayload(data_obj.uuid,action, JSON.stringify(payload)));
                break;
            default:
                break;
        }
    });

});
const send = (ws, data) => {
    console.log("Sending data: " + data);
    ws.send(data);
}
const buildPayload = (user, action, payload) => {
    return `{"uuid":"${user}","action":"${action}","payload":` + (payload? payload : "\"none\"") +`}`
}
const validateRegister = (name, email) =>{
    let payload = ""
    if(name.length > 12)
        payload += "Name too long"
    else if (name.length == 0)
        payload += "Name too short"
    else if(name.length < 3)
        payload += "Enter name"
    let isEmail = EMAIL_REGEX.test(email);
    console.log(isEmail);
    if(email.length == 0)
        payload += ":Enter email"
    else if(!EMAIL_REGEX.test(email))
        payload += ":Not a email"
    console.log(payload)
    return payload
}
const EMAIL_REGEX = /^[A-z,0-9]*@[A-z]*\.[a-z]*$/