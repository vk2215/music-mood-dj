import app from "./app.js";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { connectRedis } from "./config/redis.js";

async function startServer() {
  await connectDB();
  connectRedis(); 

  app.listen(ENV.PORT, () => {
    console.log(`Server running on http://localhost:${ENV.PORT}`);
  });
}

startServer();
