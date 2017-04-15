'use strict';

export class TimergaugeComponent {
  static $inject = ['$scope', '$element', '$transclude'];

  constructor($scope, $element, $transclude) {
    const self = this;
    self.scope = $scope;
    self.$element = $element;
    self.transclude = $transclude;
  }

  $onInit() {
    const self = this;
    const parent = self.$element[0].parentNode;

    if (parent.clientWidth < 230) {
      self.$element[0].querySelector('.timergauge').style.height = (parent.clientWidth - 30) + 'px';
      self.$element[0].querySelector('.timergauge').style.width = (parent.clientWidth - 30) + 'px';
    }

    self.scope.hp = self.transclude.isSlotFilled('hrs');
    self.scope.mp = self.transclude.isSlotFilled('mins');
    self.scope.sp = self.transclude.isSlotFilled('secs');
    self.scope.lp = self.transclude.isSlotFilled('tlabel');
  }
}

export default angular.module('dashboard.timergauge', [])
  .component('timerGauge', {
    controller: TimergaugeComponent,
    controllerAs: 'ctrl',
    template: require('./timergauge.html'),
    transclude: {
      hrs: '?hrs',
      mins: '?mins',
      secs: '?secs',
      tlabel: '?tlabel'
    }
  })
  .name;