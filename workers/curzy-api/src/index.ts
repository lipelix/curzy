import { OpenAPIRouter } from "@cloudflare/itty-router-openapi";
import { RatesFetch } from "./endpoints/rates-fetch";
import { FeesFetch } from "./endpoints/fees-fetch";
import { MongoClient } from "mongodb";
import { logger } from "./logger";

export type Env = {
  MONGO_DB_URI: string;
};

export const router = OpenAPIRouter({
  docs_url: "/swagger",
  redoc_url: "/docs",
  schema: {
    info: { version: "1.0.0", title: "Curzy API" },
    security: [],
  },
});

const databaseMiddleware = async (request: Request, env: any, context: any) => {
  let client;
  try {
    if (!process.env.MONGO_DB_URI) {
      throw new Error("Please provide a valid MongoDB URI");
    }

    logger(request)("🔌 Connecting to db...");
    client = await MongoClient.connect(process.env.MONGO_DB_URI);
    logger(request)("🤝 Connected to db");

    context.db = client.db("curzy-production-cluster");
  } catch (err) {
    logger(request)(`Error when connecting to database: ${err}`, "ERROR");
    if (client) client.close();
  }
};

router.get("/v1/rates", databaseMiddleware, RatesFetch);
router.get("/v1/fees", FeesFetch);

// 404 for everything else
router.all("*", () =>
  Response.json(
    {
      success: false,
      error: "Route not found",
    },
    { status: 404 }
  )
);

export default {
  fetch: async (request: Request, env: any, context: any, data: any) => {
    const requestLogMessage = {
      method: request.method,
      url: request.url,
      host: request.headers.get("host"),
      referer: request.headers.get("referer"),
      userAgent: request.headers.get("user-agent"),
      city: request.cf?.city,
      country: request.cf?.country,
      contentLength: request.headers.get("content-length"),
    };
    logger(request)("📨 Request received");
    return router.handle(request, env, context);
  },
};
