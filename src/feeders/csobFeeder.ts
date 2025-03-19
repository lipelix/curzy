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

  const [lastUpdate] = rawData.split(';;;;Devizy')
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
        'Střed': record['Střed'].map((value: string) => parseFloat(value.replace(',', '.'))),
        'LastUpdate': lastUpdate.trim()
      }
    }
  });

  return records
};

const normalizeData = (records: ParsedRecordsCsob): RatesDb => {
  const recordEUR = records.find((record) => record['Měna'] === 'EUR') || {'Prodej': [NaN], 'LastUpdate': '0'}
  const timestamp = Date.parse(recordEUR['LastUpdate'])

  return {
    'from': 'CZK',
    'to': 'EUR',
    'rate': recordEUR['Prodej'][0],
    'timestamp': timestamp,
    'institution': 'CSOB',
    'paymentType': 'SEPA',
    'fee': 0,
  }
}

export const processData = async (): Promise<RatesDb> => {
  console.log(`⬇️ Fetching data from CSOB...`);
  const rawData = await fetchData()
  console.log('✅ Data fetched from CSOB');
  return normalizeData(rawData)
}
