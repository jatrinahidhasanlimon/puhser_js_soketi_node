var pusherProduction = new Pusher(
    // "app-key",
    "e40ab1bf20cf837961fe",
     {
    authEndpoint: 'http://127.0.0.1:8080/broadcasting/auth',
    auth: {
        headers: {
            Authorization: `${token}`,
            Accept: 'application/json',
        },
    },
    // wsHost: '18.138.218.206',
    // wsPort: 8085,
    forceTLS: false,
    encrypted: true,
    disableStats: true,
    cluster: 'ap2',
    enabledTransports: ['ws', 'wss'],
});
var pusherProduction;
 async function autoConnectToAChannel(channelName= "Something"){
    console.log('From auto connect to a channel', channelName);
    pusherProduction =  pusherProduction.subscribe(`${channelName}`).bind("pusher:subscription_succeeded", (data) => {
        console.log('Succeed callback');
    });
}
if(token){
    var userDetails = window.localStorage.getItem('loggedUser');
    if(userDetails){
        var channel_name = `user.${JSON.parse(userDetails).id}`;
        autoConnectToAChannel(channel_name)
    }
}



pusherProduction.bind("new-bid-added", (data) => {
    console.log('Console log from new-bid-added event', data)
    appendNewBidDiv(data);
   
})