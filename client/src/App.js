import { Typography, Container, Box, Paper } from "@mui/material";
import { useEtherspotAddresses } from "@etherspot/transaction-kit";
import { useEffect, useState } from "react";
import MintTktTokens from "./components/MintTktTokens/MintTktTokens";
import StakeTktTokens from "./components/StakeTktTokens/StakeTktTokens";

export default function App() {
  const [hasSentMintTx, setHasSentMintTx] = useState(false);
  const [hasSentStakingTx, setHasSentStakingTx] = useState(false);
  const etherspotAddresses = useEtherspotAddresses();
  const [goerliSmartWalletAddress, setGoerliSmartWalletAddress] = useState(
    false
  );

  useEffect(() => {
    console.log("etherspotAddresses", etherspotAddresses);

    const fetchGoerliSmartWallet = () => {
      if (etherspotAddresses.length && !goerliSmartWalletAddress) {
        const goerliNetwork = etherspotAddresses.find(
          (network) => network.chainName === "mumbai"
        );
        console.log("goerliNetwork", goerliNetwork);
        console.log(goerliNetwork);
        setGoerliSmartWalletAddress(goerliNetwork.address);
      }
    };

    fetchGoerliSmartWallet();
  }, [etherspotAddresses, goerliSmartWalletAddress]);

  const onSentStakingTransactionReceiver = (e) => {
    console.log("Sent Staking Transaction:", e);
    setHasSentStakingTx(true);
  };

  const onSentMintTransactionReceiver = (e) => {
    console.log("Sent Mint Transaction:", e);
    setHasSentMintTx(true);
  };


  return (
    <Container>
      <Typography variant="h3">Transaction Kit</Typography>
      <Typography variant="h4">Staking Example</Typography>

      <Box m={2} />

      {goerliSmartWalletAddress ? (
        <MintTktTokens
          hasSentMintTx={hasSentMintTx}
          onSentMintTransactionReceiver={onSentMintTransactionReceiver}
          goerliSmartWalletAddress={goerliSmartWalletAddress}
        />
      ) : null}

      <Box m={2} />

      {hasSentMintTx ? (
        <StakeTktTokens
          hasSentMintTx={hasSentMintTx}
          hasSentStakingTx={hasSentStakingTx}
          onSentStakingTransactionReceiver={onSentStakingTransactionReceiver}
          goerliSmartWalletAddress={goerliSmartWalletAddress}
        />
      ) : null}

      <Box m={4} />

      <Paper sx={{ p: 2 }}>
        <Typography textAlign={"center"} variant="subtitle2">
          Etherspot Smart Wallet address: {goerliSmartWalletAddress}
        </Typography>
        <Typography textAlign={"center"} variant="subtitle2">
          TKT Token Contract: {"0x2A9bb3fB4FBF8e536b9a6cBEbA33C4CD18369EaF"}
        </Typography>
        <Typography textAlign={"center"} variant="subtitle2">
          TKT Staking Contract: {"0x0493b9a21dE42546B2E3687Da683D0B7B6ec2180"}
        </Typography>
      </Paper>
    </Container>
  );
}
