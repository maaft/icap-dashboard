import React from 'react';

import { Segment, Grid, Label, Icon } from 'semantic-ui-react';

export default function Contribute() {
    return (
      <Segment.Group>
        <Segment style={{ backgroundColor: 'rgba(255, 227, 248, 0.8)' }}>
          <Grid>
            <Grid.Column textAlign="center">
              <Label size="massive" color={"pink"} basic>Feel free to contribute</Label>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment style={{ backgroundColor: 'rgba(52, 52, 52, 0.8)' }}>
          <Grid>
            <Grid.Column textAlign="center">
              <Label color={"violet"} basic><Icon name="github"/></Label><a href="https://github.com/maaft/icap-dashboard" target="_blank" rel="noreferrer"><Label color={"pink"} basic>https://github.com/maaft/icap-dashboard</Label></a>
            </Grid.Column>
          </Grid>
        </Segment>
      </Segment.Group>
    );
}