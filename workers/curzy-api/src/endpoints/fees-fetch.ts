import {
  OpenAPIRoute,
  OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import { FeesSchema } from "../schema";

export class FeesFetch extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["Fees"],
    summary: "Fetch current fees for payment and institution if available",
    description:
      "Retrieves current static fees for various payment methods. It is used in calculations to determine the best rate for each payment type on the frontend.",
    responses: {
      "200": {
        description:
          "Exchange fees for each payment and institution type - mapped by institution and payment type.",
        schema: FeesSchema,
      },
    },
  };

  async handle(
    request: Request,
    env: any,
    context: any,
    _data: Record<string, any>
  ) {
    const fees = {
      BINANCE: {
        CARD: {
          type: "percentage",
          value: 2, // 2% fee for card payments https://www.binance.com/en/fee/fiatFee
        },
        SEPA: {
          type: "fixed",
          value: 1, // 1 EUR fee for SEPA payments https://www.binance.com/en/fee/fiatFee
        },
      },
    };
    return fees;
  }
}
