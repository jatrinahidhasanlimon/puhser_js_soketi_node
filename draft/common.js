
$.ajaxSetup({
    beforeSend: function(xhr, setting) {
      console.log("intercept before ajax send");
      console.log(xhr, setting);
    }
});




let token = window.localStorage.getItem('token')
function isLoggedIn(){
    if(!token){
        $('#login_nav_btn').show();
        return false;
    }else{
        $('#login_nav_btn').hide();
       
    }
   
    return true;
    
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
        beforeSend: function (xhr){ 
            xhr.setRequestHeader('Authorization', window.localStorage.getItem('token')); 
        },
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
                autoConnectToAChannel(response.driver.channel_name).then( (response)=> {
                    // window.location.replace("index.php")
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