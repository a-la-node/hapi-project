const request = require('request');
const people = require('./people');

function getNewName (cb) {
  request('https://randomuser.me/api/', (error, response, body) => {
    if (error) {
      return cb(error);
    }
    if (!error && response.statusCode === 200) {
      let name = JSON.parse(body).results[0].name;
      let firstName = capitalise(name.first);
      let lastName = capitalise(name.last);
      return cb(null, `${firstName} ${lastName}`);
    }
  });
}

function getNewPlace (type, cb) {
  const person = people[type];
  if (person === undefined) {
    return cb({
      success: false,
      reason: 'invalid person type'
    });
  }
  const url = `https://nomadlist.com/api/v2/filter/city?c=2&f1_target=safety_level&f1_type=${person.safety}&f2_target=long_term_cost_in_usd&f2_type=${person.budget}`;
  request(url, (error, response, body) => {
    if (error) {
      return cb(error);
    }
    if (!error && response.statusCode === 200) {
      const cities = JSON.parse(body).slugs;
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      return cb(null, randomCity.split('-').map(word => capitalise(word)).join(' '));
    }
  });
}

function capitalise(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function parallel(tasks,finalCallback) {
  let ind = 0, store = [];
  tasks.forEach((task, i) => {
    task((err, res) => {
      store[i] = res;
      ind++;
      if(tasks.length === ind) {
        finalCallback(undefined, store);
      }
    });
  });
}

function getIdentity(type, cb){
  parallel([
    getNewName,
    getNewPlace.bind(null, type)
  ], (err, result) => {
    cb(null,result);
  });
}

module.exports = {
  getIdentity: getIdentity,
  getNewName: getNewName,
  getNewPlace: getNewPlace,
  parallel: parallel
};
