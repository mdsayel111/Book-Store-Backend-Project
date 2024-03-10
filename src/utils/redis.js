const { createClient } = require("redis");
const redisClient = createClient({
  password: "WSywvtVVdSW8gJNvqndF3gpBwWLjJww6",
  socket: {
    host: "redis-10965.c274.us-east-1-3.ec2.cloud.redislabs.com",
    port: 10965,
  },
})

module.exports = { redisClient };
