<?php include_once('partial/header.php'); ?>
    <div class="login-page">
        <div class="form">
          

          <form class="login-form" id="login_form" method="post" class="bg-secondary">
          <h5 class=" m-2">Login To User App</h5>
            <input name="mobile" type="text" value="1" placeholder="mobile" id="mobile_input"/>
            <input name="password" type="password" value="password" placeholder="password"/>
            <button id="login_btn">login</button>
            
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