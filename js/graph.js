var doGraph = function(){
    var dataPoints = [];
    var deathDataPoints = [];
    var recoveredDataPoints = [];
    // empty main container and populate containers for graphs
    $('#content').empty();
    $('#content').append(
        '<div id="chartContainer" style="height: 300px; width:100%;"></div>'+
        '<div id="deathContainer" style= "height:300px; width:100%;"></div>'+
        '<div id="recoveredContainer" style="height:300px; width:100%;"></div>'
    );

    // API call to create canvasJS datapoints
    $.get('https://corona.lmao.ninja/v2/historical/usa',function(data){
        // infected 
        for(v in data.timeline.cases){
            dataPoints.push({
                y: parseInt(data.timeline.cases[v]),
                label:v
            });
        }
        // deaths
        for (v in data.timeline.deaths){
            deathDataPoints.push({
                y: parseInt(data.timeline.deaths[v]),
                label:v
            });
        }
        // recovered
        for(v in data.timeline.recovered){
            recoveredDataPoints.push({
                y:parseInt(data.timeline.recovered[v]),
                label:v
            });
        }
        // render charts
        chart.render();
        deathChart.render();
        recoveredChart.render();
    },'json');

    // canvasJS chart for Infected
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Coronavirus"
        },
        axisY: {
            title: "Infected"
        },
        data: [{
            type: "column",
            dataPoints : dataPoints
        }]
    });
    
    // canvasJS chart for Deaths
    var deathChart = new CanvasJS.Chart("deathContainer", {
        animationEnabled: true,
        theme: "light2",
        
        axisY: {
            title: "Deaths"
        },
        data: [{
            type: "column",
            dataPoints: deathDataPoints
        }]
    });
    
    // canvasJS chart for Recovered
    var recoveredChart = new CanvasJS.Chart("recoveredContainer", {
        animationEnabled: false,
        theme: "light2",
        
        axisY: {
            title: "Recovered"
        },
        data: [{
            type: "column",
            dataPoints: recoveredDataPoints
        }]
    });
};



    


