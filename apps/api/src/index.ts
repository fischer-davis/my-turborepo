import * as process from "node:process";
import { auth } from "@repo/auth";
import * as dotenv from "dotenv";
import fastify from "fastify";
import FastifyBetterAuth from "fastify-better-auth";
import registerTrpc from "./trpc";

dotenv.config({ path: "../../.env.development" });

const app = fastify({ logger: true });

await app.register(FastifyBetterAuth, { auth });
registerTrpc(app);

const port = Number(process?.env?.VITE_SERVER_PORT || 3000);

app.listen({ port, host: '0.0.0.0' }, function (err, address) {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  app.log.info(`server listening on ${address}`)
})
