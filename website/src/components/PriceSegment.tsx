import { Divider, Header } from 'semantic-ui-react'

export const PriceSegment: React.FC<{ computedRates: RatesTableCollection }> = ({ computedRates }) => {
  if (!computedRates[0]) return null

  return (
    <>
      <Divider />
      <Header size="large" inverted>
        {computedRates[0].price}
        <Header.Subheader>
          Pay with <strong>{computedRates[0].institution}</strong>
        </Header.Subheader>
      </Header>
      <Divider />
    </>
  )
}
