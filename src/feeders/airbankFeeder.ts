import puppeteer from 'puppeteer';
import retry from 'async-await-retry';
import { exit } from 'process';

const fetchData = async (): Promise<Array<AirbankRate>> => {
  const browser = await puppeteer.launch({headless: false, args:['--no-sandbox']});
  const page = await browser.newPage();
  let rawData = null;

  page.on('requestfinished', async (request) => {
    const response = await request.response();
    if (!response) return

    let responseBody;
    if (request.url() === 'https://www.airbank.cz/graphql') {
        responseBody = await response.json()
        const [{data}] = responseBody
        rawData = data.exchangeRates.rates
    }
  });

  await retry(async () => {
    return page.goto(`https://www.airbank.cz/kurzovni-listek/`, { waitUntil: 'networkidle0' })
  }, undefined, {retriesMax: 4, interval: 100, exponential: true, factor: 2, jitter: 100})

  await browser.close()

  if (!rawData) {
    exit(1)
  }

  return rawData
};

const normalizeData = (rawData: Array<AirbankRate>): RatesDb => {
  const rateEUR = rawData.find((rate) => rate.code === 'EUR')

  if (!rateEUR) {
    exit(1)
  }

  const timestamp = Date.parse(rateEUR['lastRevisionDate'])

  return {
    'from': 'CZK',
    'to': 'EUR',
    'rate': rateEUR['sell'],
    'timestamp': timestamp,
    'institution': 'AIRBANK',
    'paymentType': 'CARD',
    'fee': 0,
  }
}

export const processData = async (): Promise<RatesDb> => {
  const rawData = await fetchData()
  return normalizeData(rawData)
}
