const test = require('tape');
const functions = require('../src/identity');

test("Check that getNewName doesn't create an error", t => {
  functions.getNewName((error, fullName) =>{
    t.equal(error, null, 'You did not create an error');
    t.end();
  })
});

test("Check that getNewPlace doesn't create an error", t => {
  functions.getNewPlace("spy",(error, city)=>{
    t.equal(error, null, 'You did not create an error');
    t.notEqual(city.length, 0, 'The city string is not empty')
    t.end();
  });
});

test("Check that getNewPlace creates an error when given an incorrect type", t => {
  functions.getNewPlace("incorrect_type",(error, city)=>{
    t.equal(error.success, false, "An error was successfully created");
    t.equal(error.reason, "invalid person type", "Error message received");
    t.end();
  });
});

test('Check that parallel retuns fullName and location', t => {
  const name = (callback) => {
    setTimeout(() => {
      callback(null, 'Corey Davies');
    },2000);
  };

  const location = (callback) => {
    setTimeout(() => {
      callback(null, 'Gujranwala Pakistan');
    },1000);
  };

  functions.parallel([name, location], (err, result) => {
    t.deepEqual(result, ['Corey Davies', 'Gujranwala Pakistan'], 'Returns fullName and location');
    t.end();
  });
});
