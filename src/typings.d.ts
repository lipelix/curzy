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
}

type PaymentTypes =
  'CARD' |
  'SEPA'

type Institutions =
  'REVOLUT' |
  'CSOB'