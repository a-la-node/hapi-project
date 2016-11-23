const server = require('./server');

server.start ( err => {
  if (err) throw err;
  console.log(`server running on ${server.info.uri}`);
});
