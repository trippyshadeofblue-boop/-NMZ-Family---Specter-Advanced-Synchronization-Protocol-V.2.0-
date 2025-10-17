const express = require('express');
const app = express();
app.use(express.json());

app.post('/drop_flip', (req, res) => {
    const { status, trackUrl } = req.body;
    if (status === 'LIVE') {
        console.log('\n[DAN] FRONT-END ACTIVATED! Changing dashboard to release mode.');
        // In a real front-end, swap the UI to release mode. This is a placeholder server-side endpoint.
        res.status(200).send({ message: 'Dashboard switched to LIVE status' });
    } else {
        res.status(400).send({ message: 'Invalid flip status' });
    }
});

app.listen(8080, () => {
    console.log('[PDS Fee] Front-End Dashboard running on port 8080.');
});
