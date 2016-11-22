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

test('Check the response content is received from the server', t => {
  var options = {
    method: 'GET',
    url:'/'
  };
  server.inject(options, (response) =>{
  t.equal(response.statusCode, 200, 'You received a 200 status code');
  t.notEqual(response.payload.indexOf('<h1> DISGUISED </h1>'), -1, 'The h1 title was found in the index.html response');
  t.notEqual(response.payload.indexOf("<a href='results?type=spy'><li>Spy</li></a>"), -1, 'The handlebars Spy user was found in the index.html response');
  t.end();
  });
});
