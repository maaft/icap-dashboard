import React from "react";
import "./App.css";
import { Container } from "semantic-ui-react";

import StakingOverview from "./components/StakingOverview";
import StakingCalculator from "./components/StakingCalculator";
import TokenOverview from "./components/TokenOverview";
import TippingBanner from "./components/TippingBanner";

import {
  useGetStatisticsQuery,
  useQueryTokenQuery,
  useGetAccountQuery,
} from "./generated-client";
import Contribute from "./components/Contribute";
import ToS from "./components/ToS";

function App() {
  const { data: statisticsData } = useGetStatisticsQuery({
    pollInterval: 60000,
  });

  const { data: tokenData } = useQueryTokenQuery({
    pollInterval: 60000,
  });

  return (
    <>
      <Container style={{ marginTop: "15px" }}>
        <TippingBanner />
        <StakingOverview statisticsData={statisticsData} />
        <TokenOverview tokenData={tokenData} />
        <StakingCalculator
          statisticsData={statisticsData}
          tokenData={tokenData}
        />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Contribute />
        <ToS />
      </Container>
    </>
  );
}

export default App;
