import { Typography, Paper, Button, Grid, Alert } from "@mui/material";
import {
  EtherspotContractTransaction,
  EtherspotBatches,
  EtherspotBatch,
  useEtherspotTransactions
} from "@etherspot/transaction-kit";
import { utils } from "ethers";

export default function MintTktTokens(props) {
  const { estimate, send } = useEtherspotTransactions();
   
  const estimateAndMint = async () => {
      const estimateData = await estimate();
        console.log("Estimate Data:", estimateData);

    if (JSON.stringify(estimateData).includes("reverted")) {
      alert("Tx reverted! Did you top up mate");
      return;
    }

    const sendData = await send();
    console.log("Send Data:", sendData);
  };

  return (
    <>
      {props.hasSentMintTx ? (
        <Alert severity="success">
          The transaction to mint TKT tokens was sent to Etherspot
        </Alert>
      ) : (
        <EtherspotBatches
          onEstimated={props.onEstimateReceiver}
          onSent={props.onSentMintTransactionReceiver}
        >
          <EtherspotBatch chainId={80001}>
            <EtherspotContractTransaction
              contractAddress={"0x2A9bb3fB4FBF8e536b9a6cBEbA33C4CD18369EaF"}
              abi={["function mint(address, uint)"]}
              methodName={"mint"}
              params={[props.goerliSmartWalletAddress, utils.parseEther("10")]}
            >
              <Paper sx={{ p: 2 }} variant={"outlined"}>
                <Typography align="center">
                  First, let's mint some TKT tokens into your Etherspot Smart
                  Wallet on Goerli:
                  <pre>{props.goerliSmartWalletAddress}</pre>
                </Typography>

                <Grid container justifyContent="center">
                  <Button onClick={() => console.log("Hello")} variant="outlined">
                    Mint TKT Tokens
                  </Button>
                </Grid>
              </Paper>
            </EtherspotContractTransaction>
          </EtherspotBatch>
        </EtherspotBatches>
      )}
    </>
  );
}
