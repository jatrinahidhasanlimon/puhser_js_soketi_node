$.ajaxSetup({
    beforeSend: function(xhr, setting) {
      console.log("intercept before ajax send");
      xhr.setRequestHeader('Authorization', window.localStorage.getItem('userToken')); 
    }
});




let token = window.localStorage.getItem('userToken')

function isLoggedIn(){
    if(!token){
        $('#login_nav_btn').show();
        return false;
    }else{
        $('#login_nav_btn').hide();
        $('#logged_user_name_span').text(getLoggedUser().name);
       
    }
   
    return true;
    
 }


 function getLoggedUser(){
    let loggedUser = window.localStorage.getItem('loggedUser')
    if(loggedUser){
        return JSON.parse(loggedUser);
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
    console.log('from login function user data: ', data);
    console.log('mobile number is:  ', $('#mobile_input').val());
    window.localStorage.setItem('userToken', 'hahahhahhahhtokebnehhf');
    var customUser = {
        'name' : 'test user',
        'id' : $('#mobile_input').val()
    }
    window.localStorage.setItem('loggedUser', JSON.stringify(customUser));
    
    autoConnectToAChannel(`user.${$('#mobile_input').val()}`).then( (response)=> {
          window.location.replace("index.php")
        });
    // $.ajax({
    //     method: "POST",
    //     url: "http://127.0.0.1:8080/api/v1/login",
    //     data:  data,
    //      success: function(response){
    //       if(response.status === 'success'){
    //           window.localStorage.setItem('token', response.token);

    //           getProfile().then( (response)=> {
    //             window.localStorage.setItem('loggedUser', JSON.stringify(response.driver));
    //             window.localStorage.setItem('activeVehicle', JSON.stringify(response.active_vehicle));
    //             autoConnectToAChannel(`driver.${response.driver.id}`).then( (response)=> {
    //                 window.location.replace("index.php")
    //             });
               
    //           }).catch(function(error) {
    //             console.error(error);
    //           });   
            
    //       }
        
    //   }});
}


function logout(){
    window.localStorage.removeItem('userToken');
    window.localStorage.removeItem('loggedUser');
    window.location.replace("login.php");
}


function appendNewBidDiv(data){
        $( "#bid_div" ).append( `<div class="col-sm-4">
        <div class="card flex-row">
                <img class=""card-img-sm-left example-card-img-responsive" src="photos/sample-car.jpeg"/>
                <div class="card-body">
                <span class="badge rounded-pill bg-success text-white"> <span id="driver_ratings">${data.driver.rating}</span> * <span id="driver_total_trips">${data.driver.completed_rides}</span> trips</span>
                <h6 class="card-title">Driver: ${data.driver.name}</h6>
                <h6 class="card-title">Ride ID: ${data.bid.ride_id}</h6>
                <h5 class="card-title">Corolla Axio 2014</h5>
                <span class="badge rounded-pill bg-info text-dark ">${data.bid.bid_fare} BDT.</span>
                <ul class="list-group list-group-horizontal my-1 overflow-auto">
                    <li class="list-group-item"> <span id="est_duration">${data.bid.est_duration}</span> m</li>
                    <li class="list-group-item"><span id="est_distance">${data.bid.est_distance}</span> minutes away</li>
                </ul>
                <button id="accept_bid_btn_id_${data.bid.id}" class="btn btn-primary accept_bid_btn" data-bid_fare="${data.bid.bid_fare}" data-bid_id="${data.bid.id}" data-ride_id="${data.bid.ride_id}" type="button">Accept</button>
                </div>
        </div>
       </div>` );
     }

     $(".container").on("click", ".accept_bid_btn", function (event) {
        let bid_id = $(this).data("bid_id")
        let ride_id = $(this).data("ride_id")
        let bid_fare = parseFloat( $(this).data("bid_fare") )
        console.log('bid  fare is: ',  (bid_fare))
        console.log('ride id: ', bid_id)
        console.log('bid id: ', bid_id)
        sendAjaxRequest(`http://localhost:8000/api/v1/ride/${ride_id}/bid/${bid_id}/accept`,{ bid_id:  bid_id, fare: bid_fare}).then((response)=>{
            if(response){
                console.log('after accept response: ', response)
                if(response.code == 200){
                    // $(`#accept_bid_btn_id_${bid_id}`).hide();
                }
            }
          })
    });

    function fetchExistingBids(){
        
    }


    function sendAjaxRequest(url,payload){
        return $.ajax({type: "POST",url: url, data: payload, success: function(result){
            $("#div1").html(result);
        }});
     }
   