let token = window.localStorage.getItem('token')
function isLoggedIn(){
    if(!token){
        $('#login_nav_btn').show();
        return false;
    }
    $('#login_nav_btn').hide();
    return true;
    
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
                window.location.replace("index.php")
              }).catch(function(error) {
                console.error(error);
              });   
            
          }
        
      }});
}

function logout(){
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('loggedDriver');
    window.location.replace("login.php");
}
