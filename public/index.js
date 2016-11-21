(function(){
  'use strict';
var getNewIdentity = new XMLHttpRequest();

getNewIdentity.onreadystatechange = () => {
  if ( getNewIdentity.readyState === 4 && getNewIdentity.status === 200 ) {
    document.getElementsByClassName('name')[0].innerHTML = JSON.parse(getNewIdentity.response).results[0].name.first + ' ' + JSON.parse(getNewIdentity.response).results[0].name.last;
  }
};

getNewIdentity.open('GET', 'https://randomuser.me/api/');
getNewIdentity.send();

}());
