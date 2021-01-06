import React, { useEffect, useState } from 'react';

import { Header, Segment, Card, Input, Label, Dropdown } from 'semantic-ui-react';

import { useGetStatisticsQuery, useQueryTokenQuery } from '../generated-client';

import {StakingPeriodToMultiplier} from '../util'
import RainbowText from 'react-rainbow-text';



export default function Overview() {
  // const {currentAccounts, setCurrentAccounts} = useState<Account[]>([])

  const [myHoldings, setMyHoldings] = useState(new Map<string, number>())
  const [myDurations, setMyDurations] = useState(new Map<string, number>())

  const {data: statisticsData } = useGetStatisticsQuery({
    pollInterval: 60000,
  });


  const {data: tokenData } = useQueryTokenQuery({
    pollInterval: 60000,
  });

  let stakingpowers: number[] = [];
  let totalPower = ""
  let maxPower = "";
  let medianPower = "";
  if (statisticsData && statisticsData.queryAppState) {
    if (statisticsData.queryAppState.length > 0) {
      totalPower = statisticsData.queryAppState[0].totalStakingPower.toFixed(2)
      maxPower = statisticsData.queryAppState[0].maxStakingPower.toFixed(2)
      medianPower = statisticsData.queryAppState[0].medianStakingPower.toFixed(2)
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

  const myStakingPower = Object.keys(myHoldings).reduce((sum, key) => sum + myHoldings[key] * myDurations[key] * tokenData?.queryToken?.filter((token) => token?.ticker == key), 0)

 return  (
   <>
 <Segment.Group>
 <Segment style={{ backgroundColor: '#f4f4f4' }}>
   <Header as="h2">Staking Overview</Header>
 </Segment>
 <Segment style={{ backgroundColor: 'rgba(52, 52, 52, 0.8)' }}>
    <Card.Group centered>
      <Card>
        <Card.Content>
        <Card.Header>${<RainbowText>{totalPower.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</RainbowText>}</Card.Header>
        <Card.Description>Total Staking Power</Card.Description>
        </Card.Content>
      </Card>
      <Card>
        <Card.Content>
        <Card.Header>${<RainbowText>{maxPower.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</RainbowText>}</Card.Header>
        <Card.Description>Maximum Staking Power</Card.Description>
        </Card.Content>
      </Card>
      <Card>
        <Card.Content>
        <Card.Header>${<RainbowText>{medianPower.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</RainbowText>}</Card.Header>
        <Card.Description>Median Staking Power</Card.Description>
        </Card.Content>
      </Card>
    </Card.Group>
   </Segment>
  </Segment.Group>
  <Segment.Group>

  <Segment style={{ backgroundColor: '#f4f4f4' }}>
   <Header as="h2">Token Overview</Header>
 </Segment>
 <Segment style={{ backgroundColor: 'rgba(52, 52, 52, 0.8)' }}>
    <Card.Group centered>
      {tokenData?.queryToken?.map((token) => <Card >
        <Card.Content>
        <Card.Header>${token?.nav.toFixed(2)}</Card.Header>
        <Card.Description>{token?.ticker}</Card.Description>
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
          <Card.Content>Enter your staked holdings and staking duration and click calculate</Card.Content>
        </Card.Content>
        <Card.Content extra>
        {tokenData?.queryToken?.filter(token => token?.ticker !== "ICAP").map((token) => <Input labelPosition='right' type='text' placeholder='Amount' onChange={(event, data) => {
           const currentHoldings = {...myHoldings}
           currentHoldings[token?.ticker] = data.value
           setMyHoldings(currentHoldings)
           }}>
           <Label basic>{token?.ticker}</Label>
           <input type="number"/>
           <Dropdown placeholder='Months' options={stateOptions} onChange={(event, data) => {
             const currentDurations = {...myDurations}
             currentDurations[token?.ticker] = data.value
             setMyDurations(myDurations)
          }}/>
        </Input>)}

        </Card.Content>
      </Card>
      <Card>
        <Card.Content>
          <Card.Header>My Staking Analysis</Card.Header>
        </Card.Content>
        <Card.Content extra>
          My Power: ${myStakingPower.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </Card.Content>
      </Card>
    </Card.Group>
   </Segment>

  </Segment.Group>
  </>
  );
}
