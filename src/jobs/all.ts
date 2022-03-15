import { processData as processDataCsob } from '../feeders/csobFeeder'
import { processData as processDataRevolut } from '../feeders/revolutFeeder'
import { run } from './storeRates'

(async () => {
  try {
    await run(processDataCsob, 'CSOB')
    await run(processDataRevolut, 'REVOLUT')
    process.exit(0);
  } catch (err) {
    process.exit(1);
  }
})()