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
        if(isLoggedIn()){
          
        }
        console.log('is token exist: ', isLoggedIn());

        $('.message a').click(function(){
            $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
        });


         $('#login_btn').click(function(e){
          e.preventDefault();
          var data = $('#login_form').serialize();
            login(data);
        });


      </script>
<?php include_once('partial/footer.php'); ?>