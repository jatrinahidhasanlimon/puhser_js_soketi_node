
$.ajaxSetup({
    beforeSend: function(xhr, setting) {
      console.log("intercept before ajax send");
      xhr.setRequestHeader('Authorization', window.localStorage.getItem('token')); 
    }
});




let token = window.localStorage.getItem('token')
function isLoggedIn(){
    if(!token){
        $('#login_nav_btn').show();
       
        return false;
    }else{
        $('#login_nav_btn').hide();
        $('#logged_driver_name_span').text(getLoggedDriver().name);
       
    }
   
    return true;
    
 }
 function getLoggedDriver(){
    let loggedDriver = window.localStorage.getItem('loggedDriver')
    if(loggedDriver){
        return JSON.parse(loggedDriver);
    } 
 }
 function getActiveVehicle (){
    let activeVehicle = window.localStorage.getItem('activeVehicle')
    if(activeVehicle){
        return JSON.parse(activeVehicle);
    } return false;
 }
 
 
 if(!isLoggedIn() ) {
    if(window.location.pathname.split('/').pop() != 'login.php'){
        window.location.replace("login.php");
    }
}else{
    if(window.location.pathname.split('/').pop() == 'login.php'){
        console.log(token);
        // window.location.replace("index.php");`
        // return false;
    }
}
 
 function getProfile(){
    return $.ajax({
        method: "GET",
        url: "http://127.0.0.1:8080/api/v1/profile",
        // beforeSend: function (xhr){ 
        //     // xhr.setRequestHeader('Authorization', window.localStorage.getItem('token')); 
        // },
        success: function(response){
        console.log('profile is: ', response.driver);
        
          
      }});
  }
 async function login (data){
    console.log('From common function: ', data);
    $.ajax({
        method: "POST",
        url: "http://127.0.0.1:8080/api/v1/login",
        data:  data,
         success: function(response){
          if(response.status === 'success'){
              window.localStorage.setItem('token', response.token);

              getProfile().then( (response)=> {
                window.localStorage.setItem('loggedDriver', JSON.stringify(response.driver));
                window.localStorage.setItem('activeVehicle', JSON.stringify(response.active_vehicle));
                autoConnectToAChannel(`driver.${response.driver.id}`).then( (response)=> {
                    window.location.replace("index.php")
                });
               
              }).catch(function(error) {
                console.error(error);
              });   
            
          }
        
      }});
}


function logout(){
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('loggedDriver');
    window.localStorage.removeItem('activeVehicle');
    window.location.replace("login.php");
}





function storeCurrentLocation(){
    navigator.geolocation.getCurrentPosition((position) => {

            var data = {
                'latitude': position.coords.latitude,
                'longitude': position.coords.longitude,
                'vehicle_id': getActiveVehicle() ? getActiveVehicle().id : null,
                'service_type_id': getActiveVehicle() ? getActiveVehicle().service_type_id : null
            };
        if(token){
            $.ajax({
                method: "POST",
                url: "http://127.0.0.1:8080/api/v1/driver/store-current-location",
                data:  data,
                beforeSend: function (xhr){ 
                    xhr.setRequestHeader('Authorization', window.localStorage.getItem('token')); 
                },
                success: function(response){
                
              }});
        }
  });

}

  $(document).ready(function(){
    setInterval(storeCurrentLocation,100000);
  
    });


    


    function appendNewBidDiv(data){
        $( "#bid_div" ).append( `<div class="col-sm-4 mt-1">
        <div class="card" style="width: 28rem;">
            <img class="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNGZDlgqu5WAs9WAV_HS8wqpmneintd0grew&usqp=CAU" alt="Card image cap">
            <div class="card-body">
                <p class="card-text">
                    Distance : <span class="font-weight-bold"> ${data.pool.est_distance} </span>
                    Duration : <span class="font-weight-bold"> ${data.pool.est_duration} Minutes</span>
                </p>
                <h5 class="card-title">Ride ID: ${data.ride.id} </h5>
                
                <p class="card-text">
                   Fare : <span class="font-weight-bold" id="ride_fare_${data.ride.id}"> ${data.ride.fare} BDT.</span>
                   Distance : <span class="font-weight-bold"> ${data.ride.est_distance} KM</span>
                   Duration : <span class="font-weight-bold"> ${data.ride.est_duration} Minutes</span>
                </p>
                <p class="card-text">
                    pick: ${data.ride.pick_address}
                </p>
                <p class="card-text">
                    drop: ${data.ride.drop_address}
                </p>
                
                <div class="for-group row mb-2">
                    <input type="text" class="bid_amount form-control mt-1" id="driver_bid_amount_${data.ride.id}" placeholder="Enter your offer">
                    <button class="btn btn-info btn-sm float-right bid_now_btn"   data-ride_id="${data.ride.id}" >BID NOW</button>
                </div>
            
                <div class="mt-1">
                <a href="#" class="btn btn-primary accept_btn" data-ride_id="${data.ride.id}">Accept</a>
                <a href="#" class="btn btn-danger reject_btn">Reject</a>
                </div>
            </div>
        </div> 
    </div>` );
     }

     $(".container").on("click", ".accept_btn", function (event) {
        let ride_id = $(this).data("ride_id")
        console.log('ride id: ', ride_id)
        // let ride_details = $(`input[name="ride_details_${ride_id}['fare']"]`).val()
        let ride_details = parseFloat( $(`#ride_fare_${ride_id}`).text() )
        console.log('ride details is: ',  (ride_details))
    
        sendAjaxRequest(`http://localhost:8080/api/v1/ride-bid/${ride_id}`,{driver_id:  getLoggedDriver().id, offered_amount: ride_details})
    });


    function sendAjaxRequest(url,payload){
        return $.ajax({type: "POST",url: url, data: payload, success: function(result){
            $("#div1").html(result);
        }});
     }
   



























     
    function appendDivBid_old(data){
        $( "#bid_div" ).append( `<ul class="newest-auction center">
                    <li id="request_number_${data.ride.id}">
                        <input  name="ride_details_${data.ride.id}['fare']"  value="${data.ride.fare}">
                         <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNGZDlgqu5WAs9WAV_HS8wqpmneintd0grew&usqp=CAU" alt="">
                         <h6>${data.user.first_name} - RideID: ${data.ride.id}</h6>
                         <h6> Ride Number: ${data.ride.ride_number}</h6>
                         <div class="info">
                              <h6 class="title">Pick At: ${data.ride.pick_address} </h6>
                              <h6 class="title"> Drop At:  ${data.ride.drop_address} </h6>
                              <h2 class="price" > <span id="ride_fare_${data.ride.id}">  ${data.ride.fare} </span> BDT. </h2>
                              <h2 class="price"> ${data.ride.fare} BDT. </h2>
                              <p class="year">Distance: <span class="font-red-thunderbird">  ${data.ride.est_distance} KM</span></p>
                              <p class="milage">Time <span class="font-red-thunderbird">  ${data.ride.est_duration} </span> Minutes</p>
                              <ul>
                                   <li class="btn-bid">
                                      <input type="text" class="bid_amount" id="driver_bid_amount_${data.ride.id}" placeholder="Enter your offer">
                                      <button class="btn bid_now_btn"   data-ride_id="${data.ride.id}" >BID NOW</button>
                                  </li>
                                   <li class="btn-confirmation"> 
                                      <button class="btn accept_btn" data-ride_id="${data.ride.id}">Accept</button>
                                      <button class="btn reject_btn"  data-ride_id="${data.ride.id}" >Reject</button>
                                  </li>
                              </ul>
                         </div>
                    </li>
               </ul>` );
     }