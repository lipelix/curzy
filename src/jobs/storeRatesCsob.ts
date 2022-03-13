import { processData } from '../feeders/csobFeeder'
import { run } from './storeRates'

(async () => {
  await run(processData, 'CSOB')
})()