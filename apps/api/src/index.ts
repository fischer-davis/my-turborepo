import * as process from "node:process";
import fastifyCors from "@fastify/cors";
import { auth } from "@repo/auth";
import * as dotenv from "dotenv";
import fastify from "fastify";
import registerTrpc from "./trpc";

dotenv.config({ path: "../../.env.development" });

const baseCorsConfig = {
	origin: process.env.CORS_ORIGIN || "",
	methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
	credentials: true,
	maxAge: 86400,
};

const app = fastify({ logger: true });

app.register(fastifyCors, baseCorsConfig);

app.route({
	method: ["GET", "POST"],
	url: "/api/auth/*",
	async handler(request, reply) {
		try {
			const url = new URL(request.url, `http://${request.headers.host}`);
			const headers = new Headers();
			Object.entries(request.headers).forEach(([key, value]) => {
				if (value) headers.append(key, value.toString());
			});
			const req = new Request(url.toString(), {
				method: request.method,
				headers,
				body: request.body ? JSON.stringify(request.body) : undefined,
			});
			const response = await auth.handler(req);
			reply.status(response.status);
			response.headers.forEach((value, key) => reply.header(key, value));
			reply.send(response.body ? await response.text() : null);
		} catch (error) {
			app.log.error("Authentication Error:", error);
			reply.status(500).send({
				error: "Internal authentication error",
				code: "AUTH_FAILURE",
			});
		}
	},
});

registerTrpc(app);

const port = Number(process?.env?.VITE_SERVER_PORT || 3000);

app.listen({ port, host: "0.0.0.0" }, (err, address) => {
	if (err) {
		app.log.error(err);
		process.exit(1);
	}
	app.log.info(`server listening on ${address}`);
});
