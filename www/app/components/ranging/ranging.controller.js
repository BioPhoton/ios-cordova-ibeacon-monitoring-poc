;(function () {
  'use strict';

  angular
    .module('iBeaconIonicPoc.ranging.controller', [])
    .controller('RangingController', RangingController)

  RangingController.$inject = ['$scope', '$ionicPlatform'];
  function RangingController($scope, $ionicPlatform) {

    // jshint validthis: true
    var vm = this;
    vm.startRanging = startRanging;
    vm.stopRanging = stopRanging;

    ////////////////////////

    function startRanging() {
      $scope.app.createBeacon('1', 'E6C56DB5-DFFB-48D2-B088-40F5A81496EE', 2, 3)
        .then(function(beaconRegion) {
          cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion)
            .fail(console.error)
            .done();
      });

    }

    function stopRanging() {
      $scope.app.createBeacon('1', 'E6C56DB5-DFFB-48D2-B088-40F5A81496EE', 2, 3).then(function(beaconRegion) {
        cordova.plugins.locationManager.stopRangingBeaconsInRegion(beaconRegion)
          .fail(console.error)
          .done();
      });
    }

  };


})();
