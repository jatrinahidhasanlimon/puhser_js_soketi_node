const Pusher = require("pusher")
var express = require('express');
var app = express();

const pusherPrduction = new Pusher({
    appId: "app-id",
    key: "app-key",
    secret: "app-secret", 
    useTLS: false, // optional, defaults to false
    cluster: "CLUSTER", // if `host` is present, it will override the `cluster` option.
    host: "18.138.218.206", // optional, defaults to api.pusherapp.com
    port: 8085, // optional, defaults to 80 for non-TLS connections and 443 for TLS connections
    // encryptionMasterKeyBase64: ENCRYPTION_MASTER_KEY, // a base64 string which encodes 32 bytes, used to derive the per-channel encryption keys (see below!)
  })
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
const pusher = new Pusher({ 
    appId: "app_1234",
    key: "app_1234",
    secret: "app_1234",
    useTLS: false, // optional, defaults to false
    cluster: "CLUSTER", // if `host` is present, it will override the `cluster` option.
    host: "127.0.0.1", // optional, defaults to api.pusherapp.com
    port: 6001, // optional, defaults to 80 for non-TLS connections and 443 for TLS connections
    // encryptionMasterKeyBase64: ENCRYPTION_MASTER_KEY, // a base64 string which encodes 32 bytes, used to derive the per-channel encryption keys (see below!)
  })
const pusher2 = new Pusher({ 
    appId: "app_1234_three_ok",
    key: "app_1234_three_ok",
    secret: "app_1234_three_ok",
    useTLS: false, // optional, defaults to false
    cluster: "CLUSTER", // if `host` is present, it will override the `cluster` option.
    host: "127.0.0.1", // optional, defaults to api.pusherapp.com
    port: 6001, // optional, defaults to 80 for non-TLS connections and 443 for TLS connections
    // encryptionMasterKeyBase64: ENCRYPTION_MASTER_KEY, // a base64 string which encodes 32 bytes, used to derive the per-channel encryption keys (see below!)
  })

 


  app.use('/trigger-notification',( req, res) => {

    // pusher.trigger("my-channel", "my-event", { message: "hello world" });    
    // pusher2.trigger("my-channel", "my-event", { message: "hello world from pusher two"});    
    // pusherPrduction.trigger("my-channel-dev", "my-event-dev", { message: "hello dev env"});    
    pusherPrductionTwo.trigger("my-channel-dev", "my-event-dev", { message: "hello dev env"});    


    res.send('Notification send.')
  });
  

  app.listen(5000);