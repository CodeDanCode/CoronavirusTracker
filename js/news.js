var doNews = function(){
    // empty container and create news elements
    $('#content').empty();
    $('#content').append(
        '<h2 class="col-md-8 mx-auto">Current News</h2>'+
        '<iframe name="newIframe"></iframe>'+    
        '<ul class = "list news-list" style="list-style-type:none;"></ul>'+
        '<footer><button class="btn btn-outline-secondary col-md-8 mx-auto" id="backButton">Back</button></footer'
    );
    // backbutton event handler
    $('#backButton').click(function(){
        doNews();
    });
    // News API call
    $.get('https://covidtracking.com/api/press', function(data){
        update_list(data);
    });

    // hide elements 
    $('iframe').hide();
    $('#backButton').hide();

    var url0,url1,url2,url3,url4;
    // populate news function
    function update_list(data){
    //clear list and set new links
        $('.list li').remove();
        url0 = data[0].url,
        url1 = data[1].url,
        url2 = data[2].url,
        url3 = data[3].url,
        url4 = data[4].url
    // create first 5 news links
        count = 0;
        while (count < 5) { 
            $('.news-list').append('<li><h5><a class= "newsAlert" id="newLink'+count+'" href="">' + data[count].title + '</a></h5>' +
                '<h8>' + data[count].publication + '</h8></li><br>');
            count += 1;
        }

    // news link event handlers
    // hide title,empty news list, show iframe and back button
        $('#newLink0').click(function (e) {
        e.preventDefault();
        $('h2').hide();
        $('iframe').attr('src',url0);
        $('iframe').show();
        $('.news-list').empty();
        $('#backButton').show();
        })
        $('#newLink1').click(function (e) {
            e.preventDefault();
            $('h2').hide();
            $('iframe').attr('src', url1);
            $('iframe').show();
            $('.news-list').empty();
            $('#backButton').show();
        })
        $('#newLink2').click(function (e) {
            e.preventDefault();
            $('h2').hide();
            $('iframe').attr('src', url2);
            $('iframe').show();
            $('.news-list').empty();
            $('#backButton').show();
        })
        $('#newLink3').click(function (e) {
            e.preventDefault();
            $('h2').hide();
            $('iframe').attr('src', url3);
            $('iframe').show();
            $('.news-list').empty();
            $('#backButton').show();
        })
        $('#newLink4').click(function (e) {
            e.preventDefault();
            $('h2').hide();
            $('iframe').attr('src', url4);
            $('iframe').show();
            $('.news-list').empty();
            $('#backButton').show();
        })
    }

   
};