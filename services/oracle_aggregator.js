const express = require('express');
const Web3 = require('web3');
const axios = require('axios');

const app = express();
app.use(express.json());

// --- Configuration ---
const ORACLE_KEY = process.env.NMZ_ORACLE_KEY_PRIVATE; // Secured Oracle Private Key
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || "0x...SDL_ADDRESS...";
const WEB3_PROVIDER = process.env.WEB3_PROVIDER || "http://private_eth_fork_node:8545";
const MIDDLEWARE_ENDPOINT = process.env.MIDDLEWARE_ENDPOINT || "http://middleware_release_handler:4000/release_trigger";

const web3 = new Web3(WEB3_PROVIDER);
// Contract ABI should be provided in real deployment
const SDL_ABI = [];
const sdlContract = new web3.eth.Contract(SDL_ABI, CONTRACT_ADDRESS);

app.post('/scoutbot_data', async (req, res) => {
    const { FGI, GPI, BHV } = req.body;
    try {
        const tx = sdlContract.methods.update_sentiment_data(
            parseInt(FGI),
            parseInt(GPI),
            parseInt(BHV)
        );
        const account = web3.eth.accounts.privateKeyToAccount(ORACLE_KEY);
        const gas = await tx.estimateGas({ from: account.address });
        const signedTx = await account.signTransaction({
            to: CONTRACT_ADDRESS,
            data: tx.encodeABI(),
            gas: gas,
        });
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log(`[DAX DAC] Data submitted to SDL. FGI:${FGI}, GPI:${GPI}, BHV:${BHV}.`);
        res.status(200).send({ status: 'Data Submitted', txHash: receipt.transactionHash });
    } catch (error) {
        console.error('[DAX DAC] SDL Transaction Failed:', error.message);
        res.status(500).send({ status: 'Transaction Error' });
    }
});

function listenForRelease() {
    console.log('[DAX DAC] Listening for TrackReleaseEvent...');
    sdlContract.events.TrackReleaseEvent({ fromBlock: 'latest' })
    .on('data', async (event) => {
        console.log(`\n[!!! ACTIVATION SUCCESS !!!] SDL Triggered Release: ${event.returnValues.assetID}`);
        await axios.post(MIDDLEWARE_ENDPOINT, {
            assetId: event.returnValues.assetID,
            timestamp: event.returnValues.timestamp,
            legalHash: event.returnValues.legalNoticeHash
        });
        console.log('[DAX DAC] Middleware successfully engaged.');
    })
    .on('error', (error) => console.error('SDL Event Listener Error:', error));
}

app.listen(3000, () => {
    console.log('[DAX DAC] Back-End Oracle Aggregator running on port 3000.');
    listenForRelease();
});
