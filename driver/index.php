<?php include_once('partial/header.php'); ?>

<div class='container'>

    <h1>Driver: <span id="logged_driver_name_span"></span></h1>
    <h6> <button class="btn btn-primary" id="trigger_button">Trigger A Test Event</button></h6>

    <div class="card">
        <div class="card-header">
            <h6 class="text-center">Ride Request</h6>
        </div>
        <div class="card-body">

            <div class="row" id="bid_div">


            </div>
        </div>
    </div>

    <?php include_once('partial/script.php'); ?>
    <script>
        // if(!isLoggedIn()){
        //     window.location.replace("login.php");
        //   }
    </script>







    <?php include_once('partial/footer.php'); ?>