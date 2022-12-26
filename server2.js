const Pusher = require("pusher")
var express = require('express');
var app = express();

  const pusherPrductionTwo = new Pusher({
    appId: "app_1234",
    key: "app_1234",
    secret: "app_1234",
    useTLS: false, // optional, defaults to false
    cluster: "CLUSTER", // if `host` is present, it will override the `cluster` option.
    host: "18.138.218.206", // optional, defaults to api.pusherapp.com
    port: 8085, // optional, defaults to 80 for non-TLS connections and 443 for TLS connections
    // encryptionMasterKeyBase64: ENCRYPTION_MASTER_KEY, // a base64 string which encodes 32 bytes, used to derive the per-channel encryption keys (see below!)
  })

  app.use('/trigger-notification',( req, res) => {
    pusherPrductionTwo.trigger("my-channel-dev", "my-event-dev", { message: "hello dev env"});    
    res.send('Notification send.')
  });
  

  app.listen(5000);