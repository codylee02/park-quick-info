'use strict';

const baseURL = `https://developer.nps.gov/api/v1/parks?`;

function clearResultsAndForm() {

}

function displayWeatherInfo() {
    //display 7 day forecast to user
}

function displayParkAlterts() {
  //if no alerts, say there are no active alerts for this park

}

function displaySearchedParkInfo() {
    //display
}

function getWeatherInfo(latLon) {
    //get 7 day forecast
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

}

function getParkInfoJson() {

    const params = {
        parkCode: "",
        api_key: npsAPI,
        limit: 5
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
        //.then(responseJson => displayWeatherInfo(responseJson))
        .catch (err => {
            $(".results").text(`Something went wrong: ${err.message}`);
        });
}

function watchForm() {
    //watch the search form
    $("form").submit (e => {
        e.preventDefault();
        
        parkName = $("js-park-name").val()
        clearResultsAndForm();
        getWeatherInfo();
        getParkInfoJson();

    });
}

$(watchForm);