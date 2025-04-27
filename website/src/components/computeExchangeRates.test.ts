import { computeExchangeRates } from './HomePage'

test('computeExchangeRates', () => {
  expect(computeExchangeRates).toBeDefined()
  const rates = [
    {
      from: 'CZK',
      to: 'EUR',
      rate: 25.063137405643012,
      timestamp: 1745573288857,
      institution: 'REVOLUT' as Institutions,
      paymentType: 'CARD' as PaymentTypes,
      fee: 0,
    },
    {
      from: 'CZK',
      to: 'EUR',
      rate: 25.675,
      timestamp: 1745510400000,
      institution: 'AIRBANK' as Institutions,
      paymentType: 'SEPA' as PaymentTypes,
      fee: 0,
    },
    {
      from: 'CZK',
      to: 'EUR',
      rate: 25.675,
      timestamp: 1745510400000,
      institution: 'AIRBANK' as Institutions,
      paymentType: 'CARD' as PaymentTypes,
      fee: 0,
    },
    {
      from: 'CZK',
      to: 'EUR',
      rate: 25.626,
      timestamp: 1745539200000,
      institution: 'CSOB' as Institutions,
      paymentType: 'SEPA' as PaymentTypes,
      fee: 0,
    },
  ]

  const fees = {
    BINANCE: {
      CARD: {
        type: 'percentage' as FeesTypes,
        value: 2,
      },
      SEPA: {
        type: 'fixed' as FeesTypes,
        value: 1,
      },
    },
  }
  const result = computeExchangeRates(100, rates, fees) // 100 is the amount in EUR
  expect(result).toStrictEqual([
    {
      rate: '25.06 Kč / 1 €',
      timestamp: 1745573288857,
      institution: 'REVOLUT',
      price: '2556 Kč',
      paymentType: 'CARD',
      institutionFee: '0 %',
      institutionFeePrice: '0 Kč',
      cryptoExchangeFee: '2 %',
      cryptoExchangeFeePrice: '50 Kč',
      isCryptoExchangeFixedFee: false,
      cheapest: true,
      priceDifference: '+0 Kč',
    },
    {
      rate: '25.63 Kč / 1 €',
      timestamp: 1745539200000,
      institution: 'CSOB',
      price: '2588 Kč',
      paymentType: 'SEPA',
      institutionFee: '0 %',
      institutionFeePrice: '0 Kč',
      cryptoExchangeFee: '1 €',
      cryptoExchangeFeePrice: '26 Kč',
      isCryptoExchangeFixedFee: true,
      cheapest: false,
      priceDifference: '+32 Kč',
    },
    {
      rate: '25.68 Kč / 1 €',
      timestamp: 1745510400000,
      institution: 'AIRBANK',
      price: '2593 Kč',
      paymentType: 'SEPA',
      institutionFee: '0 %',
      institutionFeePrice: '0 Kč',
      cryptoExchangeFee: '1 €',
      cryptoExchangeFeePrice: '26 Kč',
      isCryptoExchangeFixedFee: true,
      cheapest: false,
      priceDifference: '+37 Kč',
    },
    {
      rate: '25.68 Kč / 1 €',
      timestamp: 1745510400000,
      institution: 'AIRBANK',
      price: '2619 Kč',
      paymentType: 'CARD',
      institutionFee: '0 %',
      institutionFeePrice: '0 Kč',
      cryptoExchangeFee: '2 %',
      cryptoExchangeFeePrice: '51 Kč',
      isCryptoExchangeFixedFee: false,
      cheapest: false,
      priceDifference: '+62 Kč',
    },
  ])
})
