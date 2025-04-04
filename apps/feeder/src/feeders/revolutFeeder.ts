import puppeteer from 'puppeteer';
import retry from 'async-await-retry';

const fetchData = async (): Promise<string> => {
  const browser = await puppeteer.launch({headless: true, args:['--no-sandbox']});
  const page = await browser.newPage();
  await retry(async () => {
    return page.goto(`https://www.revolut.com/api/exchange/quote?amount=1&country=CZ&fromCurrency=CZK&isRecipientAmount=false&toCurrency=EUR`)
  }, undefined, {retriesMax: 4, interval: 100, exponential: true, factor: 2, jitter: 100})

  const rawData = await page.$eval('pre', (el) => {
    const element = el as HTMLElement
    return element.innerText
  })

  await browser.close()
  return rawData
};

const normalizeData = (rawData: string): RatesDb => {
  const {rate} = JSON.parse(rawData)
  return {
    ...rate,
    'rate': 1.0 / rate['rate'],
    'institution': 'REVOLUT',
    'paymentType': 'CARD',
    'fee': 0,
  }
}

export const processData = async (): Promise<RatesDb> => {
  console.log(`⬇️ Fetching data from Revolut...`);
  const rawData = await fetchData()
  console.log('✅ Data fetched from Revolut');
  return normalizeData(rawData)
}
