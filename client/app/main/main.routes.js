'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('main', {
      url: '/main',
      template: '<main></main>'
    });
}
