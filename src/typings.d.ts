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

type Rates = {
  'from': string,
  'to': string,
  'rate': number,
  'timestamp': EpochTimeStamp 
}

type RatesDb = {
  'from': string,
  'to': string,
  'rate': number,
  'timestamp': EpochTimeStamp,
  'institution': Institutions
}

type Institutions =
  'REVOLUT' |
  'CSOB'