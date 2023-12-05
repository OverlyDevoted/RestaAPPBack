/**
 * Send data to the provided websocket connection.
 * @param {WebSocket} ws Websocket connection to sent the data to.
 * @param {String} data Data to send. Has to be a JSON turned into a string.
 */
export const send = async (ws, data) => {
    console.log("Sending data: " + data);
    await ws.send(data);
}
