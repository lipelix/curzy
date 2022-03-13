import { processData } from '../feeders/revolutFeeder'
import { run } from './storeRates'

(async () => {
  await run(processData, 'REVOLUT')
})()