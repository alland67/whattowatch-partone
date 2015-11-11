(function () {
    'use strict';

    angular.module('whatToWatchApp').factory('errorDisplayService', ['$ionicPopup', errorDisplayService]);

    function errorDisplayService($ionicPopup) {
    	function showError(reason) {
            var msg = null;

            if (reason instanceof Object) {
                msg = reason.statusText;
            }
            else {
                msg = reason;
            }

    		var alertPopup = $ionicPopup.alert({
     			title: 'Service Error',
     			template: 'Service Error: ' + msg
   			});
   			alertPopup.then(function() {
     			console.log('Logging Error: ' + msg);
   			});
    	}

    	return {
    		showError: showError
    	}
    };
})();