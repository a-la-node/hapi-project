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
      var name = JSON.parse(body).result[0].info.city.name;
      return cb(name);
    }
  });
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


module.exports = {
  getNewName: getNewName,
  getNewPlace: getNewPlace
};

// // API for working location
// var getNewLocation = new XMLHttpRequest();
//
// getNewLocation.onreadystatechange = () => {
//   if ( getNewLocation.readyState === 4 && getNewLocation.status === 200 ) {
//     document.getElementsByClassName('city')[0].innerHTML = JSON.parse(getNewLocation.response);
//   }
// };
//
// getNewIdentity.open('GET', 'https://nomadlist.com/api/v2/list/cities');
// getNewIdentity.send();
