import React, { useEffect, useState } from "react";
import { gql, useQuery, ApolloClient, InMemoryCache } from "@apollo/client";

import {
  Grid,
  Button,
  Segment,
  Card,
  Input,
  Label,
  Checkbox,
  Popup,
} from "semantic-ui-react";

import { useGetEthPriceQuery } from "../generated-client";

const uniswapClient = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
  cache: new InMemoryCache(),
});

type VolumeQuery = {
  swaps: Array<{ amountUSD: string; timestamp: string }>;
};

type LiquidityQuery = {
  pair: { reserveUSD: string; token0Price: string; token1Price: string };
};

type Scenario = "always-lp-program" | "realistic" | "fees-only";

export default function LPCalculator() {
  const { data: ethPrice } = useGetEthPriceQuery({
    pollInterval: 60000,
  });

  let currentEthPrice = 0;
  if (ethPrice && ethPrice.queryAppState && ethPrice.queryAppState.length > 0) {
    currentEthPrice = ethPrice.queryAppState[0]?.ethPrice || 0;
  }

  const daysForVolumeCalc = 7;

  const [timestamp, setTimestamp] = useState(
    "" +
      (Math.floor(new Date().getTime() / 1000) -
        24 * 60 * 60 * daysForVolumeCalc)
  );

  const theDayBefore = Math.floor(new Date().getTime() / 1000) - 24 * 60 * 60;

  useEffect(() => {
    setTimeout(() => {
      setTimestamp(
        "" +
          (Math.floor(new Date().getTime() / 1000) -
            24 * 60 * 60 * daysForVolumeCalc)
      );
    }, 60 * 60 * 1000);
  });

  const volumeQuery = gql`
    query($startTime: BigInt!, $pairAddress: String!) {
      swaps(where: { timestamp_gte: $startTime, pair: $pairAddress }) {
        amountUSD
        timestamp
      }
    }
  `;

  const liquidityQuery = gql`
    query($pairAddress: ID!) {
      pair(id: $pairAddress) {
        reserveUSD
        token0Price
        token1Price
      }
    }
  `;

  const icapETHPair = "0x0422edb6e1a5258298cc0366c5f719bbd1bd85be";
  const c20ETHPair = "0xb983499b7d2f2569a7399048bbd72ca65e4e44e2";

  const { data: icapETHVolume } = useQuery<VolumeQuery>(volumeQuery, {
    variables: {
      startTime: timestamp,
      pairAddress: icapETHPair,
    },
    client: uniswapClient,
  });

  const { data: c20ETHVolume } = useQuery<VolumeQuery>(volumeQuery, {
    variables: {
      startTime: timestamp,
      pairAddress: c20ETHPair,
    },
    client: uniswapClient,
  });

  const { data: icapETHLiquidity } = useQuery<LiquidityQuery>(liquidityQuery, {
    variables: {
      pairAddress: icapETHPair,
    },
    client: uniswapClient,
  });

  const { data: c20ETHLiquidity } = useQuery<LiquidityQuery>(liquidityQuery, {
    variables: {
      pairAddress: c20ETHPair,
    },
    client: uniswapClient,
  });

  const icapEthTotalVolume =
    icapETHVolume?.swaps.reduce(
      (acc, curr) => acc + parseFloat(curr.amountUSD) / daysForVolumeCalc,
      0
    ) || 0;

  const icapEth24Volume =
    icapETHVolume?.swaps
      .filter((v) => parseInt(v.timestamp) >= theDayBefore)
      .reduce((acc, curr) => acc + parseFloat(curr.amountUSD), 0) || 0;

  const c20EthTotalVolume =
    c20ETHVolume?.swaps.reduce(
      (acc, curr) => acc + parseFloat(curr.amountUSD) / daysForVolumeCalc,
      0
    ) || 0;

  const c20Eth24Volume =
    c20ETHVolume?.swaps
      .filter((v) => parseInt(v.timestamp) >= theDayBefore)
      .reduce((acc, curr) => acc + parseFloat(curr.amountUSD), 0) || 0;

  const [pooledICAP, setPooledICAP] = useState(0);
  const [pooledC20, setPooledC20] = useState(0);
  const [pooledICAPEth, setPooledICAPEth] = useState(0);
  const [pooledC20Eth, setPooledC20Eth] = useState(0);

  const [hasPooled, setHasPooled] = useState(false);

  const [apyScenario, setApyScenario] = useState<Scenario>("always-lp-program");

  const now = new Date();
  const start = new Date(1616000898 * 1000);

  //@ts-ignore
  const diff = Math.ceil(Math.abs(now - start) / (1000 * 60 * 60 * 24));
  const daysLeft = 210 - diff > 0 ? 210 - diff : 0;

  const lpProgramCapitalLeft = (70000 * daysLeft) / 210;

  let rewardProgramCapital = 0;
  if (apyScenario === "always-lp-program") {
    rewardProgramCapital = 12 * 10000;
  } else if (apyScenario === "realistic") {
    rewardProgramCapital = lpProgramCapitalLeft;
  }

  const c20Price =
    parseFloat(c20ETHLiquidity?.pair.token1Price || "0") * currentEthPrice;
  const icapPrice =
    parseFloat(icapETHLiquidity?.pair.token0Price || "0") * currentEthPrice;

  const pooledC20ETHAmount =
    pooledC20Eth * currentEthPrice + pooledC20 * c20Price;
  const pooledICAPETHAmount =
    pooledICAPEth * currentEthPrice + pooledICAP * icapPrice;

  const c20ETHPoolsize = parseFloat(c20ETHLiquidity?.pair.reserveUSD || "1");
  const ICAPETHPoolsize = parseFloat(icapETHLiquidity?.pair.reserveUSD || "1");

  const shareC20ETH =
    pooledC20ETHAmount /
    (hasPooled ? c20ETHPoolsize : c20ETHPoolsize + pooledC20ETHAmount);
  const shareICAPETH =
    pooledICAPETHAmount /
    (hasPooled ? ICAPETHPoolsize : ICAPETHPoolsize + pooledICAPETHAmount);

  const revenueC20ETH =
    shareC20ETH * (c20EthTotalVolume * 0.003 * 365 + rewardProgramCapital);
  const revenueICAPETH =
    shareICAPETH * (icapEthTotalVolume * 0.003 * 365 + rewardProgramCapital);

  const apyC20ETH =
    100 * (revenueC20ETH / (pooledC20ETHAmount === 0 ? 1 : pooledC20ETHAmount));
  const apyICAPETH =
    100 *
    (revenueICAPETH / (pooledICAPETHAmount === 0 ? 1 : pooledICAPETHAmount));

  return (
    <Segment.Group>
      <Segment style={{ backgroundColor: "rgba(255, 227, 248, 0.8)" }}>
        <Grid>
          <Grid.Column textAlign="center">
            <Label size="massive" color={"blue"} basic>
              Liquidity Mining Calculator
            </Label>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment style={{ backgroundColor: "rgba(52, 52, 52, 0.8)" }}>
        <Card.Group centered>
          <Card>
            <Card.Content>
              <Card.Header>My Pooled Tokens</Card.Header>
              <Card.Description>
                Enter the amount of coins you want to pool.
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Checkbox
                checked={hasPooled}
                toggle
                label={
                  <label>
                    {hasPooled
                      ? "I've already pooled my coins"
                      : "I plan to pool my coins"}
                  </label>
                }
                onClick={() => {
                  setHasPooled(!hasPooled);
                }}
              />
              <br />
              <br />
              <Button.Group size="tiny">
                <Button
                  size="tiny"
                  color="olive"
                  basic={apyScenario !== "fees-only"}
                  onClick={() => setApyScenario("fees-only")}
                  data-tooltip="Use only uniswap fees to calculate rewards."
                >
                  min
                </Button>
                <Button.Or />
                <Button
                  color="teal"
                  basic={apyScenario !== "realistic"}
                  onClick={() => setApyScenario("realistic")}
                  data-tooltip={
                    "Assume 3 month liquidity mining program, left-over capital $" +
                    lpProgramCapitalLeft
                      .toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                >
                  real
                </Button>
                <Button.Or />
                <Button
                  basic={apyScenario !== "always-lp-program"}
                  color="pink"
                  onClick={() => setApyScenario("always-lp-program")}
                  data-tooltip="Assume on-going liquidity mining program."
                >
                  max
                </Button>
              </Button.Group>
            </Card.Content>
            <Card.Content extra>
              <Card.Header>ICAP-ETH Pool</Card.Header>
              <Input
                labelPosition="right"
                type="number"
                placeholder="Amount"
                onChange={(event, data) => {
                  setPooledICAP(parseFloat(data.value));
                  setPooledICAPEth(
                    (parseFloat(data.value) * icapPrice) / currentEthPrice
                  );
                }}
              >
                <Label color="pink" basic>
                  ICAP
                </Label>
                <input value={pooledICAP} />
              </Input>
              <Input
                labelPosition="right"
                type="number"
                placeholder="Amount"
                onChange={(event, data) => {
                  setPooledICAPEth(parseFloat(data.value));
                  setPooledICAP(
                    (parseFloat(data.value) * currentEthPrice) / icapPrice
                  );
                }}
              >
                <Label color="blue" basic>
                  ETH
                </Label>
                <input value={pooledICAPEth} />
              </Input>
            </Card.Content>
            <Card.Content extra>
              <Card.Header>C20-ETH Pool</Card.Header>
              <Input
                labelPosition="right"
                type="number"
                placeholder="Amount"
                onChange={(event, data) => {
                  setPooledC20(parseFloat(data.value));
                  setPooledC20Eth(
                    (parseFloat(data.value) * c20Price) / currentEthPrice
                  );
                }}
              >
                <Label color="olive" basic>
                  C20
                </Label>
                <input value={pooledC20} />
              </Input>
              <Input
                labelPosition="right"
                type="number"
                placeholder="Amount"
                onChange={(event, data) => {
                  setPooledC20Eth(parseFloat(data.value));
                  setPooledC20(
                    (parseFloat(data.value) * currentEthPrice) / c20Price
                  );
                }}
              >
                <Label color="blue" basic>
                  ETH
                </Label>
                <input value={pooledC20Eth} />
              </Input>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <Card.Header>My Estimated APY</Card.Header>
              <Card.Description>
                Results assume active{" "}
                {
                  <a
                    href="https://medium.crypto20.com/the-launch-of-invictus-capital-uniswap-liquidity-mining-programme-27c0e7c87c22"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Liquidity Mining Program{" "}
                  </a>
                }{" "}
                and are based on current pool statistics.
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Card.Header>
                {
                  <Popup trigger={<p>ICAP-ETH Pool </p>}>
                    <Popup.Header>Current Pool Statistics</Popup.Header>
                    <Popup.Content>
                      <Label color="yellow" basic>
                        ETH Price
                      </Label>
                      <Label color="olive" basic>
                        $
                        {currentEthPrice
                          .toFixed(2)
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </Label>
                      <br />
                      <Label color="green" basic>
                        24h Volume
                      </Label>
                      <Label color="teal" basic>
                        $
                        {icapEth24Volume
                          .toFixed(2)
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </Label>
                      <br />
                      <Label color="blue" basic>
                        7d Volume
                      </Label>
                      <Label color="purple" basic>
                        $
                        {(7 * icapEthTotalVolume)
                          .toFixed(2)
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </Label>
                      <br />
                      <Label color="violet" basic>
                        Liquidity
                      </Label>
                      <Label color="pink" basic>
                        $
                        {ICAPETHPoolsize.toFixed(2).replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          ","
                        )}
                      </Label>
                      <br />
                    </Popup.Content>
                  </Popup>
                }
              </Card.Header>
              <Label color="yellow" basic>
                Pooled USD
              </Label>
              <Label color="olive" basic>
                $
                {pooledICAPETHAmount
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Label>
              <br />
              <Label color="green" basic>
                My Share
              </Label>
              <Label color="teal" basic>
                {(shareICAPETH * 100).toFixed(10)}%
              </Label>
              <br />
              <Label color="blue" basic>
                My APY
              </Label>
              <Label color="purple" basic>
                {apyICAPETH.toFixed(2)}%
              </Label>
              <br />
              <Label color="violet" basic>
                My Revenue
              </Label>
              <Label color="pink" basic>
                $
                {revenueICAPETH
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Label>
            </Card.Content>
            <Card.Content extra>
              <Card.Header>
                {
                  <Popup trigger={<p>C20-ETH Pool </p>}>
                    <Popup.Header>Current Pool Statistics</Popup.Header>
                    <Popup.Content>
                      <Label color="yellow" basic>
                        ETH Price
                      </Label>
                      <Label color="olive" basic>
                        $
                        {currentEthPrice
                          .toFixed(2)
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </Label>
                      <br />
                      <Label color="green" basic>
                        24h Volume
                      </Label>
                      <Label color="teal" basic>
                        $
                        {c20Eth24Volume
                          .toFixed(2)
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </Label>
                      <br />
                      <Label color="blue" basic>
                        7d Volume
                      </Label>
                      <Label color="purple" basic>
                        $
                        {(7 * c20EthTotalVolume)
                          .toFixed(2)
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </Label>
                      <br />
                      <Label color="violet" basic>
                        Liquidity
                      </Label>
                      <Label color="pink" basic>
                        $
                        {c20ETHPoolsize
                          .toFixed(2)
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </Label>
                      <br />
                    </Popup.Content>
                  </Popup>
                }
              </Card.Header>
              <Label color="yellow" basic>
                Pooled USD
              </Label>
              <Label color="olive" basic>
                $
                {pooledC20ETHAmount
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Label>
              <br />
              <Label color="green" basic>
                My Share
              </Label>
              <Label color="teal" basic>
                {(shareC20ETH * 100).toFixed(10)}%
              </Label>
              <br />
              <Label color="blue" basic>
                My APY
              </Label>
              <Label color="purple" basic>
                {apyC20ETH.toFixed(2)}%
              </Label>
              <br />
              <Label color="violet" basic>
                My Revenue
              </Label>
              <Label color="pink" basic>
                $
                {revenueC20ETH.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Label>
            </Card.Content>
          </Card>
        </Card.Group>
      </Segment>
    </Segment.Group>
  );
}
