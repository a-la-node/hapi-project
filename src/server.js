var Hapi = require('hapi');
var Inert = require('inert');
var Handlebars = require('handlebars');
var Vision = require('vision');
var getNewIdentity = require('./index.js');

var server = new Hapi.Server();

var routes = [
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
  },
  {
    method: 'GET',
    path: '/results',
    handler: (request, reply) => {
      var params = request.query;
      getNewIdentity.getNewName(function(name){
        getNewIdentity.getNewPlace(params.type, function(place){
          reply.view('results-page', {
            name: name,
            place: place
          });
        });
      });
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
  var port = process.env.PORT || 8000;
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
  return `<a class='content--options-item' href='results?type=${person.type}'><li>${person.description}</li></a>`;
});

module.exports = server;
