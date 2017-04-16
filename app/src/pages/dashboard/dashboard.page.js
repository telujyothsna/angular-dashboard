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
    self.scope.avg_speed_gauge = {
      gaugeRadius: 100,
      minVal: 0,
      maxVal: 100,
      needleVal: 0,
      tickSpaceMinVal: 10,
      tickSpaceMajVal: 10,
      gaugeUnits: "Km/h",
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

    self.scope.top_speed_gauge = {
      gaugeRadius: 100,
      minVal: 0,
      maxVal: 100,
      needleVal: 0,
      tickSpaceMinVal: 10,
      tickSpaceMajVal: 10,
      gaugeUnits: "Km/h",
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
    // self.scope.avg_speed_gauge.needleVal = self.tableData.data[0].avg_speed;
    // self.scope.top_speed_gauge.needleVal = self.tableData.data[0].top_speed;
  }

  setActiveRow(data) {
    const self = this;
    self.scope.ngval = data.avg_speed;
    self.scope.avg_speed_gauge.needleVal = data.avg_speed;
    self.scope.top_speed_gauge.needleVal = data.top_speed;
  }


  getTableData() {
    const self = this;
    self.tableData = {
      data: [{ "duration": "417898.963s", "cookie": "0x0", "n_packets": "0", "priority": "0", "n_bytes": "0", "actions": "NORMAL", "table": "0" }]
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