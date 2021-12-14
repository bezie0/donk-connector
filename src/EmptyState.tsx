import React from "react";

import brap from "./images/brap.png";

const EmptyState: React.FC = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      border: "1px solid red",
      padding: 10,
      borderRadius: 5,
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 20,
      }}
    >
      <img style={{ height: 40, width: 40, marginRight: 5 }} src={brap} />
      <img style={{ height: 40, width: 40, marginRight: 5 }} src={brap} />
      <img style={{ height: 40, width: 40, marginRight: 5 }} src={brap} />
    </div>
    <div style={{ marginBottom: 10 }}>
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
  </div>
);

export default EmptyState;
