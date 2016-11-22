'use strict';
const request = require('request');
const params = require('./params');

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
  let type = 'witness';
  let person = params[type];
  let url = `https://nomadlist.com/api/v2/filter/city?c=2&f1_target=safety_level&f1_type=${person.safety}&f2_target=long_term_cost_in_usd&f2_type=${person.budget}`;
  request(url, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      let cities = JSON.parse(body).slugs;
      let randomCity = Math.floor(Math.random() * cities.length);
      return cb(cities[randomCity]);
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
