import {
  OpenAPIRoute,
  OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import { RatesSchema } from "../schema";
import { logger } from "../logger";
import { getLatestRates } from "../db/rates";

export class RatesFetch extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["Rates"],
    summary: "List of rates for each payment and institution type",
    description:
      "Retrieves the latest rates for each payment and institution type. List is used to calculate the best rate for each payment type on frontend.",
    responses: {
      "200": {
        description:
          "Exchange rates for each payment and institution type. The response contains an array of rates, each with the following fields: `from`, `to`, `rate`, `timestamp`, `institution`, `paymentType`, and `fee`.",
        schema: RatesSchema,
      }
    },
  };

  async handle(
    request: Request,
    env: any,
    context: any,
    _data: Record<string, any>
  ) {
    const rates = await getLatestRates(context.db);
    return rates;
  }
}
