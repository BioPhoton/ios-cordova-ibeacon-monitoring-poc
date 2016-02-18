;
(function () {
  'use strict';


  angular
    .module('iBeaconIonicPoc.app.controller', [])
    .controller('AppController', AppController);

  AppController.$inject = ['$ionicPlatform', '$q', '$timeout'];

  /** @ngInject */
  function AppController($ionicPlatform, $q, $timeout) {
    var delegate;

    // jshint validthis: true
    var vm = this;

    vm.monitoringLogs = [];
    vm.rangingLogs = [];
    vm.createBeacon = createBeacon;

    init();

    ///////////////////////


    function init() {
      $ionicPlatform.ready(function () {

        delegate = new cordova.plugins.locationManager.Delegate();

        //Monitoring callbacks
        delegate.didDetermineStateForRegion = function (pluginResult) {
          console.log('[DOM] didDetermineStateForRegion: ' + JSON.stringify(pluginResult));
          $timeout(function(){vm.monitoringLogs.push(pluginResult)});

          cordova.plugins.locationManager.appendToDeviceLog('[DOM] didDetermineStateForRegion: ' + JSON.stringify(pluginResult));
        };

        delegate.didStartMonitoringForRegion = function (pluginResult) {
          console.log('didStartMonitoringForRegion:', pluginResult);
          console.log('didStartMonitoringForRegion:' + JSON.stringify(pluginResult));
          vm.monitoringLogs.push(pluginResult);
        };

        delegate.didRangeBeaconsInRegion = function (pluginResult) {

          console.log('[DOM] didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult));
          $timeout(function(){vm.rangingLogs.push({'didRangeBeaconsInRegion': pluginResult.beacons})});

          for ( var i in pluginResult.beacons) {
            // Insert beacon into table of found beacons.
            var beacon = pluginResult.beacons[i];

            $timeout(function(){vm.rangingLogs.push(beacon)});

          }

        };

        //Ranging callbacks

        cordova.plugins.locationManager.setDelegate(delegate);

        // required in iOS 8+
        cordova.plugins.locationManager.requestWhenInUseAuthorization();
        // or cordova.plugins.locationManager.requestAlwaysAuthorization()
      });
    }

    /**
     * Function that creates a BeaconRegion data transfer object.
     *
     * @throws Error if the BeaconRegion parameters are not valid.
     */
    function createBeacon(identifier, uuid, major, minor) {
      var defer = $q.defer(),
          notifyEntryStateOnDisplay = true;

      $ionicPlatform.ready(function () {
        try{
          // throws an error if the parameters are not valid
          var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor);
          defer.resolve(beaconRegion);
        }
        catch(e) {
          defer.reject(e);
        }
      });

      return defer.promise;
    }


  };

})();
