'use strict';

export class TopbarComponent {
  static $inject = ['$scope', '$rootScope'];

  constructor($scope, $rootScope) {
    const self = this;

    self.root = $rootScope;
    $scope.scrolled = false;
  }

  $onInit() {
    const self = this;

    self.root.bodyClass.push('has-topbar');
  }

  $onDestroy() {

  }
}

export default angular.module('dashboard.topbar', [])
  .component('topbar', {
    bindings: {
      items: '<'
    },
    template: require('./topbar.html'),
    controller: TopbarComponent,
    controllerAs: 'ctrl'
  })
  .name;