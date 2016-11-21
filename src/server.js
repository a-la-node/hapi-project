const Hapi = require('hapi');
const Inert = require('inert');
const Handlebars = require('handlebars');
const Vision = require('vision');

const server = new Hapi.Server();

let routes = {
  method: 'GET',
  path: '/{file*}',
  handler: {
    directory: {
      path: 'public'
    }
  }
}

server.register(Inert, ()=> {
  let port = process.env.port || 8000;
  server.connection({
    port,
    host: 'localhost'
  });
  server.route(routes);
  server.start(err=>{
    if (err) throw err;
    console.log('server running at: ' + port);
  });
});
