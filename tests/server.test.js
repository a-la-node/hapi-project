const test = require('tape');
const server = require('../src/server.js')

test('Check the index route', t => {
  let options = {
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
  let options = {
    method: 'GET',
    url:'/'
  };
  server.inject(options, (response) =>{
  t.equal(response.statusCode, 200, 'You received a 200 status code');
  t.notEqual(response.payload.indexOf('<h1 class="title">'), -1, 'The h1 title was found in the index.html response');
  t.notEqual(response.payload.indexOf("<a class='content--options-item' href='results?type=spy'><li>Spy</li></a>"), -1, 'The handlebars Spy user was found in the index.html response');
  t.end();
  });
});
