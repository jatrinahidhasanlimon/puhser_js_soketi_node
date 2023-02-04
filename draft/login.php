<?php include_once('partial/header.php'); ?>
    <div class="login-page">
        <div class="form">
          <form class="register-form">
            <input type="text" placeholder="name"/>
            <input type="password" placeholder="password"/>
            <input type="text" placeholder="email address"/>
            <button>create</button>
            <p class="message">Already registered? <a href="#">Sign In</a></p>
          </form>

          <form class="login-form" id="login_form" method="post">
            <input name="mobile" type="text" value="+8801621316727" placeholder="phone"/>
            <input name="password" type="password" value="password" placeholder="password"/>
            <button id="login_btn">login</button>
            <p class="message">Not registered? <a href="#">Create an account</a></p>
          </form>
        </div>
      </div>
      <?php include_once('partial/script.php'); ?>
      <script>
        
        console.log('is token exist: ', isLoggedIn());

        $('.message a').click(function(){
            $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
        });
         $('#login_btn').click(function(e){
          e.preventDefault();
            
          // return;
          var data = $('#login_form').serialize();
            // $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
            console.log('login btuun clicke');
            $.ajax({
              method: "POST",
              url: "http://127.0.0.1:8000/api/v1/login",
              data:  data,
              success: function(result){
                if(result.status == 'success'){
                    setCookie('token', result.token);
                    getProfile();
                    window.location.replace("index.php")
                }
              
            }});
        });
      </script>
<?php include_once('partial/footer.php'); ?>