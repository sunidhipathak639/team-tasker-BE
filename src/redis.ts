import redis from "redis";

const client = redis.createClient({
  host: "localhost", // Default Redis host
  port: 6379, // Default Redis port
});

client.on("connect", () => {
  console.log("Connected to Redis");
});

export default client;
