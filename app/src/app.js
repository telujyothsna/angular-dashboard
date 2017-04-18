'use strict';

import * as d3 from 'd3';

window.d3 = d3;
// import _ from 'lodash';

import uiRouter from 'angular-ui-router';
import meterGauge from './angular-metergauge';
import scrollPos from './directives/scroll-pos/scroll-pos.directive';


import filters from './components/filters/filters.component';
import panel from './components/panel/panel.component';
import sidebar from './components/sidebar/sidebar.component';
import tableDisplay from './components/tableDisplay/table.component';
import timergauge from './components/timergauge/timergauge.component';
import topbar from './components/topbar/topbar.component';

import main from './pages/main/main.page';
import dashboard from './pages/dashboard/dashboard.page';

import {
  routeConfig
} from './app.config';


import './app.scss';
console.log(scrollPos);

angular.module('dashboard', [
    'ngTouch',
    uiRouter, meterGauge,
    'ui.bootstrap',

    scrollPos,


    filters,
    panel,
    sidebar,
    tableDisplay,
    timergauge,
    topbar,

    main,
    dashboard,
  ])
  .run(['$rootScope', function($rootScope) {
    $rootScope.bodyClass = [];
    console.log('Running app');
  }])
  .config(['$urlRouterProvider', '$locationProvider', routeConfig]);


angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['dashboard'], {
      strictDi: true
    });
  });