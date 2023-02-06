function isLoggedIn(){
    let token = window.localStorage.getItem('token')
    if(!token){ return false;}
    return true;
 }
 if(isLoggedIn() ) {
    // console.log('window location', window.location.pathname.split('/') );
    // window.location.replace("index.php");
}

function getProfile(){
    $.ajax({
        method: "GET",
        url: "http://127.0.0.1:8000/api/v1/profile",
        beforeSend: function (xhr){ 
            xhr.setRequestHeader('Authorization', window.localStorage.getItem('token')); 
        },
        success: function(response){
        console.log('profile is: ', response);
        window.localStorage.setItem('loggedDriver', JSON.stringify(response.driver));
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
              window.location.replace("index.php")
          }
        
      }});
}

function logout(){
    console.log('logout button clicked');
    window.localStorage.removeItem('token');
}
