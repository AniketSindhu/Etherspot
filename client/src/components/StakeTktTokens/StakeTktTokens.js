import { Typography, Paper, Button, Grid, Alert } from "@mui/material";
import {
  EtherspotContractTransaction,
  EtherspotApprovalTransaction,
  EtherspotBatches,
  EtherspotBatch,
  useEtherspotTransactions
} from "@etherspot/transaction-kit";
import { utils } from "ethers";

export default function StakeTktTokens(props) {
  const { estimate, send } = useEtherspotTransactions();

  const estimateAndStake = async () => {
    const estimateData = await estimate();
    console.log("Stake Estimate Data:", estimateData);

    if (JSON.stringify(estimateData).includes("reverted")) {
      alert("Tx reverted!");
      return;
    }

    const sendData = await send();
    console.log("Stake Send Data:", sendData);
  };

  return (
    <>
      {props.hasSentStakingTx ? (
        <Alert severity="success">
          You have sent the staking transaction to Etherspot!
        </Alert>
      ) : (
        <EtherspotBatches
          onEstimated={props.onEstimateReceiver}
          onSent={props.onSentStakingTransactionReceiver}
        >
          <EtherspotBatch chainId={80001}>
            <EtherspotApprovalTransaction
              tokenAddress={"0x2A9bb3fB4FBF8e536b9a6cBEbA33C4CD18369EaF"}
              receiverAddress={"0x0493b9a21dE42546B2E3687Da683D0B7B6ec2180"}
              value={"10"}
            />
            <EtherspotContractTransaction
              contractAddress={"0x0493b9a21dE42546B2E3687Da683D0B7B6ec2180"}
              abi={["function stake(uint)"]}
              methodName={"stake"}
              params={[utils.parseEther("10")]}
            >
              <Paper sx={{ p: 2 }} variant={"outlined"}>
                <Typography align="center">
                  Next, lets stake these tokens into an example staking contract
                  we have created.
                </Typography>

                <Grid container justifyContent="center">
                  <Button onClick={() => estimateAndStake()} variant="outlined">
                    Stake TKT Tokens
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
