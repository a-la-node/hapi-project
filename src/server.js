const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const Handlebars = require('handlebars');
const getNewIdentity = require('./index.js');
const people = require('./people');

var server = new Hapi.Server();

function buildPeopleDescriptions(listOfPeople) {
  return Object.keys(listOfPeople).map(person => {
    return {type: person, description: people[person].description};
  });
}

let routes = [
  {
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      reply.view('index', {people: buildPeopleDescriptions(people)});
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
      let params = request.query;
      getNewIdentity.getNewName(function(error, name){
        getNewIdentity.getNewPlace(params.type, function(error, place){
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
    helpersPath: 'public/helpers',
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

module.exports = server;
