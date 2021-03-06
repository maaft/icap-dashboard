import React from "react";
import "./App.css";
import { Container } from "semantic-ui-react";

import StakingOverview from "./components/StakingOverview";
import StakingCalculator from "./components/StakingCalculator";
import LPCalculator from "./components/LPCalculator";
import TokenOverview from "./components/TokenOverview";
import TippingBanner from "./components/TippingBanner";

import {
  useGetStatisticsQuery,
  useQueryTokenQuery,
  useGetTreasuryAccountsQuery
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

  const { data: treasuryAccounts } = useGetTreasuryAccountsQuery()

  return (
    <>
      <Container style={{ marginTop: "15px" }}>
        <TippingBanner />
        <StakingOverview statisticsData={statisticsData} tokenData={tokenData} treasuryAccounts={treasuryAccounts}/>
        <TokenOverview tokenData={tokenData} />
        <LPCalculator />
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
