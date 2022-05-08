import { processData as processDataCsob } from '../feeders/csobFeeder'
import { processData as processDataRevolut } from '../feeders/revolutFeeder'
import { processData as processDataAirbankCard } from '../feeders/airbankCardFeeder'
import { processData as processDataAirbankSepa } from '../feeders/airbankSepaFeeder'
import { run } from './storeRates'

(async () => {
  try {
    await run(processDataCsob)
    await run(processDataRevolut)
    await run(processDataAirbankCard)
    await run(processDataAirbankSepa)
    process.exit(0);
  } catch (err) {
    process.exit(1);
  }
})()