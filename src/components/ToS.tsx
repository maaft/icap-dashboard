import React from "react";

import { Segment, Grid, Label, Icon } from "semantic-ui-react";

export default function ToS() {
  return (
    <Segment.Group>
      <Segment style={{ backgroundColor: "rgba(255, 227, 248, 0.8)" }}>
        <Grid>
          <Grid.Column textAlign="center">
            <Label size="massive" color={"pink"} basic>
              Terms of Service
            </Label>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment style={{ backgroundColor: "rgba(52, 52, 52, 0.8)" }}>
        <Grid>
          <Grid.Column textAlign="center">
            @Islehaunter: no refunds!
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
}
