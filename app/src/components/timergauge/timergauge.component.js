'use strict';

export class TimergaugeComponent {
  static $inject = ['$scope', '$element', '$transclude'];

  constructor($scope, $element, $transclude) {
    const self = this;
    self.scope = $scope;
    self.$element = $element;
    self.transclude = $transclude;
  }

  calculateVals() {
    const self = this;
    var sec_num = parseInt(self.secs, 10) || 0; // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }

    self.scope.hrs = hours;
    self.scope.mins = minutes;
    self.scope.secs = seconds;
  }

  $onInit() {
    const self = this;
    const parent = self.$element[0].parentNode;

    if (parent.clientWidth < 230) {
      self.$element[0].querySelector('.timergauge').style.height = (parent.clientWidth - 30) + 'px';
      self.$element[0].querySelector('.timergauge').style.width = (parent.clientWidth - 30) + 'px';
    }

    if (self.secs != undefined) {
      self.calculateVals();
    } else {
      if (self.tlabel) {

        self.setValAndLabel();
      }
      // self.scope.hp = self.transclude.isSlotFilled('hrs');
      // self.scope.mp = self.transclude.isSlotFilled('mins');
      // self.scope.sp = self.transclude.isSlotFilled('secs');
      // self.scope.lp = self.transclude.isSlotFilled('tlabel');
    }
  }

  setValAndLabel() {
    const self = this;

    self.scope.val = self.val || "0";
  }

  $onChanges(changes) {
    const self = this;
    if (changes.secs && changes.secs.currentValue) {
      self.calculateVals();
    } else {
      if (self.tlabel) {
        self.setValAndLabel();
      }
      // self.scope.hp = self.transclude.isSlotFilled('hrs');
      // self.scope.mp = self.transclude.isSlotFilled('mins');
      // self.scope.sp = self.transclude.isSlotFilled('secs');
      // self.scope.lp = self.transclude.isSlotFilled('tlabel');
    }

  }
}

export default angular.module('dashboard.timergauge', [])
  .component('timerGauge', {
    controller: TimergaugeComponent,
    controllerAs: 'ctrl',
    template: require('./timergauge.html'),
    transclude: {
      // hrs: '?hrs',
      // mins: '?mins',
      // secs: '?secs',
      // tlabel: '?tlabel'
    },
    bindings: {
      secs: '<',
      tlabel: '@',
      val: '<'
    }
  })
  .name;