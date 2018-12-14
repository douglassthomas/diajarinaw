$(function () {
    var search = window.location.search;
    var param = new URLSearchParams(search);

    if(param.has('fbID')){
        $('#fbid').val(param.get('fbID'))
    }


})