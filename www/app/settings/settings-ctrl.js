(function () {
    'use strict';

    angular.module('whatToWatchApp').controller('SettingsCtrl', ['$stateParams', 'dataService', SettingsCtrl]);

    function SettingsCtrl($stateParams, dataService) {
        var vm = this;

        dataService.getTheMovieDbKey().then(function(keyValue) {
        	vm.moviekey = keyValue;
        });
        
        vm.submit = function(moviekey) {
        	dataService.setTheMovieDbKey(moviekey);
        };	
    };
})();