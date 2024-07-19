const express = require('express');
const { spawn } = require('child_process');

const app = express();

app.use(express.json());


app.post('/sipsak', (req, res) => {
  const { hostIp, hostPort = '5060', username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  const sipsak = spawn('sipsak', [
    '-u', username,
    '-a', password,
    '-O', 'pinger@sipsaker.com', // Placeholder for the origin SIP URI
    '-s', `sip:${hostIp}:${hostPort}`
  ]);

  let output = '';

  sipsak.stdout.on('data', (data) => {
    output += data.toString();
  });

  sipsak.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  sipsak.on('close', (code) => {
    if (code === 0) {
      console.log('SIP server is available');
      res.status(200).send(`SIP server is AVAILABLE\n${output}`);
    } else {
      console.log('SIP server is not available');
      res.status(502).send(`SIP server is NOT available\n${output}`);
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



app.listen(3033, () => console.log('sipsaker started on port 3033'));
