import uiRouter from 'angular-ui-router';
import routing from './dashboard.routes';

export class dashboardController {


  /*@ngInject*/
  constructor($http, $scope, $interval, $element) {
    const self = this;
    self.http = $http;
    self.scope = $scope;
    self.$element = $element;
    self.scope.ngval = 0;
    self.scope.macregex = '^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$';
    self.scope.formData = { "stattype": "individual", "stat_fields": { "oxs_dur": false, "oxs_pkt": false, "oxs_byt": false, "oxs_idl": false }, "matchflds": { "dl_src": { "selected": false }, "dl_dst": { "selected": false }, "in_port": { "selected": false }, "ip": { "selected": false }, "icmp": { "selected": false }, "tcp": { "selected": false }, "udp": { "selected": false } } };
    self.duration = {
      hrs: 0,
      mins: 0,
      secs: 0,
      nanosecs: 0,
      onlynano: false
    }
    self.scope.byte_gauge = {
      gaugeRadius: 100,
      minVal: 0,
      maxVal: 1000,
      needleVal: 0,
      tickSpaceMinVal: 10,
      tickSpaceMajVal: 100,
      gaugeUnits: "mbps",
      tickColMaj: '#656D78',
      tickColMin: '#656D78',
      outerEdgeCol: '#CCD1D9',
      pivotCol: '#434A54',
      innerCol: '#E6E9ED',
      unitsLabelCol: '#656D78',
      tickLabelCol: '#656D78',
      needleCol: '#434A54',
      defaultFonts: ''
    };

    self.scope.pkt_count_gauge = {
      gaugeRadius: 100,
      minVal: 0,
      maxVal: 1,
      needleVal: 0,
      tickSpaceMinVal: 0.05,
      tickSpaceMajVal: 0.25,
      gaugeUnits: "packets",
      tickColMaj: '#656D78',
      tickColMin: '#656D78',
      outerEdgeCol: '#CCD1D9',
      pivotCol: '#434A54',
      innerCol: '#E6E9ED',
      unitsLabelCol: '#656D78',
      tickLabelCol: '#656D78',
      needleCol: '#434A54',
      defaultFonts: ''
    };

    self.getTableData();

  }

  $onInit() {
    const self = this;
    const aside = self.$element[0].querySelector('.side-menu');

    aside.style.width = aside.parentNode.clientWidth + 'px';

    self.scope.$on('table:rowclick', (e, data) => {
      self.setActiveRow(data);
    });

    self.scope.$on('filterchanged', (e, data) => {
      console.log(data);
    })

    self.$element.addClass('dashboard');
    self.scope.duration = 0;
  }

  setActiveRow(data) {
    const self = this;
    // self.scope.ngval = data.avg_speed;
    console.log(parseFloat(data.n_bytes));
    self.scope.byte_gauge.needleVal = parseFloat(data.n_bytes);
    self.scope.pkt_count_gauge.needleVal = data.n_packets;
    self.scope.duration = parseFloat(data.duration);
    self.scope.idletime = data.idle_age;
  }


  getTableData() {
    const self = this;
    self.tableData = {
      data: [{ "duration": "417898.963s", "n_packets": "0.5", "priority": "0", "n_bytes": "100", idle_age: 3 }, { "duration": "20.1s", "n_packets": "0.78", "priority": "0", "n_bytes": "400", idle_age: "50" }]
    }
  }

  sendData() {
    const self = this;
    console.log(self.scope.formData);
  }


}

dashboardController.$inject = ['$http', '$scope', '$interval', '$element'];

export default angular.module('dashboard.dashboard', [uiRouter])
  .config(['$stateProvider', routing])
  .component('dashboard', {
    template: require('./dashboard.html'),
    controller: dashboardController,
    controllerAs: 'dashboardCtrl'
  })
  .name;