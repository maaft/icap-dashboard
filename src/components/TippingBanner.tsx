import React from 'react';

import { Segment, Grid, Label, Button, Icon } from 'semantic-ui-react';

export default function TippingBanner() {
  const btcAddress = "bc1qcdrz98p7w5yhxseyp079ye0tl5jsa6uc2vahwm"
  const ethAddress = "0xd023b2179728BB4c232Dd773B0B9e7E4484e6434"
  const adaAddress = "addr1qx2xvq69yqnvr6zd3g0j0zhv9sh5cfncyj3ah4eqzhgg4u55djzl65arp65vrfeejaklk7q2hpkxt5pux4hykwna37mqswshql"
    return (
      <Segment.Group>
        <Segment style={{ backgroundColor: 'rgba(255, 227, 248, 0.8)' }}>
          <Grid>
            <Grid.Column textAlign="center">
              <Label size="massive" color={"pink"} basic>Please help pay server rent :-)</Label>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment style={{ backgroundColor: 'rgba(52, 52, 52, 0.8)' }}>
          <Label color={"yellow"} basic>BTC</Label> <Label color={"olive"} basic>{btcAddress}</Label><Button basic icon onClick={() => navigator.clipboard.writeText(btcAddress)}><Icon color="olive" name='copy outline' /></Button>
          <br/>
          <Label color={"green"} basic>ETH / ERC-20</Label> <Label color={"teal"} basic>{ethAddress}</Label><Button basic icon onClick={() => navigator.clipboard.writeText(ethAddress)}><Icon color="teal" name='copy outline' /></Button>
          <br/>
          <Label color={"blue"} basic>ADA</Label> <Label color={"violet"} basic>{adaAddress}</Label><Button basic icon onClick={() => navigator.clipboard.writeText(adaAddress)}><Icon color="violet" name='copy outline' /></Button>
        </Segment>
      </Segment.Group>
    );
}