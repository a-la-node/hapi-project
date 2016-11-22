const test = require('tape');
const server = require('../src/server.js')

test('Check the index route', t => {
  var options = {
    method: 'GET',
    url:'/'
  };
  server.inject(options, (response)=>{
    t.equal(response.statusCode, 200, 'You received a 200 status code, test passed');
    server.stop();
    t.end();
  });
});
