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
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('loggedUser');
    window.location.replace("login.php");
}


function appendNewBidDiv(data){
        $( "#bid_div" ).append( `<div class="col-sm-4">
        <div class="card flex-row">
                <img class=""card-img-sm-left example-card-img-responsive" src="photos/sample-car.jpeg"/>
                <div class="card-body">
                <span class="badge rounded-pill bg-success text-white"> <span id="driver_ratings">2.3</span> * <span id="driver_total_trips">45</span> trips</span>
                <h5 class="card-title">Corolla Axio 2014</h5>
                <span class="badge rounded-pill bg-info text-dark ">100 BDT.</span>
                <ul class="list-group list-group-horizontal my-1 overflow-auto">
                    <li class="list-group-item"> <span id="driver_total_trips">45</span> m</li>
                    <li class="list-group-item"><span id="driver_total_trips">45</span> minutes away</li>
                </ul>
                <button class="btn btn-primary accept_bid_btn" data-bid_id="${data.bid.id}" type="button">Accept</button>
                </div>
        </div>
       </div>` );
     }

     $(".container").on("click", ".accept_bid_btn", function (event) {
        let bid_id = $(this).data("bid_id")
        console.log('ride id: ', bid_id)
        // let ride_details = $(`input[name="ride_details_${bid_id}['fare']"]`).val()
        let ride_details = parseFloat( $(`#ride_fare_${bid_id}`).text() )
        console.log('ride details is: ',  (ride_details))
    
        sendAjaxRequest(`http://localhost:8080/api/v1/ride-bid/${bid_id}`,{driver_id:  getLoggedUser().id, offered_amount: ride_details})
    });


    function sendAjaxRequest(url,payload){
        return $.ajax({type: "POST",url: url, data: payload, success: function(result){
            $("#div1").html(result);
        }});
     }
   