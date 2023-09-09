import { createRoot } from "react-dom/client";
import App from "./App";
import { EtherspotTransactionKit } from "@etherspot/transaction-kit";
import { ethers } from "ethers";


const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
const randomWallet = ethers.Wallet.createRandom();
const providerWallet = new ethers.Wallet(randomWallet.privateKey);

root.render(
  <EtherspotTransactionKit
    provider={providerWallet} /* The random wallet we created above */
    chainId={80001} /* Polygon Testnet - Mumbai */
  >
    <App />
  </EtherspotTransactionKit>
);
