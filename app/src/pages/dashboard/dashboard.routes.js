'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('main.dashboard', {
    url: '',
    template: '<dashboard></dashboard>'
  });
}