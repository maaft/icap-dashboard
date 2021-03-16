import React, { useEffect, useState } from "react";
import { gql, useQuery, ApolloClient, InMemoryCache } from "@apollo/client";

import { Grid, Segment, Card, Input, Label, Checkbox } from "semantic-ui-react";

import { useGetEthPriceQuery } from "../generated-client";

const uniswapClient = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
  cache: new InMemoryCache(),
});

type VolumeQuery = {
  swaps: Array<{ amountUSD: string }>;
};

type LiquidityQuery = {
  pair: { reserveUSD: string; token0Price: string; token1Price: string };
};

export default function LPCalculator() {
  const { data: ethPrice } = useGetEthPriceQuery({
    pollInterval: 60000,
  });

  let currentEthPrice = 0;
  if (ethPrice && ethPrice.queryAppState && ethPrice.queryAppState.length > 0) {
    currentEthPrice = ethPrice.queryAppState[0]?.ethPrice || 0;
  }

  const [timestamp, setTimestamp] = useState(
    "" + (Math.floor(new Date().getTime() / 1000) - 24 * 60 * 60)
  );

  useEffect(() => {
    setTimeout(() => {
      setTimestamp(
        "" + (Math.floor(new Date().getTime() / 1000) - 24 * 60 * 60)
      );
    }, 60 * 60 * 1000);
  });

  const volumeQuery = gql`
    query($startTime: BigInt!, $pairAddress: String!) {
      swaps(where: { timestamp_gte: $startTime, pair: $pairAddress }) {
        amountUSD
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
      (acc, curr) => acc + parseFloat(curr.amountUSD),
      0
    ) || 0;

  const c20EthTotalVolume =
    c20ETHVolume?.swaps.reduce(
      (acc, curr) => acc + parseFloat(curr.amountUSD),
      0
    ) || 0;

  const [pooledICAP, setPooledICAP] = useState(0);
  const [pooledC20, setPooledC20] = useState(0);
  const [pooledICAPEth, setPooledICAPEth] = useState(0);
  const [pooledC20Eth, setPooledC20Eth] = useState(0);

  const [hasPooled, setHasPooled] = useState(false);

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
    shareC20ETH * (c20EthTotalVolume * 0.003 * 365 + 12 * 10000);
  const revenueICAPETH =
    shareICAPETH * (icapEthTotalVolume * 0.003 * 365 + 12 * 10000);

  const apyC20ETH = 100 * (revenueC20ETH / (pooledC20ETHAmount === 0 ? 1 : pooledC20ETHAmount));
  const apyICAPETH = 100 * (revenueICAPETH / (pooledICAPETHAmount === 0 ? 1 : pooledICAPETHAmount));

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
            </Card.Content>
            <Card.Content extra>
              <Card.Header>ICAP-ETH Pool</Card.Header>
              <Input
                labelPosition="right"
                type="number"
                placeholder="Amount"
                onChange={(event, data) =>
                  setPooledICAP(parseFloat(data.value))
                }
              >
                <Label color="pink" basic>
                  ICAP
                </Label>
                <input />
              </Input>
              <Input
                labelPosition="right"
                type="number"
                placeholder="Amount"
                onChange={(event, data) =>
                  setPooledICAPEth(parseFloat(data.value))
                }
              >
                <Label color="blue" basic>
                  ETH
                </Label>
                <input />
              </Input>
            </Card.Content>
            <Card.Content extra>
              <Card.Header>C20-ETH Pool</Card.Header>
              <Input
                labelPosition="right"
                type="number"
                placeholder="Amount"
                onChange={(event, data) => setPooledC20(parseFloat(data.value))}
              >
                <Label color="olive" basic>
                  C20
                </Label>
                <input />
              </Input>
              <Input
                labelPosition="right"
                type="number"
                placeholder="Amount"
                onChange={(event, data) =>
                  setPooledC20Eth(parseFloat(data.value))
                }
              >
                <Label color="blue" basic>
                  ETH
                </Label>
                <input />
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
                and are based on daily pool statistics.
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Card.Header>ICAP-ETH Pool</Card.Header>
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
              <Card.Header>C20-ETH Pool</Card.Header>
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
