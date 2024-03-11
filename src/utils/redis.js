const { createClient } = require("redis");
const redisClient = createClient({
  url: "rediss://default:AVNS__ltY2_LuBc5kiUjtdwa@redis-df7f372-mdsayel111-4ff0.a.aivencloud.com:22071",
});

// const Redis = require("ioredis");
// const redisUri =
//   "rediss://default:AVNS__ltY2_LuBc5kiUjtdwa@redis-df7f372-mdsayel111-4ff0.a.aivencloud.com:22071";
// const redisClient = new Redis(redisUri);

module.exports = { redisClient };
