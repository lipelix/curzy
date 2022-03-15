import puppeteer from 'puppeteer';
import { parse } from 'csv-parse/sync';
import retry from 'async-await-retry';

export const fetchData = async (): Promise<ParsedRecordsCsob> => {
  const browser = await puppeteer.launch({headless: true, args:['--no-sandbox']});
  const page = await browser.newPage();
  await retry(async () => {
    return page.goto(`https://www.csob.cz/portal/lide/kurzovni-listek-old/-/date/kurzy.txt`)
  }, undefined, {retriesMax: 4, interval: 100, exponential: true, factor: 2, jitter: 100})

  const rawData = await page.$eval('pre', (el) => {
    const element = el as HTMLElement
    return element.innerText
  })
  await browser.close()

  const csv = rawData.slice(rawData.indexOf('Země'), rawData.length).trim()
  const records = parse(csv, {
    columns: true,
    group_columns_by_name: true,
    delimiter: ';',
    skip_empty_lines: true,
    on_record: (record) => {
      return {
        ...record,
        'Množství': parseInt(record['Množství']),
        'Změna': parseFloat(record['Změna']),
        'Nákup': record['Nákup'].map((value: string) => parseFloat(value.replace(',', '.'))),
        'Prodej': record['Prodej'].map((value: string) => parseFloat(value.replace(',', '.'))),
        'Střed': record['Střed'].map((value: string) => parseFloat(value.replace(',', '.')))
      }
    }
  });

  return records
};

const normalizeData = (records: ParsedRecordsCsob): Rates => {
  const recordEUR = records.find((record) => record['Měna'] === 'EUR') || {'Prodej': [NaN]}

  return {
    'from': 'CZK',
    'to': 'EUR',
    'rate': recordEUR['Prodej'][0],
    'timestamp': Date.now()
  }
}

export const processData = async (): Promise<Rates> => {
  const rawData = await fetchData()
  return normalizeData(rawData)
}
