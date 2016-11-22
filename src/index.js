'use strict';
const request = require('request');
const params = require('./params');

function getNewName (cb) {
  request('https://randomuser.me/api/', (error, response, body) => {
    if (!error && response.statusCode === 200) {
      var name = JSON.parse(body).results[0].name;
      var firstName = capitalise(name.first);
      var lastName = capitalise(name.last);
      var fullName = `${firstName} ${lastName}`;
      return cb(fullName);
    }
  });
}

function getNewPlace (type, cb) {
  let person = params[type];
  let url = `https://nomadlist.com/api/v2/filter/city?c=2&f1_target=safety_level&f1_type=${person.safety}&f2_target=long_term_cost_in_usd&f2_type=${person.budget}`;
  request(url, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      let cities = JSON.parse(body).slugs;
      let randomCity = cities[Math.floor(Math.random() * cities.length)];
      return cb(randomCity.split('-').map(word => capitalise(word)).join(' '));
    }
  });
}

function capitalise(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

module.exports = {
  getNewName: getNewName,
  getNewPlace: getNewPlace
};
