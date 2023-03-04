var pusherProduction = new Pusher("app-key", {
    authEndpoint: `http://127.0.0.1:8080/api/v1/profile`,
    wsHost: '18.138.218.206',
    wsPort: 8085,
    forceTLS: false,
    encrypted: true,
    disableStats: true,
    enabledTransports: ['ws', 'wss'],
});
// pusherProduction.subscribe('private-driverOne');
function autoConnectToAChannel(channel){
    pusherProduction.subscribe("driver.one");
}
pusherProduction.subscribe("driver.one").bind("ride_request_placed", (data) => {
    console.log('a new ride request placed', data)
   
})