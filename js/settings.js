var doSettings = function(){
    $('#content').empty();

    $.get("https://covidtracking.com/api/states", function (data) {
        for (v in data) {
            $('#FavoriteSelect').append(
                '<option value ="' + v + '">' + data[v].state + '</opiton>'
            );
        }

    });

    $('#content').append(
        '<h1>Welcome '+localStorage.getItem('firstname')+'</h1>'+

        '<div class="row search-row">' +
        '<div class="col-12 mx-auto">' +
        '<h3>Set Favorite Location</h3>'+
        '<div class = "input-group">' +
        '<select class = "custom-select" id = "FavoriteSelect">' +
        '<option selected> Select State</option></select>' +
        '<div class = "input-group-append">' +
        '<button class = "btn btn-outline-secondary"' +
        'type = "button" id= "saveFavorite" > Save </button> ' +
        '</div></div></div>'+
        '<div class="col-12 mx-auto">'+
        '<h3>Delete Profile</h3>'+
        '<button class = "btn btn-primary" type="button" id="deleteProfile">Delete</button>'+
        '</div></div>'
    );
    var value, searchLat, searchLon;
    $('#saveFavorite').click(function () {
        value = $('#FavoriteSelect :selected').val();
        $.get('https://lamp.cse.fau.edu/~dleach2018/login/statecoords.php', function (data) {
            searchLat = data[value].lat;
            searchLon = data[value].lon;
            console.log('local storage Lat :' + searchLat);
            if (value != "Select State") {
                window.localStorage.setItem('favorite', value);
                window.localStorage.setItem('lat', searchLat);
                window.localStorage.setItem('lon', searchLon);
            }
        },'json');        
    });
    $('#deleteProfile').click(function(){
        window.localStorage.clear();
        window.location.replace('index.html');
    });
};  