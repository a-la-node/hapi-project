const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const Handlebars = require('handlebars');
const getNewIdentity = require('./identity');
const people = require('./people');

let server = new Hapi.Server();

let port = process.env.PORT || 8000;
server.connection({
  port
});

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
      getNewIdentity.getIdentity(params.type, (error, result) => {
        reply.view('results-page', {
          name: result[0],
          place: result[1]
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
  server.route(routes);
  server.start(err=>{
    if (err) throw err;
    console.log('server running at: ' + port);
  });
});

module.exports = server;
