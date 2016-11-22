
module.exports = function(person) {
  return `<a class='content--options-item' href='results?type=${person.type}'><li>${person.description}</li></a>`;
};