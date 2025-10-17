const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const FRONTEND_FLIP_ENDPOINT = process.env.FRONTEND_FLIP_ENDPOINT || "http://frontend_dashboard:8080/drop_flip";
const DISTRIBUTOR_WEBHOOK = process.env.DISTRIBUTOR_WEBHOOK || "http://secure_distributor_api/go_live";
const SOCIAL_MEDIA_WEBHOOK = process.env.SOCIAL_MEDIA_WEBHOOK || "http://social_api/post_legal";
const GLITCH_ANTHEM_URL = process.env.GLITCH_ANTHEM_URL || "https://nmzfamily.com/glitchanthem/release";

app.post('/release_trigger', async (req, res) => {
    const { assetId, timestamp, legalHash } = req.body;
    if (assetId !== 'GlitchAnthem') {
        console.error('[NMZ Cochran] Invalid asset ID received. Aborting.');
        return res.status(400).send({ status: 'Invalid Asset' });
    }

    console.log('\n[NMZ Cochran] Middleware Activated. Starting 3-Pronged Legal/Distribution Protocol.');
    try {
        await axios.post(FRONTEND_FLIP_ENDPOINT, { status: 'LIVE', trackUrl: GLITCH_ANTHEM_URL });
        console.log(' [LOG] 1. Front-End Dashboard Flipped.');

        await axios.post(DISTRIBUTOR_WEBHOOK, { assetId: assetId, releaseTime: timestamp });
        console.log(' [LOG] 2. Distributor "Go Live" Triggered.');

        await axios.post(SOCIAL_MEDIA_WEBHOOK, { message: `NMZ Glitch Anthem is LIVE! Released via autonomous algorithm. Legal Hash: ${legalHash}` });
        console.log(' [LOG] 3. Legal Compliance Notice Posted.');

        console.log(`[NMZ Cochran] FULL AUDIT LOG: ${assetId} release confirmed at ${new Date(timestamp * 1000).toISOString()}. Autonomous release verified.`);
        res.status(200).send({ status: 'Release Complete', asset: assetId });
    } catch (error) {
        console.error('[NMZ Cochran] CRITICAL RELEASE FAILURE during distribution:', error.message);
        res.status(500).send({ status: 'Partial Failure - Requires Manual Review' });
    }
});

app.listen(4000, () => {
    console.log('[NMZ Cochran] Middleware Release Handler running on port 4000.');
});
