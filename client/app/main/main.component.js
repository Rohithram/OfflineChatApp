'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './main.routes';
const io = require('socket.io').listen(server);



export class MainComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

// Loading socket.io



io.sockets.on('connection', function (socket, username) {

    // When the client connects, they are sent a message

    socket.emit('message', 'You are connected!');

    // The other clients are told that someone new has arrived

    socket.broadcast.emit('message', 'Another client has just connected!');


    // As soon as the username is received, it's stored as a session variable

    socket.on('little_newbie', function(username) {

        socket.username = username;

    });


    // When a "message" is received (click on the button), it's logged in the console

    socket.on('message', function (message) {

        // The username of the person who clicked is retrieved from the session variables

        console.log(socket.username + ' is speaking to me! They\'re saying: ' + message);

    }); 

});

export default angular.module('webopsChatApp.main', [uiRouter])
  .config(routes)
  .component('main', {
    template: require('./main.html'),
    controller: MainComponent,
    controllerAs: 'mainCtrl'
  })
  .name;
