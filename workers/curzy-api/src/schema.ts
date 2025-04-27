import { z } from "zod";

export const FeesSchema = z
  .object({
    BINANCE: z.object({
      CARD: z.object({
        type: z.enum(["percentage"]),
        value: z.number(),
      }),
      SEPA: z.object({
        type: z.enum(["percentage", "fixed"]),
        value: z.number(),
      }),
    }),
  })
  .openapi("FeesSchema", {
    description: "Exchange fees for each payment and institution type",
  });

export const RatesSchema = z
  .array(
    z
      .object({
        from: z.string(),
        to: z.string(),
        rate: z.number(),
        timestamp: z.number(),
        institution: z.string(),
        paymentType: z.enum(["CARD", "SEPA"]),
        fee: z.number(),
      })
      .openapi({
        description: "Rate object",
        example: {
          from: "CZK",
          to: "EUR",
          rate: 25.0753594904616,
          timestamp: 1743449591256,
          institution: "REVOLUT",
          paymentType: "CARD",
          fee: 0,
        },
      })
  )
  .openapi("RatesSchema", {
    description: "Array of rate objects",
    example: [
      {
        from: "CZK",
        to: "EUR",
        rate: 25.0753594904616,
        timestamp: 1743449591256,
        institution: "REVOLUT",
        paymentType: "CARD",
        fee: 0,
      },
      {
        from: "CZK",
        to: "EUR",
        rate: 25.699,
        timestamp: 1743174000000,
        institution: "AIRBANK",
        paymentType: "SEPA",
        fee: 0,
      },
      {
        from: "CZK",
        to: "EUR",
        rate: 25.699,
        timestamp: 1743174000000,
        institution: "AIRBANK",
        paymentType: "CARD",
        fee: 0,
      },
    ],
  });
