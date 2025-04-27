type PaymentTypes = 'CARD' | 'SEPA'

type RatesDb = {
  from: string
  to: string
  rate: number
  timestamp: EpochTimeStamp
  institution: Institutions
  paymentType: PaymentTypes
  fee: number
}

type FeesTypes = 'fixed' | 'percentage'

type Fees = {
  BINANCE: {
    CARD: {
      type: FeesTypes
      value: number
    }
    SEPA: {
      type: FeesTypes
      value: number
    }
  }
}

type Institutions = 'REVOLUT' | 'CSOB' | 'AIRBANK'

type RatesCollection = Array<RatesDb>

type RatesTable = {
  rate: string
  timestamp: EpochTimeStamp
  institution: Institutions
  price: string
  priceDifference: string
  paymentType: string
  institutionFee: string
  institutionFeePrice: string
  cryptoExchangeFee: string
  cryptoExchangeFeePrice: string
  cheapest: boolean
}

type RatesTableCollection = Array<RatesTable>
