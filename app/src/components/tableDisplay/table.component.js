'use strict';

export class TableDisplayComponent {
  numItems;
  /*@ngInject*/
  constructor($scope, $element) {
    const self = this;
    self.headers = [];
    self.dispkeys = [];
    self.scope = $scope;
    self.element = $element;
  }

  $onInit() {
    const self = this;

    self.numItems = self.dispdata.length;
    self.getHeaders();

    self.scope.$watch('cols', function(newValue, oldValue) {

      if (newValue !== oldValue) {
        self.scope.$apply();
      }
    });
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
    if (self.colLabels) {
      self.headers = self.colLabels.split(':');
      self.dispkeys = self.cols.split(':');
    } else if (self.cols) {
      self.headers = self.cols.split(':');
      self.dispkeys = self.headers;
    } else {
      for (i = 0; i < self.numItems; i++) {
        for (let j in self.dispdata[i]) {
          if (self.headers.indexOf(j) == -1) {
            self.headers.push(j);
          }
        }
      }
      self.dispkeys = self.headers;
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
      cols: '<',
      colLabels: '<'
    },
    template: require('./table.html'),
    controller: TableDisplayComponent,
    controllerAs: 'ctrl'
  })
  .name;