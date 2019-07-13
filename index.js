'use strict';

let parkName = "";
let parkCode = "";

function clearResultsAndForm() {

}

function displayWeatherInfo(responseJson) {
    //display NPS weather Info

    $(".js-results").append(
        `<section>
        <h3>How's the weather?</h3>
        <p>${responseJson.data[0].weatherInfo}</p>
        </section>`);
    
}

function displayParkInfo(responseJson) {
    //display park name & park descriptiion
    $(".js-results").html(
        `<section><h2>${parkName}</h2>
        <p>${responseJson.data[0].description}</p>
        </section>`);
    //responseJson returned so that displayWeatherInfo can use it
    return responseJson;
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
        .then(responseJson => displayWeatherInfo(responseJson))
        .catch (err => {
            $(".results").text(`Something went wrong: ${err.message}`);
        });
}

function watchForm() {
    //watch the search form
    $("form").submit (e => {
        e.preventDefault();
        
        //set the park name to new global variable
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