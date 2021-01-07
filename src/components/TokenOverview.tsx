import React from 'react';

import { Label, Segment, Card,  Button, Grid} from 'semantic-ui-react';

import {QueryTokenQuery } from '../generated-client';

import {TokenColors } from '../util'


type Props = {
    tokenData: QueryTokenQuery | undefined;
}

export default function StakingCalculator({ tokenData } : Props) {
    return (
        <Segment.Group>
          <Segment style={{ backgroundColor: 'rgba(255, 227, 248, 0.8)' }}>
          <Grid>
            <Grid.Column textAlign="center">
              <Label size="massive" color={"green"} basic>Token Price Overview</Label>
            </Grid.Column>
          </Grid>
          </Segment>
          <Segment style={{ backgroundColor: 'rgba(52, 52, 52, 0.8)' }}>
            <Card.Group centered>
              {tokenData?.queryToken?.map((token) =>
              <Card key={token?.ticker}>
                <Card.Content>
                  <Card.Header>{token?.ticker}</Card.Header>
                  <Card.Description>{token?.name}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Grid>
                    <Grid.Column textAlign="center">
                      <Button size={"massive"} color={TokenColors.get(token?.ticker || "IHF") || "pink"}>${token?.nav.toFixed(2)}</Button>
                    </Grid.Column>
                  </Grid>
                </Card.Content>
              </Card>)}
            </Card.Group>
          </Segment>
        </Segment.Group>);
}