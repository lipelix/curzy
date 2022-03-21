import { processData as processDataCsob } from '../feeders/csobFeeder'
import { processData as processDataRevolut } from '../feeders/revolutFeeder'
import { run } from './storeRates'

(async () => {
  try {
    await run(processDataCsob)
    await run(processDataRevolut)
    process.exit(0);
  } catch (err) {
    process.exit(1);
  }
})()