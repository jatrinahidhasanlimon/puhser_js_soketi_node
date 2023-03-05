var pusherProduction = new Pusher("app-key", {
    authEndpoint: 'http://127.0.0.1:8080/broadcasting/auth',
    auth: {
        headers: {
            Authorization: `${token}`,
            Accept: 'application/json',
        },
    },
    wsHost: '18.138.218.206',
    wsPort: 8085,
    forceTLS: false,
    encrypted: true,
    disableStats: true,
    enabledTransports: ['ws', 'wss'],
});
var loggedDriverChannel;
 async function autoConnectToAChannel(channelName= "Something"){
    console.log('From auto connect to a channel', channelName);
    pusherProduction.subscribe(`${channelName}`).bind("pusher:subscription_succeeded", (data) => {
        console.log('Succeed callback');
    });
    // pusherProduction.subscribe(`private-test.1`).bind("pusher:subscription_succeeded", (data) => {
    //     console.log('Succeed callback');
    // });
}
if(token){
    var driverDetails = window.localStorage.getItem('loggedDriver');
    if(driverDetails){
        var channel_name = `private-driver.${JSON.parse(driverDetails).id}`;
        autoConnectToAChannel(channel_name)
    }
}



pusherProduction.bind("ride_request_placed", (data) => {
    console.log('Console log from a singular ride_request_placed event', data)
   
})


// pusherProduction.subscribe("driverAnother").bind("ride_request_placed", (data) => {
//     console.log('a new ride request placed', data)
   
// })

// pusherProduction.subscribe("driver.one").bind("ride_request_placed", (data) => {
//     console.log('a new ride request placed', data)
   
// })