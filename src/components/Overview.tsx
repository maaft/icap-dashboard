import React, { useEffect, useState } from 'react';

import { Header, Segment, Card, Input, Label, Dropdown, Button, Grid, Checkbox, Message, SemanticCOLORS} from 'semantic-ui-react';

import { useGetStatisticsQuery, useQueryTokenQuery } from '../generated-client';

type Holding = {
  amount?: number
  timeMultiplier?: number
  baseMultiplier?: number
  nav?: number
}

export default function Overview() {
  const [myHoldings, setMyHoldings] = useState(new Map<string, Holding>())
  const [hasStaked, setHasStaked] = useState(false)

  const {data: statisticsData } = useGetStatisticsQuery({
    pollInterval: 60000,
  });


  const {data: tokenData } = useQueryTokenQuery({
    pollInterval: 60000,
  });

  let totalPower = 0
  let maxPower = 0;
  let medianPower = 0;
  if (statisticsData && statisticsData.queryAppState) {
    if (statisticsData.queryAppState[0]) {

      totalPower = statisticsData.queryAppState[0].totalStakingPower
      maxPower = statisticsData.queryAppState[0].maxStakingPower
      medianPower = statisticsData.queryAppState[0].medianStakingPower
    }
  }

  const stateOptions = [{
    key: 0,
    text: "1",
    value: 1.0,
  }, {
    key: 1,
    text: "3",
    value: 1.33,
  }, {
    key: 2,
    text: "6",
    value: 1.66,
  }, {
    key: 3,
    text: "12",
    value: 2.0,
  }]

  const tokenColors: Map<string, SemanticCOLORS> = new Map([["IHF", "yellow"], ["C20", "olive"], ["C10", "green"], ["EMS", "teal"], ["IBA", "blue"], ["IGP", "violet"], ["IML", "purple"], ["ICAP", "pink"]])

  const myStakingPower = Array.from(myHoldings.values()).reduce((sum, holding) => sum + (holding.amount || 0) * (holding.timeMultiplier || 0) * (holding.baseMultiplier || 0) * (holding.nav || 0), 0)

  const myShare = hasStaked ? myStakingPower * 100 / totalPower : myStakingPower * 100 / (totalPower + myStakingPower);

  // const firstYearYield

 return  (
   <>
   <Message color='pink' size="massive">Plz help pay server rent: 0xd023b2179728BB4c232Dd773B0B9e7E4484e6434</Message>
 <Segment.Group>
 <Segment style={{ backgroundColor: '#f4f4f4' }}>
   <Header as="h2">Staking Overview</Header>
 </Segment>
 <Segment style={{ backgroundColor: 'rgba(52, 52, 52, 0.8)' }}>
    <Card.Group centered>
      <Card>
        <Card.Content>
        <Card.Header>Total Staking Power</Card.Header>
        </Card.Content>
        <Card.Content extra>
          <Grid>
            <Grid.Column textAlign="center">
              <Button size={"massive"} color='pink'>${totalPower.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Button>
            </Grid.Column>
          </Grid>
        </Card.Content>
      </Card>
      <Card>
        <Card.Content>
          <Card.Header>Maximum Staking Power</Card.Header>
        </Card.Content>
        <Card.Content extra>
          <Grid>
            <Grid.Column textAlign="center">
              <Button size={"massive"} color='pink'>${maxPower.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Button>
            </Grid.Column>
          </Grid>
        </Card.Content>
      </Card>
      <Card>
        <Card.Content>
          <Card.Header>Median Staking Power</Card.Header>
        </Card.Content>
        <Card.Content extra>
          <Grid>
            <Grid.Column textAlign="center">
              <Button size={"massive"} color='pink'>${medianPower.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Button>
            </Grid.Column>
          </Grid>
        </Card.Content>
      </Card>
    </Card.Group>
   </Segment>
  </Segment.Group>
  <Segment.Group>

  <Segment style={{ backgroundColor: '#f4f4f4' }}>
   <Header as="h2">Token Price Overview</Header>
 </Segment>
 <Segment style={{ backgroundColor: 'rgba(52, 52, 52, 0.8)' }}>
    <Card.Group centered>
      {tokenData?.queryToken?.map((token) => <Card key={token?.ticker}>
        <Card.Content>
        <Card.Header>{token?.ticker}</Card.Header>
        <Card.Description>{token?.name}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Grid>
            <Grid.Column textAlign="center">
              <Button size={"massive"} color={tokenColors.get(token?.ticker || "IHF") || "pink"}>${token?.nav.toFixed(2)}</Button>
            </Grid.Column>
          </Grid>
        </Card.Content>
      </Card>)}
    </Card.Group>
   </Segment>

   <Segment style={{ backgroundColor: '#f4f4f4' }}>
   <Header as="h2">Staking Calculator</Header>
 </Segment>
 <Segment style={{ backgroundColor: 'rgba(52, 52, 52, 0.8)' }}>
    <Card.Group centered>
      <Card>
        <Card.Content>
          <Card.Header>My Holdings</Card.Header>
          <Card.Content>Enter your staked holdings and lockup-periods.</Card.Content>
        </Card.Content>
        <Card.Content extra>
        <Checkbox toggle label={<label>{hasStaked ? "I've already staked my coins" : "I plan to stake"}</label>} onClick={() => {setHasStaked(!hasStaked)}}/>
        {tokenData?.queryToken?.filter(token => token?.ticker !== "ICAP").map((token) => <Input key={token?.ticker} labelPosition='right' type='text' placeholder='Amount' onChange={(event, data) => {
          if (token) {
            const currentHolding = myHoldings.get(token.ticker)
            setMyHoldings(new Map(myHoldings.set(token.ticker, {...currentHolding, amount: parseFloat(data.value), baseMultiplier: token.baseMultiplier, nav: token.nav})))
          }
           }}>
           <Label color={tokenColors.get(token?.ticker || "IHF") || "pink"} basic>{token?.ticker}</Label>
           <input type="number"/>
           <Dropdown placeholder='Months' options={stateOptions} onChange={(event, data) => {
             if (token) {
              const currentHolding = myHoldings.get(token.ticker)
            setMyHoldings(new Map(myHoldings.set(token.ticker, {...currentHolding, timeMultiplier: parseFloat(data.value as string)})))
            }
          }}/>
        </Input>)}

        </Card.Content>
      </Card>
      <Card>
        <Card.Content>
          <Card.Header>My Staking Analysis</Card.Header>
          <Card.Description>Results based on current staking numbers.</Card.Description>
          My Power: ${myStakingPower.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          <br/>
          My Share: %{myShare.toFixed(10)}
        </Card.Content>
      </Card>
    </Card.Group>
   </Segment>

  </Segment.Group>
  </>
  );
}
