// This file is for redis

const Redis = require("ioredis"); // WE ADD DEFAULT TO GET SUGGESTION

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

redis.on("connect", () => {
  console.log("Server connected to redis");
});

redis.on("error", (err)=>{
    console.log("Redis error ", err)
})

module.exports = redis;
