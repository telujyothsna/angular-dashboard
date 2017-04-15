'use strict';

export class SidebarComponent {
  static $inject = ['$scope', '$rootScope'];

  constructor($scope, $rootScope) {
    const self = this;

    self.root = $rootScope;

  }

  $onInit() {
    const self = this;

    self.root.bodyClass.push('has-sidebar');
  }

  $onDestroy() {

  }
}

export default angular.module('dashboard.sidebar', [])
  .component('sidebar', {
    bindings: {
      items: '<'
    },
    template: require('./sidebar.html'),
    controller: SidebarComponent,
    controllerAs: 'ctrl'
  })
  .name;