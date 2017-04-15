'use strict';

export class FilterComponent {
  static $inject = ['$scope'];
  constructor($scope) {
    const self = this;
    self.scope = $scope;
  }

  applyFilter() {
    const self = this;
    self.scope.$emit('filterchanged', self.items);
  }

  toggleItem(index) {
    const self = this;
    self.items[index].state = !self.items[index].state;
  }
}

export default angular.module('dashboard.filters', [])
  .component('filters', {
    bindings: {
      items: '<'
    },
    template: require('./filters.html'),
    controller: FilterComponent,
    controllerAs: 'ctrl'
  })
  .name;