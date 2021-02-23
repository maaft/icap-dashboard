import React from "react";

import { Segment, Grid, Label, Button, Icon } from "semantic-ui-react";
import useClipboard from "react-use-clipboard";

export default function TippingBanner() {
  const qfReferral = "Z977ZPH9";
  const nanoAddress =
    "nano_1td31cdyciwwocw7qi563gq37a865whjbi9r5qowngpjc8bqyxscu9dgtiu7";
  const btcAddress = "bc1qcdrz98p7w5yhxseyp079ye0tl5jsa6uc2vahwm";
  const ethAddress = "0xd023b2179728BB4c232Dd773B0B9e7E4484e6434";
  const adaAddress =
    "addr1qx2xvq69yqnvr6zd3g0j0zhv9sh5cfncyj3ah4eqzhgg4u55djzl65arp65vrfeejaklk7q2hpkxt5pux4hykwna37mqswshql";

  const [isqfCopied, setqfCopied] = useClipboard(qfReferral, {
    successDuration: 1000,
  });
  const [isBtcCopied, setBtcCopied] = useClipboard(btcAddress, {
    successDuration: 1000,
  });
  const [isnanoCopied, setnanoCopied] = useClipboard(nanoAddress, {
    successDuration: 1000,
  });
  const [isEthCopied, setEthCopied] = useClipboard(ethAddress, {
    successDuration: 1000,
  });
  const [isAdaCopied, setAdaCopied] = useClipboard(adaAddress, {
    successDuration: 1000,
  });
  return (
    <Segment.Group>
      <Segment style={{ backgroundColor: "rgba(255, 227, 248, 0.8)" }}>
        <Grid>
          <Grid.Column textAlign="center">
            <Label size="massive" color={"pink"} basic>
              Please help pay server rent or pay me a coffee :-)
            </Label>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment style={{ backgroundColor: "rgba(52, 52, 52, 0.8)" }}>
        <Label color={"red"} basic>
          Quantfury Referral Code
        </Label>{" "}
        <Label color={"orange"} basic>
          {qfReferral}
        </Label>
        <Button
          basic
          icon
          onClick={() => {
            setqfCopied();
            return true;
          }}
        >
          <Icon color="orange" name={!isqfCopied ? "copy outline" : "copy"} />
        </Button>
        <br />
        <Label color={"brown"} basic>
          NANO
        </Label>{" "}
        <Label color={"pink"} basic>
          {nanoAddress}
        </Label>
        <Button
          basic
          icon
          onClick={() => {
            setnanoCopied();
            return true;
          }}
        >
          <Icon color="pink" name={!isnanoCopied ? "copy outline" : "copy"} />
        </Button>
        <br />
        <Label color={"yellow"} basic>
          BTC
        </Label>{" "}
        <Label color={"olive"} basic>
          {btcAddress}
        </Label>
        <Button
          basic
          icon
          onClick={() => {
            setBtcCopied();
            return true;
          }}
        >
          <Icon color="olive" name={!isBtcCopied ? "copy outline" : "copy"} />
        </Button>
        <br />
        <Label color={"green"} basic>
          ETH / ERC-20
        </Label>{" "}
        <Label color={"teal"} basic>
          {ethAddress}
        </Label>
        <Button basic icon onClick={() => setEthCopied()}>
          <Icon color="teal" name={!isEthCopied ? "copy outline" : "copy"} />
        </Button>
        <br />
        <Label color={"blue"} basic>
          ADA
        </Label>{" "}
        <Label color={"violet"} basic>
          {adaAddress}
        </Label>
        <Button basic icon onClick={() => setAdaCopied()}>
          <Icon color="violet" name={!isAdaCopied ? "copy outline" : "copy"} />
        </Button>
      </Segment>
    </Segment.Group>
  );
}
