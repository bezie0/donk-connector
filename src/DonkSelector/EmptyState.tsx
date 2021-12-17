import React from "react";

import brap from "../images/brap.png";
import { EmptyStateContainer, EmptyStateHeader } from "./styles";

const EmptyState: React.FC = () => (
  <EmptyStateContainer>
    <EmptyStateHeader>
      <img src={brap} />
      <img src={brap} />
      <img src={brap} />
    </EmptyStateHeader>
    <div style={{ marginBottom: 20 }}>
      <strong>Looks like you have no donks!</strong>
      <br />
      Buy a donk on one of our supported marketplaces:
    </div>
    <a href="https://solanart.io/collections/flunkdonkeys" target="_blank">
      Solanart
    </a>
    <a href="https://magiceden.io/marketplace/flunk_donkeys" target="_blank">
      Magic Eden
    </a>
    <a href="https://alpha.art/collection/flunk-donkeys" target="_blank">
      Alpha Art
    </a>
    <a
      href="https://digitaleyes.market/collections/Flunk%20Donkeys"
      target="_blank"
    >
      Digital Eyes
    </a>
  </EmptyStateContainer>
);

export default EmptyState;
