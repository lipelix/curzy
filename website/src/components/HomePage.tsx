import { useEffect, useState } from 'react'
import ReactGA from 'react-ga4'
import { Input, Label, Header, Image, Tab, Menu, Divider, Dimmer, Loader } from 'semantic-ui-react'
import axios from 'axios'
import { ROUTES } from '../apiRoutes'
import RatesTable from './RatesTable'
import { PriceSegment } from './PriceSegment'

ReactGA.initialize([
  {
    trackingId: process.env.REACT_APP_GA_TRACKING_ID || '',
  },
])
ReactGA.send({ hitType: 'pageview', page: window.location.pathname })

export const computeExchangeRates = (wantAmount: number, rates: RatesCollection, fees: Fees) => {
  return rates
    .map((rate) => {
      const paymentType = rate.paymentType
      const rawPrice = rate.rate * wantAmount
      const institutionFeePrice = rate.fee * wantAmount
      const isCryptoExchangeFixedFee = fees.BINANCE[paymentType].type === 'fixed'
      const cryptoExchangeFee = fees.BINANCE[paymentType].value
      const cryptoExchangeFeePrice = isCryptoExchangeFixedFee
        ? fees.BINANCE[paymentType].value * rate.rate
        : (rawPrice + institutionFeePrice) * (fees.BINANCE[paymentType].value / 100) // only Binance for now
      const price = rawPrice + institutionFeePrice + cryptoExchangeFeePrice

      return {
        rate: rate.rate,
        timestamp: rate.timestamp,
        institution: rate.institution,
        price: price,
        paymentType: rate.paymentType,
        institutionFee: rate.fee,
        institutionFeePrice: institutionFeePrice,
        cryptoExchangeFee: cryptoExchangeFee,
        cryptoExchangeFeePrice: cryptoExchangeFeePrice,
        isCryptoExchangeFixedFee: isCryptoExchangeFixedFee,
      }
    })
    .sort((a, b) => a.price - b.price)
    .map((rate, index, array) => ({
      ...rate,
      cheapest: index === 0,
      priceDifference: index === 0 ? 0 : rate.price - array[0].price,
    }))
    .map((rate) => ({
      ...rate,
      rate: `${rate.rate.toFixed(2)} Kč / 1 €`,
      price: `${rate.price.toFixed(0)} Kč`,
      priceDifference: `+${rate.priceDifference.toFixed(0)} Kč`,
      institutionFee: `${rate.institutionFee} %`,
      institutionFeePrice: `${rate.institutionFeePrice.toFixed(0)} Kč`,
      cryptoExchangeFee: rate.isCryptoExchangeFixedFee
        ? `${rate.cryptoExchangeFee} €`
        : `${rate.cryptoExchangeFee} %`,
      cryptoExchangeFeePrice: `${rate.cryptoExchangeFeePrice.toFixed(0)} Kč`,
    }))
}

function HomePage() {
  const [rates, setRates] = useState<RatesCollection>([])
  const [fees, setFees] = useState<Fees>({
    BINANCE: {
      CARD: {
        type: 'percentage',
        value: 0,
      },
      SEPA: {
        type: 'fixed',
        value: 0,
      },
    },
  })
  const [computedRates, setComputedRates] = useState<RatesTableCollection>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rates = await axios(ROUTES.RATES)
        const fees = await axios(ROUTES.FEES)
        setRates(rates.data)
        setFees(fees.data)
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="HomePage">
      <Divider hidden />
      <Header size="medium" inverted>
        I want send
      </Header>
      <Input
        labelPosition="right"
        type="number"
        min={0}
        step={1}
        onChange={(event) => {
          const wantAmountValue = parseInt(event.target.value)
          ReactGA.event({
            category: 'USER',
            action: 'CHANGE_PRICE_AMOUNT',
            value: wantAmountValue,
            transport: 'xhr',
          })
          const computedRates = computeExchangeRates(wantAmountValue, rates, fees)
          setComputedRates(computedRates)
        }}
      >
        <Label basic>EUR</Label>
        <input />
        <Label basic>€</Label>
      </Input>
      <Header size="medium" inverted>
        to
      </Header>
      <Tab
        menu={{ secondary: true, style: { display: 'flex', justifyContent: 'center' } }}
        panes={[
          {
            menuItem: (
              <Menu.Item
                key="binance"
                onClick={() => {
                  ReactGA.event({
                    category: 'USER',
                    action: 'CHANGE_EXCHANGE',
                    label: 'binance',
                    transport: 'xhr',
                  })
                }}
              >
                <Image src="/binance-icon.png" alt="binance-logo" size="small" />
              </Menu.Item>
            ),
            render: () => (
              <>
                <PriceSegment computedRates={computedRates} />
                {computedRates[0] && (
                  <Tab.Pane>
                    <RatesTable rates={computedRates} />
                  </Tab.Pane>
                )}
              </>
            ),
          },
        ]}
      />
      {loading && (
        <Dimmer active>
          <Loader size="large">Loading</Loader>
        </Dimmer>
      )}
    </div>
  )
}

export default HomePage
