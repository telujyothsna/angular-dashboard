'use strict';

export class TableDisplayComponent {
  numItems;
  /*@ngInject*/
  constructor($scope, $element) {
    const self = this;
    self.headers = [];
    self.scope = $scope;
    self.element = $element;
  }

  $onInit() {
    const self = this;

    self.numItems = self.dispdata.length;
    self.getHeaders();
  }

  rowClicked(ind, item) {
    const self = this;
    const rows = self.element.querySelectorAll('tbody tr');
    rows.removeClass('active');
    rows[ind].classList.add('active');

    self.scope.$emit('table:rowclick', item);
  }

  getHeaders() {
    let i;
    const self = this;
    self.headers = [];

    if (self.cols) {
      self.headers = self.cols.split(':');
    } else {
      for (i = 0; i < self.numItems; i++) {
        for (let j in self.dispdata[i]) {
          if (self.headers.indexOf(j) == -1) {
            self.headers.push(j);
          }
        }
      }
    }
  }
}

TableDisplayComponent.$inject = ['$scope', '$element'];

export default angular.module('dashboard.tableDisplay', [])
  .component('tableDisplay', {
    bindings: {
      dispname: '@',
      dispdata: '<',
      onrowclick: '&',
      cols: '@'
    },
    template: require('./table.html'),
    controller: TableDisplayComponent,
    controllerAs: 'ctrl'
  })
  .name;