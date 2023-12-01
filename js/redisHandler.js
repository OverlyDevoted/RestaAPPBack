const Redis = require('redis')
class RedisData {
    static redisUp = false;
    static redisClient = Redis.createClient({
        host: 'redis-server',
        port: 6379
    }).on("connect", () => {
        console.log("Established connection");
    }).on("error", (err) => {
        if (RedisData.redisUp) {
            RedisData.redisUp = false;
            console.log("disconnect " + RedisData.redisUp)
        }
    }).on("ready", () => {
        console.log("Redis Client ready to use..")
    });
    static async connectRedis() {
        console.log("Attempting to connect to Redis")

        try {
            await RedisData.redisClient.connect();
            RedisData.redisUp = true;
        }
        catch (e) {
            console.log("Could not connect to redis");
        }
    }
}

module.exports = { RedisData }