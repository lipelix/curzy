import { processData as processDataCsob } from '../feeders/csobFeeder'
import { processData as processDataRevolut } from '../feeders/revolutFeeder'
import { run } from './storeRates'

(async () => {
  await run(processDataCsob, 'CSOB')
  await run(processDataRevolut, 'REVOLUT')
})()