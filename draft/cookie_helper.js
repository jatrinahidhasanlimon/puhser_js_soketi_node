
window.myfunc = (function(){console.log("o hai");});  
// (function($){
//     $.fn.sample_global_function = function(){
//         console.log('its an global function')
//     }
//   })(jQuery);
window.setCookie = function (cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
      }
      

window.getCookie =  function (cname) {
        let name = cname + "=";
        let ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }
      
      
window.checkCookie = function () {
        let user = getCookie("username");
        if (user != "") {
          alert("Welcome again " + user);
        } else {
          user = prompt("Please enter your name:", "");
          if (user != "" && user != null) {
            setCookie("username", user, 365);
          }
        }
    }
window.eraseCookie = function (cname) {
  // document.cookie = cname+'=; Max-Age=-99999999;';  
  document.cookie = "loggedDriver=/; expires = Thu, 01 Jan 1970 00:00:00 GMT"
}






