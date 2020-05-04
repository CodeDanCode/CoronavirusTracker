var doSearch = function(){

    var positivePoints = [];
    var deathPoints = [];
    var recoveredPoints = [];

    $('#content').empty();
    // populates the dropdown menu with states
    $.get("https://covidtracking.com/api/v1/states/current.json", function (data){
        console.log(data);
        for(v in data){
            $('#inputGroupSelect').append(
                '<option value ="'+v+'">'+data[v].state + '</opiton>'
            );
        }
        
    });
    // creates content for search page
    $('#content').append(
        '<div class="row search-row">'+
        '<div class="col-12 mx-auto">'+
        '<div class = "input-group">'+
        // state dropdown menu
        '<select class = "custom-select" id = "inputGroupSelect">'+
        '<option selected> Select State</option></select>'+
        '<div class = "input-group-append">'+
        '<button class = "btn btn-outline-secondary"'+
        'type = "button" id= "sendStates" > Submit </button> '+
        '</div></div></div></div>'+
        // favorite checkbox
        '<div class="row container col-10 mx-auto">'+
        '<input type = "checkbox" class = "form-check-input" id = "SelectFavorite">' +
        '<label class="form-check-label" for="SelectFavorite"> Select Favorte </label>' +
        '</div>'+
        // list container
        '<div class="row">'+
        '<div class="container col-12 mx-auto results">'+
        '<ul class= "list covid-list" style="list-style-type:none;">' +
        '</ul></div></div>'+
        '<div id="stateContainer" style="height:300px; width:100%;"></div>'
    );
    
    // used for keyboard input
    $(".search-key").keypress(function (event) {
        var keycode = event.keyCode ? event.keyCode : event.which;
        if (keycode == "13") {
            findByName();
            // $(".search-key").blur();
        }
    });

    // checks if favorite is selected
    $('#sendStates').click(function(){
        findByName();
    });

    
    // search function 
    function findByName(){
        var searchName,webState;
        var favorite = $('#SelectFavorite').is(":checked");
        var value = $('#inputGroupSelect :selected').val();
        var localFavorite = parseInt(localStorage.getItem('favorite'));
        // custom json object request
        $.get('https://lamp.cse.fau.edu/~dleach2018/login/statecoords.php', function (data) {
            // remove title 
            $('.resultTitle').remove();
            if(favorite == true ){
                searchName = data[localFavorite].state;
                console.log(searchName);
                $('.results').prepend(
                    '<h4 class="col-md-8 mb-1 mx-auto resultTitle">'+ searchName + '</h4>'
                );
            }else if(value != "Select State"){
                searchName = data[value].state;
                console.log(searchName);
                $('.results').prepend(
                    '<h4 class="col-md-8 mb-1 mx-auto resultTitle">' + searchName + '</h4>'
                );
            }
            // resets map dropdown
            $('#inputGroupSelect')[0].selectedIndex = 0;     
        }, 'json');

        // API request for state stats
        $.get("https://covidtracking.com/api/v1/states/current.json",function(data){
            $('.covid-list').empty();
            if (favorite == true) {
                console.log(localFavorite);
                webState = data[localFavorite].state;
                $('.covid-list').append(
                    '<li class="resultList">' +
                    'Total Infected: ' + data[localFavorite].total +
                    '<br>Total Positive: ' + data[localFavorite].positive +
                    '<br>Total Deaths: ' + data[localFavorite].death +
                    '<br>Total Recovered: ' + data[localFavorite].recovered +
                    '<br><h8>Last Updated: ' + data[localFavorite].checkTimeEt + '</h8>' +
                    '</li>'
                );
                
            }else{
                console.log(value);
                if (value != "Select State") {
                    webState = data[value].state;
                    $('.covid-list').append(
                        '<li class="resultList" >' +
                        'Total Infected: ' + data[value].total +
                        '<br>Total Positive: ' + data[value].positive +
                        '<br>Total Deaths: ' + data[value].death +
                        '<br>Total Recovered: ' + data[value].recovered +
                        '<br><h8>Last Updated: ' + data[value].checkTimeEt + '</h8>' +
                        '</li>'
                    );
                }
            }            
        });
    };
};

    


