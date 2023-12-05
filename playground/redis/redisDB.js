import { createClient } from "redis"
export const redisDB = createClient()
redisDB.on('error', (err) => console.log('Redis Client Error', err));
redisDB.on("connect", () => console.log("Established connection"));
try {
    await redisDB.connect();
    console.log("Connected");
}
catch (err) {
    console.log(err);
}
