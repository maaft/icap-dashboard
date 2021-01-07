import React, { useEffect, useState } from 'react';

import { Header, Segment, Card, Input, Label, Dropdown, Checkbox, Message, TextArea, Form } from 'semantic-ui-react';

import { useGetAccountQuery, QueryTokenQuery, GetStatisticsQuery } from '../generated-client';

import {StakingPeriodToMultiplier, TokenColors} from '../util'

import { DateSingleInput  } from "@datepicker-react/styled";
import { ThemeProvider } from "styled-components";


type Props = {
    statisticsData: GetStatisticsQuery | undefined;
    tokenData: QueryTokenQuery | undefined;
}

type Stake = {
    amount?: number
    committedStakingPeriod?: number
    baseMultiplier?: number
    nav?: number
  }

export default function StakingCalculator({ statisticsData, tokenData } : Props) {
    const [hasStaked, setHasStaked] = useState(false)
    const [currentAddress, setCurrentAddress] = useState<string|undefined>(undefined)
    const [myStakes, setMyStakes] = useState(new Map<string, Stake>())
    const [showDatepicker, setShowDatepicker] = useState(false)
    const [startDate, setStartDate] = useState<Date | null>(new Date(Date.parse("01 Jan 2021")))
    
    let totalStakingPower = 0
    if (statisticsData && statisticsData.queryAppState) {
      if (statisticsData.queryAppState[0]) {
  
        totalStakingPower = statisticsData.queryAppState[0].totalStakingPower
      }
    }


    const icapPrice = tokenData?.queryToken?.filter((token) => token?.ticker === "ICAP")[0]?.nav || 0

    const {data: accountData } = useGetAccountQuery({
        variables: {
          address: currentAddress?.toLowerCase() || "",
        },
        onCompleted: (data) => {
          if (!data.getAccount) {
            setMyStakes(new Map<string, Stake>())
          } else {
            data.getAccount?.stakes.forEach((stake) => {
              setHasStaked(true);
              setMyStakes(new Map(myStakes.set(stake.token.ticker, {committedStakingPeriod: stake.committedStakingPeriod, amount: stake.amount, baseMultiplier: stake.token.baseMultiplier, nav: stake.token.nav})))
          })
          }
        }
      })
    
      const accountFound = accountData?.getAccount ? true : false
  
    const stateOptions = [{
      key: 0,
      text: "1",
      value: 2592000,
    }, {
      key: 1,
      text: "3",
      value: 7776000,
    }, {
      key: 2,
      text: "6",
      value: 15552000,
    }, {
      key: 3,
      text: "12",
      value: 31536000,
    }]
    
    const myStakingPowers = Array.from(myStakes.values()).map((stake) => ({power: (stake.amount || 0) * StakingPeriodToMultiplier(stake.committedStakingPeriod || 0) * (stake.baseMultiplier || 0) * (stake.nav || 0), period: stake.committedStakingPeriod || 0}))
    const myShares = myStakingPowers.map((power) => ({share: hasStaked ? power.power / totalStakingPower : power.power / (totalStakingPower + power.power), period: power.period}))
    const myStakingPower = myStakingPowers.reduce((sum, curr) => sum + curr.power, 0)
  
    const myShare = hasStaked ? myStakingPower * 100 / totalStakingPower : myStakingPower * 100 / (totalStakingPower + myStakingPower);

    const skippedMinutes = (startDate?.getTime() || Date.parse("01 Jan 2021") - Date.parse("01 Jan 2021")) / 1000 / 60
    const startWeek = Math.floor(((startDate?.getTime() || Date.parse("01 Jan 2021")) - Date.parse("01 Jan 2021")) / 1000 / 60 / 60 / 24 / 7)
    
    let startEmmission = 10000 * Math.pow(0.975, startWeek)
    let myICAPS = 0
    for (let i = 0; i < 52; i++) {
        myICAPS += myShare / 100 * startEmmission
        startEmmission = startEmmission * 0.975
    }



    return (
        <Segment.Group>
        <Segment style={{ backgroundColor: '#f4f4f4' }}>
      <Header as="h2">Staking Calculator</Header>
   </Segment>
   <Segment style={{ backgroundColor: 'rgba(52, 52, 52, 0.8)' }}>
     <Form>
      <TextArea rows={1} placeholder='Enter your wallet address for auto-filling...' onChange={(event, data) => {setCurrentAddress(""+data.value)}}/>
    </Form>
    {!accountFound && <Message
    warning
    header='No staking data found for that address!'
    content="Make sure you type in the correct address. If you haven't staked yet, you can ignore this warning."
  />}
   </Segment>
 <Segment style={{ backgroundColor: 'rgba(52, 52, 52, 0.8)' }}>
    <Card.Group centered>
      <Card>
        <Card.Content>
          <Card.Header>My Staked Coins</Card.Header>
          <Card.Description>Enter your staked coins and lockup-periods or provide your wallet address.</Card.Description>
        </Card.Content>
        <Card.Content extra>
        <Checkbox checked={hasStaked} toggle label={<label>{hasStaked ? "I've already staked my coins" : "I plan to stake"}</label>} onClick={() => {setHasStaked(!hasStaked)}}/>
        {tokenData?.queryToken?.filter(token => token?.ticker !== "ICAP").map((token) => <Input key={token?.ticker} labelPosition='right' type='text' placeholder='Amount' onChange={(event, data) => {
          if (token) {
            const currentStake = myStakes.get(token.ticker)
            setMyStakes(new Map(myStakes.set(token.ticker, {...currentStake, amount: parseFloat(data.value), baseMultiplier: token.baseMultiplier, nav: token.nav})))
          }
           }}>
           <Label color={TokenColors.get(token?.ticker || "IHF") || "pink"} basic>{token?.ticker}</Label>
           <input value={myStakes.get(token?.ticker || "")?.amount || 0} type="number"/>
           <Dropdown value={myStakes.get(token?.ticker || "")?.committedStakingPeriod} placeholder='Months' options={stateOptions} onChange={(event, data) => {
             if (token) {
              const currentStake = myStakes.get(token.ticker)
            setMyStakes(new Map(myStakes.set(token.ticker, {...currentStake, committedStakingPeriod: parseInt(data.value as string)})))
            }
          }}/>
        </Input>)}
        </Card.Content>
        <Card.Content extra>
        <Card.Header>Select starting date</Card.Header>
        <ThemeProvider
            theme={{
                breakpoints: ["32em", "48em", "64em"],
                reactDatepicker: {
                daySize: [36, 40],
                fontFamily: "system-ui, -apple-system",
                colors: {
                    accessibility: "#D80249",
                    selectedDay: "#f7518b",
                    selectedDayHover: "#F75D95",
                    primaryColor: "#d8366f"
                }
                }
            }}
            >

        <DateSingleInput
            minBookingDate={new Date(Date.parse("01 Jan 2021"))}
            onDateChange={data => setStartDate(data.date)}
            onFocusChange={focusedInput => setShowDatepicker(focusedInput) }
            date={startDate}
            showDatepicker={showDatepicker}
        />
    </ThemeProvider>
        </Card.Content>
      </Card>
      <Card>
        <Card.Content>
          <Card.Header>My Projected ICAP Rewards</Card.Header>
          <Card.Description>Results are based on current staking numbers and projected for one year.</Card.Description>
        </Card.Content>
        <Card.Content>
          <Label color={"yellow"} basic>My Staking Power</Label> <Label color={"olive"} basic>${myStakingPower.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Label>
          <br/>
          <Label color={"green"} basic>My Share</Label><Label color={"teal"} basic>{myShare.toFixed(10)}%</Label>
          <br/>
          <Label color={"blue"} basic>My ICAPs</Label> <Label color={"violet"} basic>{myICAPS.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Label>
          <br/>
          <Label color={"purple"} basic>My Revenue</Label> <Label color={"pink"} basic>${(myICAPS * icapPrice).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Label>
        </Card.Content>
      </Card>
    </Card.Group>
   </Segment>
   </Segment.Group>);
}