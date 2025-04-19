import { Header, Label, Table, Image } from 'semantic-ui-react'

const InstitutionIcons = {
  REVOLUT: 'revolut-icon.png',
  CSOB: 'csob-icon.png',
  AIRBANK: 'airbank-icon.png',
}

const RatesTable: React.FC<{ rates: RatesTableCollection }> = ({ rates }) => {
  return (
    <Table striped padded="very">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Institution</Table.HeaderCell>
          <Table.HeaderCell>Price</Table.HeaderCell>
          <Table.HeaderCell>Fee</Table.HeaderCell>
          <Table.HeaderCell>Type</Table.HeaderCell>
          <Table.HeaderCell>
            <Header size="tiny">
              Rate
              <Header.Subheader>Last updated</Header.Subheader>
            </Header>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {rates.map((row: RatesTable) => (
          <Table.Row key={`${row.institution}_${row.paymentType}`}>
            <Table.Cell>
              {row.cheapest && (
                <Label ribbon color="green" style={{ display: 'block', margin: '-2em 0 1em -1em' }}>
                  Cheapest
                </Label>
              )}
              {!row.cheapest && (
                <Label ribbon color="red" style={{ display: 'block', margin: '-2em 0 1em -1em' }}>
                  {row.priceDifference}
                </Label>
              )}
              <Image src={InstitutionIcons[row.institution]} size="mini" spaced />
              <span>{row.institution}</span>
            </Table.Cell>
            <Table.Cell>
              <Header as="h1">{row.price}</Header>
            </Table.Cell>
            <Table.Cell>
              <Header size="tiny">
                {row.cryptoExchangeFeePrice}
                <Header.Subheader>{row.cryptoExchangeFee}</Header.Subheader>
              </Header>
            </Table.Cell>
            <Table.Cell>{row.paymentType}</Table.Cell>
            <Table.Cell>
              <Header size="tiny">
                {row.rate}
                <Header.Subheader>{new Date(row.timestamp).toLocaleString()}</Header.Subheader>
              </Header>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default RatesTable
