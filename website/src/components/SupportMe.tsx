import React from 'react'
import QRCode from 'react-qr-code'
import { Container, Divider, Header, Icon, Image, Label, Message, Modal } from 'semantic-ui-react'

const CRYPTO_ADDRESS = {
  BTC: 'bc1qrt6m8lpn3jseexvg73lm9ghwducudyqqmfqe0u',
  ETH: '0xfb48e55D90F21B0f13fA65DF1AB9bC5448fcbfc5',
}

export const SupportMe = () => {
  const [openBTC, setOpenBTC] = React.useState(false)
  const [openETH, setOpenETH] = React.useState(false)

  return (
    <>
      <div>
        <Divider />
        <Header as="h4" inverted>
          <Icon name="heart" /> Donate if you like
        </Header>
        <Label as="h5" color="black">
          <Image src="/bitcoin-icon.png" alt="bitcoin-logo" size="mini" verticalAlign="middle" spaced />
          {CRYPTO_ADDRESS.BTC}
          <Label.Detail onClick={() => setOpenBTC(true)} style={{ cursor: 'pointer' }}>
            <Icon name="qrcode" size="big" />
          </Label.Detail>
        </Label>
        <Label as="h5" color="black">
          <Image src="/ethereum-icon.png" alt="ethereum-logo" size="mini" verticalAlign="middle" spaced />
          {CRYPTO_ADDRESS.ETH}
          <Label.Detail onClick={() => setOpenETH(true)} style={{ cursor: 'pointer' }}>
            <Icon name="qrcode" size="big" />
          </Label.Detail>
        </Label>
        <Divider hidden />
      </div>
      <Modal basic onClose={() => setOpenBTC(false)} onOpen={() => setOpenBTC(true)} open={openBTC}>
        <Header icon>
          <Icon name="heart" />
          You can support curzy by crypto donation.
        </Header>
        <Modal.Content>
          <Container textAlign="center">
            <Message>
              <Message.Header>
                <Image src="/bitcoin-icon.png" alt="bitcoin-logo" size="mini" verticalAlign="middle" spaced />
                <span>{CRYPTO_ADDRESS.BTC}</span>
              </Message.Header>
              <Divider hidden />
              <Message.Content>
                <QRCode value={CRYPTO_ADDRESS.BTC} />
              </Message.Content>
            </Message>
          </Container>
        </Modal.Content>
      </Modal>

      <Modal basic onClose={() => setOpenETH(false)} onOpen={() => setOpenETH(true)} open={openETH}>
        <Header icon>
          <Icon name="heart" />
          You can support curzy by crypto donation.
        </Header>
        <Modal.Content>
          <Container textAlign="center">
            <Message>
              <Message.Header>
                <Image src="/ethereum-icon.png" alt="ethereum-logo" size="mini" verticalAlign="middle" spaced />
                <span>{CRYPTO_ADDRESS.ETH}</span>
              </Message.Header>
              <Divider hidden />
              <Message.Content>
                <QRCode value={CRYPTO_ADDRESS.ETH} />
              </Message.Content>
            </Message>
          </Container>
        </Modal.Content>
      </Modal>
    </>
  )
}
