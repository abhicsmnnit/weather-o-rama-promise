module.exports.locationAPIUrl = 
    (encodedAddress) => 
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

module.exports.weatherAPIUrl = 
    (latitude, longitude) =>
    `https://api.darksky.net/forecast/97debb2c73ca9358cce13a0774b4e6bd/${latitude},${longitude}`