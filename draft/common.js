
 function isLoggedIn(){
           let token = $.getCookie('token');
           if(!token){ return false;}
           return true;
        }

if(!isLoggedIn()){
    window.location.replace("login.html");
}