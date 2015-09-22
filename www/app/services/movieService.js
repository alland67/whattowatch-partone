(function () {
    'use strict';

    angular.module('whatToWatchApp').factory('movieService', ['$http', '$q', movieService]);

    function movieService($http, $q) {
        
        var api_key = "?api_key=<your key>";

        function getMovies() {
            var url = "http://api.themoviedb.org/3/movie/",
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

        function getMovieDetails(movieId) {
            var url = "http://api.themoviedb.org/3/movie/",
                mode = "",
                data = movieId;

            var deferred = $q.defer();
            $http.get(url + data + api_key)
                    .success(function(data) {
                        console.log("Specific Movie found: " + data.original_title);
                        deferred.resolve(data);
                    })
                    .error(function() {
                        console.log("Error while making HTTP call.");
                        deferred.reject();
                    });

            return deferred.promise;
        }

        return {
            getMovies: getMovies,
            getMovieDetails: getMovieDetails
        };
    };
})();