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

const normalizeData = (rawData: string): Rates => {
  const {rate} = JSON.parse(rawData)
  return {
    ...rate,
    rate: 1.0 / rate['rate']
  }
}

export const processData = async (): Promise<Rates> => {
  const rawData = await fetchData()
  return normalizeData(rawData)
}
