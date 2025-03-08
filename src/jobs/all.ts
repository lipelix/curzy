import { processData as processDataCsob } from '../feeders/csobFeeder'
import { processData as processDataRevolut } from '../feeders/revolutFeeder'
import { processData as processDataAirbankCard } from '../feeders/airbankCardFeeder'
import { processData as processDataAirbankSepa } from '../feeders/airbankSepaFeeder'
import { run } from './storeRates'

(async () => {
  try {
    console.log('🚀 Starting jobs...');
    await run(processDataCsob)
    await run(processDataRevolut)
    await run(processDataAirbankCard)
    await run(processDataAirbankSepa)
    console.log('✅ All jobs done');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error in jobs:', err);
    process.exit(1);
  }
})()