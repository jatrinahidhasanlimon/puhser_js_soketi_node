
// window.setC();


function isLoggedIn(){
    let token = window.getCookie('token');
    if(!token){ return false;}
    return true;
 }

// if(!isLoggedIn()){
// console.log('what');
// window.location.replace("login.html");
// }