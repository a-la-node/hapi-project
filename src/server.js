const Hapi = require('hapi');
const Inert = require('inert');
const Handlebars = require('handlebars');
const Vision = require('vision');

const server = new Hapi.Server();

let routes = [
  {
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      reply.view('index', {
        people: [
          {type: 'spy', description: 'Spy'},
          {type: 'criminal', description: 'Rehabilitating criminal'},
          {type: 'witness', description: 'Witness in need of protection'},
          {type: 'spouse', description: 'Spouse on the down-low'},
          {type: 'celeb', description: 'Z-list celebrity'},
          {type: 'exec', description: 'Business executive in search of a tax haven'}
        ]
      });
    }
  },
  {
    method: 'GET',
    path: '/{file*}',
    handler: {
      directory: {
        path: 'public'
      }
    }
  }
];

server.register(Vision, err => {

  server.views({
    engines: {
      html: Handlebars
    },
    relativeTo: __dirname + '/../',
    path: 'public',
    layoutPath: 'public/layout',
    layout: 'default'
  });
});

server.register(Inert, ()=> {
  let port = process.env.PORT || 8000;
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

Handlebars.registerHelper('link', person => {
  return `<a href='results?type=${person.type}'><li>${person.description}</li></a>`;
});

module.exports = server;
