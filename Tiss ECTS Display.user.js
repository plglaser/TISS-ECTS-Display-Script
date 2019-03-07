// ==UserScript==
// @name         Tiss ECTS Display
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  basic script to display ECTS at the top right corner
// @author       Philipp-Lorenz Glaser
// @match        https://tiss.tuwien.ac.at/education/favorites.*
// @grant        none
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

(function() {
    'use strict';
    var $ = window.jQuery;

    var $certs1 = $("tr.ui-widget-content.ui-datatable-even > td.favoritesCert").has("span");
    var $certs2 = $("tr.ui-widget-content.ui-datatable-odd > td.favoritesCert").has("span");

    var $rows = [];
    
    for(var i = 0; i < $certs1.length; i++){
        ($rows).push($certs1.get(i).parentNode);
    }

    for(var j = 0; j < $certs2.length; j++){
        ($rows).push($certs2.get(j).parentNode);
    }

    var ECTS = 0;

    for(var k = 0; k < $rows.length; k++){
        var pointA = $($rows[k]).find("td.favoritesECTS").text();
        ECTS += Number(pointA);
    }

    var $tabs = $("td.ui-state-default.favoritesECTS");
    var tabcount = $tabs.length;

    var addedECTS = 0;
    for(var m = 0; m < tabcount-1; m++){
       addedECTS += Number($($tabs.get(m)).text());
    }

    if (ECTS>0){
        $("h1").append('<div class="ects"><div>');
        $("div.ects").css("display", "inline-block");
        $("div.ects").css("float", "right");
        $("div.ects").text("ECTS: "+ ECTS + " / " + addedECTS);
    }

})();
