function isLoggedIn(){
    let token = window.getCookie('token');
    if(!token){ return false;}
    return true;
 }
//  if(isLoggedIn() ) {window.location.replace("index.php");}
//  if()
 function getProfile(){
    $.ajax({
        method: "GET",
        url: "http://127.0.0.1:8000/api/v1/profile",
        beforeSend: function (xhr){ 
            xhr.setRequestHeader('Authorization', getCookie('token')); 
        },
        success: function(result){
        console.log('profile is: ', result);
         setCookie('loggedDriver', JSON.stringify(result.driver));
      }});
  }
function logout(){
    console.log('logout button clicked');
    console.log('cccccccc', window.eraseCookie('loggedDriver') );
}