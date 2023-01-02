// server.js

// First, run 'npm install pusher express cookie-parser'
// Then run this file with 'node server.js'
const path = require("path");
const express = require("express");
var cors = require('cors')
const cookieParser = require("cookie-parser");
const Pusher = require("pusher");
const pusher = new Pusher({
  appId: "app_1234",
  key: "app_1234",
  secret: "app_1234",
  useTLS: false, // optional, defaults to false
  cluster: "CLUSTER", // if `host` is present, it will override the `cluster` option.
  host: "18.138.218.206", // optional, defaults to api.pusherapp.com
  port: 8085, // optional, defaults to 80 for non-TLS connections and 443 for TLS connections
  // encryptionMasterKeyBase64: ENCRYPTION_MASTER_KEY, // a base64 string which encodes 32 bytes, used to derive the per-channel encryption keys (see below!)
})
const app = express();

app.use(cors({
  origin: '*'
}));


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});
app.post("/pusher/auth", (req, res) => {
  console.log('Request body is: ', req.cookies)
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  // Primitive auth: the client self-identifies. In your production app,
  // the client should provide a proof of identity, like a session cookie.
  // const user_id = req.cookies.user_id;
  const randNumber= Math.random() * 2.5
  const user_id = `limon_${randNumber}` ;
  console.log('unique user is: ', user_id)
  const presenceData = { user_id };
  const authResponse = pusher.authorizeChannel(socketId, channel, presenceData);
  res.send(authResponse);
});
const port = process.env.PORT || 5100;
app.listen(port, () => console.log(`Listening on port ${port}!`));