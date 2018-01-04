const axios = require('axios');

const userInput = require('./user-input-processor');
const url = require('./api-urls');

const address = userInput.address;
const encodedAddress = encodeURIComponent(address);

axios.get(url.locationAPIUrl(encodedAddress))
    .then((geocodeData) => {
        validateResponse(geocodeData);

        const latitude = geocodeData.data.results[0].geometry.location.lat;
        const longitude = geocodeData.data.results[0].geometry.location.lng;
        
        return axios.get(url.weatherAPIUrl(latitude, longitude));
    }).then((weatherData) => {
        const temperature = weatherData.data.currently.temperature;
        const apparentTemperature = weatherData.data.currently.apparentTemperature;

        console.log(`It is ${temperature}F currently.`);
        if (temperature !== apparentTemperature) {
            console.log(`But feels like ${apparentTemperature}F.`);
        }
    }).catch((error) => {
        if (error.code === 'ENOTFOUND') {
            console.log('Unable to connect to API Servers.');
        } else {
            console.log(error.message);
        }
    });

function validateResponse(geocodeData) {
    if (geocodeData.data.status === 'ZERO_RESULTS') {
        throw new Error('Address not found.');
    } else if (geocodeData.data.status === 'OVER_QUERY_LIMIT') {
        throw new Error('Limit reached for Google Maps API. Please try again.');
    } else if (geocodeData.data.results.length === 0) {
        throw new Error('Some error occurred while finding the address. Please try again.');
    }
}