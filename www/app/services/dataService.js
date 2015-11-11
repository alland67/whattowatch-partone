(function () {
    'use strict';

    angular.module('whatToWatchApp').factory('dataService', ['$q', '$window',dataService]);

    function dataService($q, $window) {
        
    	function getTheMovieDbKey() {
            var deferred = $q.defer();

            var keyValue = $window.localStorage['movieDbKey'];
            if (keyValue != null) {
                deferred.resolve(keyValue);
            }
            else {
                deferred.reject("Movie key not set.");
            }   

            return deferred.promise;
    	}

        function setTheMovieDbKey(val) {
            $window.localStorage['movieDbKey'] = val;
        }

    	return {
    		getTheMovieDbKey: getTheMovieDbKey,
            setTheMovieDbKey: setTheMovieDbKey
    	};
    };
})();