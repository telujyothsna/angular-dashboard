import uiRouter from 'angular-ui-router';
import routing from './dashboard.routes';

export class dashboardController {
  static $inject = ['$http', '$scope', '$interval', '$element'];

  /*@ngInject*/
  constructor($http, $scope, $interval, $element) {
    const self = this;
    self.http = $http;
    self.scope = $scope;
    self.$element = $element;
    self.scope.ngval = 0;
    self.scope.macregex = '^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$';
    self.scope.formData = { "stattype": "individual", "stat_fields": { "oxs_dur": false, "oxs_pkt": false, "oxs_byt": false, "oxs_idl": false }, "matchflds": { "dl_src": { "selected": false }, "dl_dst": { "selected": false }, "in_port": { "selected": false }, "ip": { "selected": false }, "icmp": { "selected": false }, "tcp": { "selected": false }, "udp": { "selected": false } } };
    self.selectedFields = {
      duration: true,
      n_packets: true,
      n_bytes: true,
      idle_age: true
    };

    self.mandatoryCols = ['cookie', 'priority', 'match', 'actions'];
    self.colLabels = ['Cookie', 'Priority', 'Match', 'Actions'];
    self.duration = {
      hrs: 0,
      mins: 0,
      secs: 0,
      nanosecs: 0,
      onlynano: false
    }
    self.scope.pkt_count_gauge = {
      gaugeRadius: 100,
      minVal: 0,
      maxVal: 1000,
      needleVal: 0,
      tickSpaceMinVal: 10,
      tickSpaceMajVal: 250,
      gaugeUnits: "pkts",
      tickColMaj: '#F5F7FA',
      tickColMin: '#F5F7FA',
      outerEdgeCol: '#434A54',
      pivotCol: '#DA4453',
      innerCol: '#000',
      unitsLabelCol: '#E9573F',
      tickLabelCol: '#F5F7FA',
      needleCol: '#DA4453',
      roundVal: true,
      defaultFonts: ''
    };

    self.scope.byte_gauge = {
      gaugeRadius: 100,
      minVal: 0,
      maxVal: 1,
      needleVal: 0,
      tickSpaceMinVal: 0.05,
      tickSpaceMajVal: 0.25,
      gaugeUnits: "mbps",
      tickColMaj: '#F5F7FA',
      tickColMin: '#F5F7FA',
      outerEdgeCol: '#434A54',
      pivotCol: '#DA4453',
      innerCol: '#000',
      unitsLabelCol: '#E9573F',
      tickLabelCol: '#F5F7FA',
      needleCol: '#DA4453',

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


    // self.http({
    //   method: 'GET',
    //   url: 'http://someendpoint/'
    // }).then(response => {
    //   self.tableData = response.data;
    // });

    self.$element.addClass('dashboard');
    self.scope.duration = 0;
    self.getColsToDisplay();
  }

  getColsToDisplay() {
    const self = this;
    const selected = Object.keys(_.pickBy(self.selectedFields, value => value));
    self.dispCols = _.concat(self.mandatoryCols, selected);

    self.dispLabels = _.clone(self.colLabels);
    self.dispCols.map((item) => {
      let tmp;
      switch (item) {
        case 'duration':
          tmp = "Duration";
          break;

        case 'n_packets':
          tmp = "Packet Count";
          break;

        case 'n_bytes':
          tmp = 'Byte Count';
          break;
        case 'idle_age':
          tmp = 'Idle Age';
          break;
      }

      if (tmp) {
        self.dispLabels.push(tmp);
      }

      self.dispColsStr = self.dispCols.join(':');
      self.dispLabelsStr = self.dispLabels.join(':');
    });

  }

  toggleSelectedField(field) {
    const self = this;

    self.selectedFields[field] = !self.selectedFields[field];
    self.getColsToDisplay();
  }

  setActiveRow(data) {
    const self = this;

    self.scope.byte_gauge.needleVal = parseFloat(data.n_bytes) / 1000.0;
    self.scope.pkt_count_gauge.needleVal = data.n_packets;
    self.scope.duration = parseFloat(data.duration);
    self.scope.idletime = data.idle_age;
  }


  getTableData() {
    const self = this;
    self.tableData = {
      data: [{
        "cookie": "0x857d410000000000",
        "actions": "NORMAL",
        "duration": "417898.963s",
        "n_packets": "114",
        "priority": "0",
        "n_bytes": "100",
        idle_age: 3
      }, {
        "cookie": "0x8572310000000000",
        "actions": "NORMAL",
        "duration": "20.1s",
        "n_packets": "450",
        "priority": "0",
        "n_bytes": "400",
        idle_age: "50"
      }]
    }
  }

  sendData() {
    const self = this;
    console.log(self.scope.formData);
    console.log(JSON.stringify(self.scope.formData));
  }


}



export default angular.module('dashboard.dashboard', [uiRouter])
  .config(['$stateProvider', routing])
  .component('dashboard', {
    template: require('./dashboard.html'),
    controller: dashboardController,
    controllerAs: 'dashboardCtrl'
  })
  .name;