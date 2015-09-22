(function () {
    'use strict';

    angular.module('whatToWatchApp').factory('tvshowsService', ['$http', '$q', tvshowsService]);

    function tvshowsService($http, $q) {
        
        var api_key = "?api_key=<your key>";

        function getTvShows() {
            var url = "http://api.themoviedb.org/3/tv/",
                mode = "popular",
                data = "";

        	var deferred = $q.defer();
        	$http.get(url + mode + api_key)
                    .success(function(data) {
                        console.log("Received data via HTTP");
                        
                        console.log(data);
                        
                        deferred.resolve(data);
                    })
                    .error(function() {
                        console.log("Error while making HTTP call.");
                        deferred.reject();
                    });

            return deferred.promise;
        }

        function getTvshowDetails(tvshowId) {
            var url = "http://api.themoviedb.org/3/tv/",
                mode = "",
                data = tvshowId;

            var deferred = $q.defer();
            $http.get(url + data + api_key)
                    .success(function(data) {
                        console.log("Specific tv show found: " + data.name);
                        deferred.resolve(data);
                    })
                    .error(function() {
                        console.log("Error while making HTTP call.");
                        deferred.reject();
                    });

            return deferred.promise;
        }

        return {
            getTvShows: getTvShows,
            getTvshowDetails: getTvshowDetails
        };
    };
})();