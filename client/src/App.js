import {
  EtherspotBatches,
  EtherspotBatch,
  EtherspotTransaction,
  useEtherspotTransactions,
  useEtherspotAddresses,
} from "@etherspot/transaction-kit";
import { useState } from "react";
export default function App() {
  const { estimate, send } = useEtherspotTransactions();
  const etherspotAddresses = useEtherspotAddresses(80001);
  console.log(etherspotAddresses)
  const [address, setAddress] = useState('0xcfa038455b54714821f291814071161c9870B891');
const [amount, setAmount] = useState('0.001');

  return (
    <EtherspotBatches via="etherspot-prime">
      <EtherspotBatch>
        <EtherspotTransaction to={address} value={amount}>
         
          {etherspotAddresses.map((etherspotAddressObject, i) => (
            <div key={i}>
              <p>Blockchain Name: {etherspotAddressObject.chainName}</p>
              <p>Blockchain ID:{etherspotAddressObject.chainId}</p>
              <p>Address: {etherspotAddressObject.address}</p>
            </div>
          ))}
          <input
            type="text"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
          <input
            type="text"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
          <hr />
          <button onClick={() => estimate()}>Estimate</button>
          <button onClick={() => send()}>Send</button>
        </EtherspotTransaction>
      </EtherspotBatch>
    </EtherspotBatches>
  );
}
