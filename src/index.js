'use strict';
const request = require('request');

function getNewIdentity (cb) {
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

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


module.exports = {
  getNewIdentity: getNewIdentity
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
