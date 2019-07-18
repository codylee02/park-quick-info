'use strict';

const npsAPI = "t0uHYkBfFVivZk7jJARtfvHNFV0OGY8wGAmnrbfZ";
let parkName = "";
let parkCode = "";

function clearResultsAndForm() {
    $(".park-info").html("");
    $(".park-alerts").html("");
    $(".weather-info").html("");
    $("#js-park-name").val("");
    $(".park-pictures").html("");
    $(".park-title").html("");
}

function displayWeatherInfo(responseJson) {
    //display NPS weather Info
    $(".weather-info").append(
        `
        <h3>How's the weather?</h3>
        <p>${responseJson.data[0].weatherInfo}</p>
        `);
    return responseJson;
}

function displayParkInfo(responseJson) {
    //display park name & park descriptiion
    $(".park-info").append(
        `<p>${responseJson.data[0].description}</p>
        `);
    $(".park-title").append(`<h2>${parkName}</h2>`);
    return responseJson;
}

function makeQuery(params) {
    const queryItems = Object.keys(params).map(key => `${key}=${params[key]}`)
    return queryItems.join("&");
}

function displayParkAlerts(alertsJson) {
    //if no alerts, say there are no active alerts for this park
    if (alertsJson.total === "0") {
        $(".park-alerts").append(
            `
                <h3>Alerts:</h3>
                <p>There are no current alerts.</p>
            `);
    } else {
    let alertsString = "";
        //loop through the array to display alerts
        for (let i = 0; i < alertsJson.data.length; i++) {
            alertsString += `<h4>${alertsJson.data[i].title}</h4>
                <p>${alertsJson.data[i].description}</p>`
        }
        $(".park-alerts").append(`<h3>Alerts:</h3>${alertsString}`);
    };
  }

function getParkAlertsJson() {
    const params = {
        parkCode,
        api_key: npsAPI
    }
    const baseURL = `https://developer.nps.gov/api/v1/alerts`;
    const queryString = makeQuery(params)
    const url = baseURL + "?" + queryString;

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(alertsJson => displayParkAlerts(alertsJson))
        .catch (err => {
            $(".park-info").text(`Something went wrong: ${err.message}`);
        });
        
}

function makePictureString(responseJson) {
    let pictureString = "";
    for (let i = 0; i < responseJson.data[0].images.length; i++) {
        if (i >= 4) {
            break;
        } else {
            pictureString += `<img src="${responseJson.data[0].images[i].url}" alt="${responseJson.data[0].images[i].title}">`;
        };
    };
    return pictureString;
};

function displayParkPictures(responseJson) {
    //copuld later be better refactored with a loop... or .reduce 
    makePictureString(responseJson)
        
    $(".park-pictures").append(makePictureString(responseJson));
    return responseJson;

}

function getParkInfoJson() {

    
    const params = {
        parkCode,
        api_key: npsAPI,
        fields: 'images'
    }
    const baseURL = `https://developer.nps.gov/api/v1/parks`;
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
        .then(responseJson => displayParkPictures(responseJson))

        .catch (err => {
            $(".park-info").text(`Something went wrong: ${err.message}`);
        });
}

function watchForm() {
    //watch the search form
    $("form").submit (e => {
        e.preventDefault();

        //set the park name to new global variable
        //parkName = "Acadia National Park";
        parkName = $("#js-park-name").val();
        parkCode = Object.keys(parksListObj).find(key => parksListObj[key] === parkName);

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