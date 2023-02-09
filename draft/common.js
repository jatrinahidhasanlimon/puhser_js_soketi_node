function isLoggedIn(){
    let token = window.localStorage.getItem('token')
    if(!token){ return false;}
    return true;
 }
 if(!isLoggedIn() ) {
    if(window.location.pathname.split('/').pop() != 'login.php'){
        window.location.replace("login.php");
    }
}else{
    if(window.location.pathname.split('/').pop() == 'login.php'){
        // window.location.replace("index.php");`
        return false;
    }
}

function getProfile(){
    $.ajax({
        method: "GET",
        url: "http://127.0.0.1:8000/api/v1/profile",
        beforeSend: function (xhr){ 
            xhr.setRequestHeader('Authorization', window.localStorage.getItem('token')); 
        },
        success: function(response){
        console.log('profile is: ', response.driver);
        window.localStorage.setItem('loggedDriver', JSON.stringify(response.driver));
          window.location.replace("index.php")
      }});
  }
function login (data){
    console.log('From common function: ', data);
    $.ajax({
        method: "POST",
        url: "http://127.0.0.1:8000/api/v1/login",
        data:  data,
        success: function(response){
          if(response.status == 'success'){
              window.localStorage.setItem('token', response.token);
              getProfile();
            
          }
        
      }});
}

function logout(){

    window.localStorage.removeItem('token');
    window.localStorage.removeItem('loggedDriver');
    window.location.replace("login.php");
}
