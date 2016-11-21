(function(){
  'use strict';

// API for random identity generator
var getNewIdentity = new XMLHttpRequest();

getNewIdentity.onreadystatechange = () => {
  if ( getNewIdentity.readyState === 4 && getNewIdentity.status === 200 ) {
    document.getElementsByClassName('name')[0].innerHTML = JSON.parse(getNewIdentity.response).results[0].name.first + ' ' + JSON.parse(getNewIdentity.response).results[0].name.last;
  }
};

getNewIdentity.open('GET', 'https://randomuser.me/api/');
getNewIdentity.send();

// API for working location
var getNewLocation = new XMLHttpRequest();

getNewLocation.onreadystatechange = () => {
  if ( getNewLocation.readyState === 4 && getNewLocation.status === 200 ) {
    document.getElementsByClassName('city')[0].innerHTML = JSON.parse(getNewLocation.response);
  }
};

getNewIdentity.open('GET', 'https://nomadlist.com/api/v2/list/cities');
getNewIdentity.send();


}());
