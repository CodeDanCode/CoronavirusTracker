var doMap = function(){
    // empty Main container and Map elements
    $('#content').empty();
    let workspace = document.getElementById("content");
    // sets bootstrap class container
    workspace.setAttribute('class', 'container');
     // map placement container
    let div1 = document.createElement('div');
    div1.setAttribute('id', 'ShowMap');
    workspace.append(div1);
    // search container
    let div2 = document.createElement('div');
    div2.setAttribute('id', 'mapSearch');
    workspace.append(div2);
    // row container
    let div3 = document.createElement('div');
    div3.setAttribute('class', 'row');
    // row child container results
    let div4 = document.createElement('div');
    div4.classList.add('container', 'col-md-8', 'mx-auto','results');
    // child of results unordered list element
    let ul = document.createElement('ul');
    ul.classList.add('list', 'covid-list');
    div4.appendChild(ul);
    div3.appendChild(div4);
    workspace.appendChild(div3);
    
    // populate state selection
    $.get("https://covidtracking.com/api/v1/states/current.json", function (data) {
        for (v in data) {
            $('#inputGroupSelect').append(
                '<option value ="' + v + '">' + data[v].state + '</opiton>'
            );
        }
    });

    // Modal and Search button
    $("#mapSearch").append(
        '<div class="row mt-2 mx-auto" >'+
        '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">' +
        'Search </button></div>'+
        // modal container
        '<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
        '<div class="modal-dialog" role="document">' +
        '<div class="modal-content">' +
        // modal header container
        '<div class="modal-header">' +
        '<h5 class="modal-title" id="exampleModalLabel">Directions</h5>' +
        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
        '<span aria-hidden="true">&times;</span>' +
        "</button></div>"+
        // modal body
        '<div class="modal-body">' +
        "<p>Search location</p>" +
        // state dropdown menu
        '<div class = "input-group">' +
        '<select class = "custom-select" id = "inputGroupSelect">' +
        '<option selected> Select State</option></select>' +
        "</div>" +
        // modal footer
        '<div class="modal-footer">' +
        // checkbox in modal
        '<div class="col-md-4 mx-auto">' +
        '<input type = "checkbox" class = "form-check-input" id = "SelectFavorite">' +
        '<label class="form-check-label" for="SelectFavorite"> Select Favorte </label>' +
        '</div>' +
        // buttons for modal
        '<button type="button" class="btn btn-primary" id="showStates" data-dismiss="modal">Send</button>' +
        '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>' +
        "</div></div></div></div>"
    );

    // Send button event handler
    $('#showStates').click(function () {
        findByName();
    });
    // global variables
    var map, infoWindow, searchLat,searchLon,
        value,searchName,favorite,localFavorite,
        searchPos,flightPath,pos;
   
    // Search function
    function findByName() {    
        favorite = $('#SelectFavorite').is(":checked"); // boolean
        value = $('#inputGroupSelect :selected').val(); // int
        localFavorite = parseInt(window.localStorage.getItem('favorite')); // int
        // api call for state data
        $.get("https://covidtracking.com/api/v1/states/current.json", function (data) {  
            $('.covid-list').empty();
            if(favorite == true){
                $('.covid-list').append(
                    '<li class="resultList">' +
                    'Total Infected: ' + data[localFavorite].total +
                    '<br>Total Positive: ' + data[localFavorite].positive +
                    '<br>Total Deaths: ' + data[localFavorite].death +
                    '<br>Total Recovered: ' + data[localFavorite].recovered +
                    '<br><h8>Last Updated: ' + data[localFavorite].checkTimeEt + '</h8>' +
                    '</li>'
                );
            }else {
                console.log(data[value].state);
                 $('.covid-list').append(
                     '<li class="resultList">' +
                     'Total Infected: ' + data[value].total +
                     '<br>Total Positive: ' + data[value].positive +
                     '<br>Total Deaths: ' + data[value].death +
                     '<br>Total Recovered: ' + data[value].recovered +
                     '<br><h8>Last Updated: ' + data[value].checkTimeEt + '</h8>' +
                     '</li>'
                 );
            }
        });
        // calls 
        getVariables();
    };
    
    // map functions
    function initMap() {
        map = new google.maps.Map(document.getElementById("ShowMap"), {
            zoom: 6,
            styles: [{
                elementType: "geometry",
                stylers: [{
                    lightness: "-15"
                }]
            }]
        });
        // google map infowindow
        infoWindow = new google.maps.InfoWindow;
        // geolocation 
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                posMarker = new google.maps.Marker({
                    position: pos,
                    map: map
                });
                var GEOCODING = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + 
                    position.coords.latitude + '%2C' + position.coords.longitude + 
                    '&language=en&key=[YOUR API KEY HERE]';
                var searchAbbreviation;
                $.getJSON(GEOCODING).done(function (location) {
                    searchName = location.results[6].address_components[0].long_name;
                    searchAbbreviation = location.results[6].address_components[0].short_name;
                    console.log("this is abbreviation 1"+searchAbbreviation);
                    $('.results').prepend(
                        '<h4 class ="col-md-8 mb-1 mx-auto resultTitle">' + searchName + '</h4>'
                    );
                     $.get("https://covidtracking.com/api/v1/states/current.json", function (data) {
                         console.log("This is abbreviation 2" + searchAbbreviation);
                        for (v in data) {
                            if (data[v].state == searchAbbreviation) {
                                 console.log(data[v].state);
                                $('.covid-list').append(
                                    '<li class="resultList">' +
                                    'Total Infected: ' + data[v].total +
                                    '<br>Total Positive: ' + data[v].positive +
                                    '<br>Total Deaths: ' + data[v].death +
                                    '<br>Total Recovered: ' + data[v].recovered +
                                    '<br><h8>Last Updated: ' + data[v].checkTimeEt + '</h8>' +
                                    '</li>'
                                );
                            }
                        };
                         
                     }, 'json');
                });

                map.setCenter(pos);
            }, function () {
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }


        // initial map layover
        $.getJSON('states.json', function (json) {            
            flightPath = new google.maps.Polygon({
                path: json['Florida'].Coordinates,
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2,
                fillColor: json['Florida'].Color,
                fillOpacity: 0.35
            });
            flightPath.setMap(map);
        });
        
    }

    // geolocation error handler
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
        //  infoWindow.open(map);
    }

    // variable function 
    function getVariables(){
        favorite = $('#SelectFavorite').is(":checked"); // boolean
        value = $('#inputGroupSelect :selected').val(); // int
        localFavorite = parseInt(localStorage.getItem('favorite')); // int
        // call for state coordinates to show in map
        $.get('https://lamp.cse.fau.edu/~dleach2018/login/statecoords.php', function (data) {
            //  remove state title
            $('.resultTitle').remove();
            //  get coords for favorites and state name
            if (favorite == true) {
                searchLat = data[localFavorite].lat; // float
                searchLon = data[localFavorite].lon; // float
                searchName = data[localFavorite].state; // string
                $('.results').prepend(
                    '<h4 class ="col-md-8 mb-1 mx-auto resultTitle">' + searchName + '</h4>'
                );
            } else {
                // get coords for search and state name
                searchLat = data[value].lat; // float
                searchLon = data[value].lon; // float
                searchName = data[value].state; // string
                console.log("favorite was false: " + searchName);
                 
                $('.results').prepend(
                    '<h4 class="col-md-8 mb-1 mx-auto resultTitle" >' + searchName + '</h4>'
                );
            }
            // resets map dropdown
            $('#inputGroupSelect')[0].selectedIndex = 0;
            //  json call for state coord overlay
            $.getJSON('states.json', function (json) {
                flightPath.setMap(null);
                flightPath = new google.maps.Polygon({
                    path: json[searchName].Coordinates,
                    geodesic: true,
                    strokeColor: '#FF0000',
                    strokeOpacity: 1.0,
                    strokeWeight: 2,
                    fillColor: json[searchName].Color,
                    fillOpacity: 0.35
                });
                flightPath.setMap(map);
            });
            // change google map
            searchPos = {
                lat: searchLat,
                lng: searchLon
            };
            map.setCenter(searchPos);
        },'json');
    }
     // render first map
    initMap();

};
