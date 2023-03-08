// server.js

// First, run 'npm install pusher express cookie-parser'
// Then run this file with 'node server.js'
const path = require("path");
const express = require("express");
var cors = require('cors')
const cookieParser = require("cookie-parser");
const Pusher = require("pusher");
const pusher = new Pusher({
  // appId: "app_1234",
  // key: "app_1234",
  // secret: "app_1234",
  // useTLS: false, 
  // cluster: "CLUSTER", 
  // host: "18.138.218.206", 
  // port: 8085, 

    appId: "app-id",
  key: "app-key",
  secret: "app-secret",
  useTLS: false, 
  cluster: "CLUSTER", 
  host: "127.0.0.1", 
  port: 6001, 
  

  //for pusher
  
  // appId: "1530977",
  // key: "e40ab1bf20cf837961fe",
  // secret: "ee17ad75d650f02c41a0",
  // useTLS: false, 
  // cluster: "ap2",  
  
  
  

 
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
app.listen(port, ()=>{
  
  console.log(`Listening on port ${port}!`) 
});

app.use('/trigger-notification',( req, res) => {
  pusher.trigger("node-my-channel", "my-event", { message: "hello world" });    
  res.send('Notification send.')
});

app.use('/catch-hook',( req, res) => {
    console.log('received data: ', req)
  res.send('Notification send.')
});