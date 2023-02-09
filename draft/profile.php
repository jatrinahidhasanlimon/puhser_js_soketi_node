<?php include_once('partial/header.php'); ?>

    <div class='container'>
        
    
    <div class="text-center">
        <div class="card">
            <div class="card-header">Profile</div>
            <div class="card-body">
                <table class="table table-striped table-dark" id="profile_table">
                    <tbody id="profile_table_body">
                        
                    </tbody>
                </table>

            </div>
        </div>

    </div>

    </div>
    <?php include_once('partial/script.php'); ?>
<script>
// if(!isLoggedIn()){
//     window.location.replace("login.php");
//   }

function  getProfileDeatils(){
    var driverDetails = window.localStorage.getItem('loggedDriver');
    if(driverDetails){
        var parsedDriver = JSON.parse(driverDetails)
        if(parsedDriver){
            var concatString = '';
            
            for (const key in parsedDriver) {
                console.log(`${key}: ${parsedDriver[key]}`);
                keyValue = parsedDriver[key]
                concatString += `<tr><td>${key} </td> <td> ${keyValue} </td></tr>`
            }
            $('#profile_table tbody').append(concatString)
        }
    }
}
getProfileDeatils();
</script>

<?php include_once('partial/footer.php'); ?>
