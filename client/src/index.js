import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { EtherspotTransactionKit } from "@etherspot/transaction-kit";
import * as ethers from "ethers";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const randomWallet = ethers.Wallet.createRandom();
const providerWallet = new ethers.Wallet(randomWallet.privateKey);

console.log(providerWallet);

root.render(
  <StrictMode>
    <EtherspotTransactionKit provider={providerWallet} chainId={80001}>
      <App />
    </EtherspotTransactionKit>
  </StrictMode>
);
