'use strict';

let parkName = "";
let parkCode = "";

function clearResultsAndForm() {

}

function displayWeatherInfo() {
    //display 7 day forecast to user
    
}

function displayParkInfo(responseJson) {
    console.log(responseJson)
    $(".js-results").html(
        `<section><h2>${parkName}</h2>
        <p>${responseJson.data[0].description}</p>
        </section>`
        //display park name, park descriptiion, recent alerts

        );
}

function getWeatherInfo(resonseJson) {
    //latLon from responseJson
    //const latLon = null;
    //get 7 day forecast
   
    
    displayWeatherInfo();
}

// function  getParkInfo(responseJson) {
//     //get the park info that the user searched for from NPS server
//     //search for the park name through the object. loop through and then pull the pertinent info from that object
//     const latLon = 0;//parks lat and lon
//     const params = {
//         parkCode: "",
//         api_key: npsAPI
//     }
//     console.log(getParkInfoRunning);
//     console.log(responseJson);
    
    
//     //getWeatherInfo(latLon);
// }

function makeQuery(params) {
    const queryItems = Object.keys(params).map(key => `${key}=${params[key]}`)
    return queryItems.join("&");
}

function displayParkAlerts() {
    //if no alerts, say there are no active alerts for this park
  
  }

function getParkAlertsJson() {
    
}

function getParkInfoJson() {

    parkCode = Object.keys(parksListObj).find(key => parksListObj[key] === parkName);
    const baseURL = `https://developer.nps.gov/api/v1/parks`;
    const params = {
        parkCode,
        api_key: npsAPI
    }

    const queryString = makeQuery(params)
    const url = baseURL + "?" + queryString;

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayParkInfo(responseJson))
        //.then(responseJson => getWeatherInfo(responseJson))
        .catch (err => {
            $(".results").text(`Something went wrong: ${err.message}`);
        });
}

function watchForm() {
    //watch the search form
    $("form").submit (e => {
        e.preventDefault();

        parkName = $("#js-park-name").val();
        
        clearResultsAndForm();
        getParkInfoJson();
        getParkAlertsJson();
    });
}

function makeParkList(parkNames) {
    // iterates through park list array and displays it in the DOM as a search form
    $("#js-park-list").append(parkNames.reduce((acc, m) => `${acc} <option value="${m}">`, ''));
}

$(watchForm);
makeParkList(parkNames);