type ParsedRecordsCsob = Array<{
  'Země': String,
  'Množství': number,
  'Měna': String,
  'Změna': number,
  'Nákup': Array<number>,
  'Prodej': Array<number>,
  'Střed': Array<number>
}>

type Rates = {
  'from': String,
  'to': String,
  'rate': number,
  'timestamp': EpochTimeStamp 
}

type Institutions =
  'REVOLUT' |
  'CSOB'