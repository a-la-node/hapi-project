const test = require('tape');
const functions = require('../src/index.js')

test("Check that getNewName doesn't create an error", t => {
  functions.getNewName((error, fullName) =>{
    t.equal(error, null, 'You did not create an error');
    t.end();
  })
})

test("Check that getNewPlace doesn't create an error", t => {
  functions.getNewPlace("spy",(error, city)=>{
    t.equal(error, null, 'You did not create an error');
    t.notEqual(city.length, 0, 'The city string is not empty')
    t.end();
  });
})
