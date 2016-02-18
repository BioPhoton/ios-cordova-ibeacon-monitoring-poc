;(function () {
  'use strict';

  angular
    .module('iBeaconIonicPoc.monitoring.controller', [])
    .controller('MonitoringController', MonitoringController)

  MonitoringController.$inject = ['$scope', '$ionicPlatform'];
  function MonitoringController($scope, $ionicPlatform) {

    // jshint validthis: true
    var vm = this;
    vm.startMonitoring = startMonitoring;
    vm.stopMonitoring = stopMonitoring;

    ////////////////////////

    function startMonitoring() {
      $scope.app.createBeacon('1', 'E6C56DB5-DFFB-48D2-B088-40F5A81496EE', 2, 3)
        .then(function(beaconRegion) {
          cordova.plugins.locationManager.startMonitoringForRegion(beaconRegion)
            .fail(console.error)
            .done();
      });
    }

    function stopMonitoring() {
      $scope.app.createBeacon('1', 'E6C56DB5-DFFB-48D2-B088-40F5A81496EE', 2, 3).then(function(beaconRegion) {
        cordova.plugins.locationManager.stopMonitoringForRegion(beaconRegion)
          .fail(console.error)
          .done();
      });
    }

  };


})();
