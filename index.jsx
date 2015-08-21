var React = require('react');
var Itinerator = require('./js/App');

var app = React.render(
  <Itinerator/>,
  document.getElementById('itinerator')
);

module.exports = app;