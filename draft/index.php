<?php include_once('partial/header.php'); ?>

    <div class='container'>
        
    <h1 >Driver:  <span id="logged_driver_name_span"></span></h1>
   
    <div class="row" id="bid_div">
    <!-- <div class="col-sm-4 mt-1">
        <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNGZDlgqu5WAs9WAV_HS8wqpmneintd0grew&usqp=CAU" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">Ride ID: ${data.ride.id} </h5>
                <p class="card-text">
                    pick: ${data.ride.pick_address}
                </p>
                <p class="card-text">
                    drop: ${data.ride.drop_address}
                </p>
                
                <div class="for-group row mb-2">
                    <input type="text" class="bid_amount form-control mt-1" id="driver_bid_amount_${data.ride.id}" placeholder="Enter your offer">
                    <button class="btn btn-info btn-sm float-right bid_now_btn"   data-ride_id="${data.ride.id}" >BID NOW</button>
                </div>
            
                <div class="mt-1">
                <a href="#" class="btn btn-primary">Accept</a>
                <a href="#" class="btn btn-danger">Reject</a>
                </div>
            </div>
        </div> 
    </div> -->

    </div>
    
    <?php include_once('partial/script.php'); ?>
<script>
// if(!isLoggedIn()){
//     window.location.replace("login.php");
//   }
</script>







<?php include_once('partial/footer.php'); ?>
