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
pusherProduction.bind("ride-created", (data) => {
    console.log('ride-created Event', data)
    appendNewBidDiv(data);
   
})


// pusherProduction.subscribe("driverAnother").bind("ride_request_placed", (data) => {
//     console.log('a new ride request placed', data)
   
// })

// pusherProduction.subscribe("driver.one").bind("ride_request_placed", (data) => {
//     console.log('a new ride request placed', data)
   
// })


$("body").on("click", "#trigger_button", function (event) {
    console.log('event triggered')
    pusherProduction.trigger('client-eventName', 'data');
});
