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
    fetchExistingBids();
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
    // console.log('from append: ', data)
    // return
        $( "#bid_div" ).append( `<div class="col-sm-4">
        <div class="card flex-row">
                <img class=""card-img-sm-left example-card-img-responsive" src="photos/sample-car.jpeg"/>
                <div class="card-body">
                <span class="badge rounded-pill bg-success text-white"> <span id="driver_ratings">${data.driver.rating}</span> * <span id="driver_total_trips">${data.driver.completed_rides}</span> trips</span>
                <h6 class="card-title">Driver: ${data.driver.name}</h6>
                <h6 class="card-title">Ride ID: ${data.ride_id}</h6>
                <h5 class="card-title">Corolla Axio 2014</h5>
                <span class="badge rounded-pill bg-info text-dark ${data.discount > 0 ? 'text-decoration-line-through' : ''}">${data.bid_fare} BDT.</span>
                <span class="badge rounded-pill bg-info text-dark ${data.discount <= 0 ? 'd-none' : ''}" >${ data.user_display_fare} BDT.</span>
                <ul class="list-group list-group-horizontal my-1 overflow-auto">
                    <li class="list-group-item"> <span id="est_duration">${data.est_duration}</span> m</li>
                    <li class="list-group-item"><span id="est_distance">${data.est_distance}</span> minutes away</li>
                </ul>
                <button id="accept_bid_btn_id_${data.id}" class="btn btn-primary accept_bid_btn" data-bid_fare="${data.bid_fare}" data-bid_id="${data.id}" data-ride_id="${data.ride_id}" type="button">Accept</button>
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
        sendAjaxRequest(`http://localhost:8000/api/v1/bid/${bid_id}/accept`,{ bid_id:  bid_id, fare: bid_fare}).then((response)=>{
            if(response){
                console.log('after accept response: ', response)
                if(response.code == 200){
                    // $(`#accept_bid_btn_id_${bid_id}`).hide();
                }
            }
          })
    });

    function fetchExistingBids() {
        let sendRequest = sendAjaxRequest( `http://localhost:8000/api/v1/get-all-active-bids`, {}, "GET"  )
        sendRequest.then((response) => {
            console.log('after then result is: ', response);
            if (response) {
                if(response.bids){
                    response.bids.forEach(element => {
                        console.log('check ', element)
                        appendNewBidDiv(element)
                    });
                }
               
            }
        })
    }


    function sendAjaxRequest(url,payload, method=null){
        console.log('method is: ', method);
        let requestType = 'POST';
        if(method){
            requestType = method;
        }
        return $.ajax({method:requestType,url: url, data: payload, success: function(result){
            $("#div1").html(result);
        }});
     }
   