document.addEventListener("DOMContentLoaded", function () {

    //Set event listeners/handlers for buttons 
    document.getElementById('news').onclick = doNews;
    document.getElementById('search').onclick = doSearch;
    document.getElementById('graph').onclick = doGraph;
    document.getElementById('map').onclick = doMap;
    document.getElementById('settings').onclick = doSettings;

    doNews();
});
