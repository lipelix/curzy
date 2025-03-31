type ParsedRecordsCsob = Array<{
  'Země': string,
  'Množství': number,
  'Měna': string,
  'Změna': number,
  'Nákup': Array<number>,
  'Prodej': Array<number>,
  'Střed': Array<number>,
  'LastUpdate': string,
}>

type RatesDb = {
  'from': string,
  'to': string,
  'rate': number,
  'timestamp': EpochTimeStamp,
  'institution': Institutions,
  'paymentType': PaymentTypes,
  'fee': number,
}

type PaymentTypes =
  'CARD' |
  'SEPA'

type Institutions =
  'REVOLUT' |
  'CSOB' |
  'AIRBANK'

type AirbankRate = {
  code: string,
  buy: number,
  diameter: number,
  sell: number,
  quantity: number,
  image: string,
  isIncomingPayments: boolean,
  isOutgoingPayments: boolean,
  isCreditCard: boolean,
  cnbVariance: number,
  country: string,
  lastRevisionDate: string,
  __typename: string
}