'use strict';
const request = require('request');

function getNewName (cb) {
  request('https://randomuser.me/api/', (error, response, body) => {
    if (!error && response.statusCode === 200) {
      var name = JSON.parse(body).results[0].name;
      var firstName = capitalizeFirstLetter(name.first);
      var lastName = capitalizeFirstLetter(name.last);
      var fullName = `${firstName} ${lastName}`;
      return cb(fullName);
    }
  });
}

function getNewPlace (cb) {
  request('https://nomadlist.com/api/v2/list/cities', (error, response, body) => {
    if (!error && response.statusCode === 200) {
      //var city = JSON.parse(body).result[0].info.city.name;
      var safety = JSON.parse(body).result[0].scores.safety;
      var country = JSON.parse(body).result[0].info.country.name;
      var location = `${unsafest(JSON.parse(body).result)}`;
      //unsafest(JSON.parse(body).result)
      console.log(location);
      return cb(location);
    }
  });
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function unsafest(array){
  var dangerousCity = '';
  array.forEach(function(a){if (a.scores.safety < 0.22){
    dangerousCity += ' ' + a.info.city.name + ' in ' + a.info.country.name;
  }})
  dangerousCity.split(' ')
  var city = dangerousCity.split(' ')[Math.floor(Math.random() * 36) + 0 ];
  console.log(city);
  return city;
}

module.exports = {
  getNewName: getNewName,
  getNewPlace: getNewPlace
};
