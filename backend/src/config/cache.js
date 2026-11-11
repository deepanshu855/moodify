// This file is for redis

const Redis = require("ioredis"); // WE ADD DEFAULT TO GET SUGGESTION

const redis = new Redis(process.env.REDIS_URL);

redis.on("connect", () => {
  console.log("Server connected to redis");
});

redis.on("error", (err) => {
  console.log("Redis error ", err);
});

module.exports = redis;
