'use strict';

export class PanelComponent {
  static $inject = ['$scope', '$transclude'];

  constructor($scope, $transclude) {
    const self = this;
    self.scope = $scope;
    self.transclude = $transclude;
  }

  $onInit() {
    const self = this;

    self.scope.footerPresent = self.transclude.isSlotFilled('footer');
    self.scope.bodyPresent = self.transclude.isSlotFilled('body');
    self.scope.titlePresent = self.transclude.isSlotFilled('title');
  }


}

export default angular.module('dashboard.panel', [])
  .component('panel', {
    transclude: {
      'title': '?panelTitle',
      'body': 'panelBody',
      'footer': '?panelFooter',
    },
    template: require('./panel.html'),
    controller: PanelComponent,
    controllerAs: 'ctrl'
  })
  .name;