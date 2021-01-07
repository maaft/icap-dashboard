import React, { useEffect, useState } from 'react';

import { Header, Segment, Card, Input, Label, Dropdown, Button, Grid, Checkbox, Message, TextArea, Form, SemanticCOLORS} from 'semantic-ui-react';

import { GetStatisticsQuery } from '../generated-client';

import {TokenColors} from '../util'

import StakingCalculator from './StakingCalculator'
import TokenOverview from './TokenOverview'
import TippingBanner from './TippingBanner'

type Props = {
  statisticsData: GetStatisticsQuery | undefined;
}

export default function StakingOverview({ statisticsData } : Props) {
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

 return  (
   <>

 <Segment.Group>
 <Segment style={{ backgroundColor: 'rgba(255, 227, 248, 0.8)' }}>
    <Grid>
      <Grid.Column textAlign="center">
        <Label size="massive" color={"yellow"} basic>Staking Overview</Label>
      </Grid.Column>
    </Grid>
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
  </>
  );
}
