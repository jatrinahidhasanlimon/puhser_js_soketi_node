
$.ajaxSetup({
    beforeSend: function (xhr, setting) {
        console.log("intercept before ajax send");
        xhr.setRequestHeader('Authorization', window.localStorage.getItem('token'));
    }
});




let token = window.localStorage.getItem('token')
function isLoggedIn() {
    if (!token) {
        $('#login_nav_btn').show();

        return false;
    } else {
        $('#login_nav_btn').hide();
        $('#logged_driver_name_span').text(getLoggedDriver().name);

    }

    return true;

}
function getLoggedDriver() {
    let loggedDriver = window.localStorage.getItem('loggedDriver')
    if (loggedDriver) {
        return JSON.parse(loggedDriver);
    }
}
function getActiveVehicle() {
    let activeVehicle = window.localStorage.getItem('activeVehicle')
    if (activeVehicle) {
        return JSON.parse(activeVehicle);
    } return false;
}


if (!isLoggedIn()) {
    if (window.location.pathname.split('/').pop() != 'login.php') {
        window.location.replace("login.php");
    }
} else {
    if (window.location.pathname.split('/').pop() == 'login.php') {
        console.log(token);
        
        // window.location.replace("index.php");`
        // return false;
    }
    fetchExistingBids();
}

function getProfile() {
    return $.ajax({
        method: "GET",
        url: "http://127.0.0.1:8080/api/v1/profile",
        // beforeSend: function (xhr){ 
        //     // xhr.setRequestHeader('Authorization', window.localStorage.getItem('token')); 
        // },
        success: function (response) {
            console.log('profile is: ', response.driver);


        }
    });
}
async function login(data) {
    console.log('From common function: ', data);
    $.ajax({
        method: "POST",
        url: "http://127.0.0.1:8080/api/v1/login",
        data: data,
        success: function (response) {
            if (response.status === 'success') {
                window.localStorage.setItem('token', response.token);

                getProfile().then((response) => {
                    window.localStorage.setItem('loggedDriver', JSON.stringify(response.driver));
                    window.localStorage.setItem('activeVehicle', JSON.stringify(response.active_vehicle));
                    autoConnectToAChannel(`driver.${response.driver.id}`).then((response) => {
                        window.location.replace("index.php")
                    });
                    // fetch existing bids 
                    fetchExistingBids();
                    // fetch existing bids 

                }).catch(function (error) {
                    console.error(error);
                });

            }

        }
    });
}


function logout() {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('loggedDriver');
    window.localStorage.removeItem('activeVehicle');
    window.location.replace("login.php");
}





function storeCurrentLocation() {
    navigator.geolocation.getCurrentPosition((position) => {

        var data = {
            'latitude': position.coords.latitude,
            'longitude': position.coords.longitude,
            'vehicle_id': getActiveVehicle() ? getActiveVehicle().id : null,
            'service_type_id': getActiveVehicle() ? getActiveVehicle().service_type_id : null
        };
        if (token) {
            $.ajax({
                method: "POST",
                url: "http://127.0.0.1:8080/api/v1/driver/store-current-location",
                data: data,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', window.localStorage.getItem('token'));
                },
                success: function (response) {

                }
            });
        }
    });

}

$(document).ready(function () {
    setInterval(storeCurrentLocation, 100000);

});





function appendNewBidDiv(data) {
    $("#bid_div").append(`<div class="col-sm-4 mt-1" id="root_card_ride_${data.ride.id}">
        <div class="card" style="width: 28rem;">
            <img class="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNGZDlgqu5WAs9WAV_HS8wqpmneintd0grew&usqp=CAU" alt="Card image cap">
            <div class="card-body">
                <p class="card-text">
                    Distance : <span class="font-weight-bold"> ${data.est_distance} </span>
                    Duration : <span class="font-weight-bold"> ${data.est_duration} Minutes</span>
                </p>
                <h5 class="card-title">Ride ID: ${data.ride.id} </h5>
                
                <p class="card-text">
                   Fare : <span class="font-weight-bold" id="ride_fare_${data.ride.id}"> ${data.ride.fare} BDT.</span>
                   Distance : <span class="font-weight-bold"> ${data.ride.est_distance} KM</span>
                   Duration : <span class="font-weight-bold"> ${data.ride.est_duration} Minutes</span>
                </p>
                <p class="card-text">
                    pick: ${data.ride.pick_address}
                </p>
                <p class="card-text">
                    drop: ${data.ride.drop_address}
                </p>
                    <p class="btn btn-success" id="after_bid_amount_ride_${data.ride.id}">  </p>
                <div id="root_bid_control_ride_${data.ride.id}">
                    <div class="for-group row mb-2">
                        <input type="text" class="bid_amount form-control mt-1" id="bid_now_value_${data.ride.id}" placeholder="Enter your offer">
                        <button class="btn btn-info btn-sm float-right bid_now_btn" data-ride_id="${data.ride.id}" >BID NOW</button>
                    </div>
                
                    <div class="mt-1">
                    <a href="#" class="btn btn-primary alright_btn" data-ride_id="${data.ride.id}">Alright</a>
                    <a href="#" class="btn btn-danger reject_btn">Reject</a>
                    </div>
                </div>
            </div>
        </div> 
    </div>` );
}

$(".container").on("click", ".alright_btn", function (event) {
    let ride_id = $(this).data("ride_id")
    let ride_fare = parseFloat($(`#ride_fare_${ride_id}`).text())
    console.log('ride id: ', ride_id)
    console.log('ride fare is: ', (ride_fare))
    let sendRequest = sendAjaxRequest(`http://localhost:8080/api/v1/ride/${ride_id}/bid`, { driver_id: getLoggedDriver().id, fare: ride_fare }, "POST")

    sendRequest.then((response) => {
        console.log('after then result is: ', response);
        if (response) {
            if (response.bid) {
                console.log('Biddined amount is: ', response.bid.bid_fare)
                // $(`#root_bid_control_ride_${ride_id}`).hide();
                $(`#after_bid_amount_ride_${ride_id}`).text(`${response.bid.bid_fare} BDT.`);
            }
        }
    })

});

$(".container").on("click", ".bid_now_btn", function (event) {
    let ride_id = $(this).data("ride_id")
    let ride_fare = parseFloat($(`#bid_now_value_${ride_id}`).val())
    console.log('ride fare type: ', typeof ride_fare)
    console.log('bid value: ', $(`#bid_now_value_${ride_id}`).val())

    if (!ride_fare || ride_fare < 0) {
        return alert('Please provide a valid value:')
    }

    let sendRequest = sendAjaxRequest(`http://localhost:8080/api/v1/ride/${ride_id}/bid`, { driver_id: getLoggedDriver().id, fare: ride_fare }, 'POST')
    sendRequest.then((response) => {
        console.log('after then result is: ', response);
        if (response) {
            if (response.bid) {
                console.log('Biddined amount is: ')
                // $(`#root_bid_control_ride_${ride_id}`).hide();
                $(`#after_bid_amount_ride_${ride_id}`).text(`${response.bid.bid_fare} BDT.`);
            }
        }
    })

});


function sendAjaxRequest(url, payload, method) {
    console.log('method is : ', method);
    return $.ajax({
        type: method, url: url, data: payload,
        success: function (result) {
            return result;
        }
    });
}

function fetchExistingBids() {
    let sendRequest = sendAjaxRequest( `http://localhost:8080/api/v1/ride/get-all-pending-requests`, {}, "GET"  )
    sendRequest.then((response) => {
        console.log('after then result is: ', response);
        if (response) {
            if(response.pending_requests){
                response.pending_requests.forEach(element => {
                    // console.log('check ', element)
                    appendNewBidDiv(element)
                });
            }
           
        }
    })
}



