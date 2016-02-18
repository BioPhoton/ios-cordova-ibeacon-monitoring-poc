;
(function () {
  'use strict';

  angular.module('iBeaconIonicPoc.routes', [
    'iBeaconIonicPoc.app.controller',
    'iBeaconIonicPoc.monitoring.controller',
    'iBeaconIonicPoc.ranging.controller'
  ])
  .config(configFunction);

  configFunction.$inject = ['$stateProvider', '$urlRouterProvider'];

  /** @ngInject */
  function configFunction($stateProvider, $urlRouterProvider) {

    //routing configurations
    $urlRouterProvider.otherwise('app/monitoring');
    //set states
    $stateProvider

      .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "app/app.view.html",
        controller: 'AppController as app'
      })

      .state('app.monitoring', {
        url: '/monitoring',
        views: {
          'menuContent': {
            templateUrl: 'app/components/monitoring/monitoring.view.html',
            controller: 'MonitoringController as monitoring'
          }
        }
      })

      .state('app.ranging', {
        url: '/ranging',
        views: {
          'menuContent': {
            templateUrl: 'app/components/ranging/ranging.view.html',
            controller: 'RangingController as ranging'
          }
        }
      })

    ;

  };



})();
