(function () {
    'use strict';

    angular.module('whatToWatchApp').factory('movieService', ['$http', '$q', 'dataService','CacheFactory', movieService]);

    function movieService($http, $q, dataService, CacheFactory) {
        var vm              = this;
        vm.movieListCache   = CacheFactory.get("movieListCache");

        function getMovies() {
            var url         = "http://api.themoviedb.org/3/movie/",
            mode            = "popular",
            data            = "",
            furl            = "",
            cacheKey        = "popularmovies",
            popularMovies   = vm.movieListCache.get(cacheKey);

            var api_key = "?api_key=";

            var deferred = $q.defer();

            if (popularMovies) {
                console.log("Popular Movie Cache being used");
                deferred.resolve(popularMovies);
            }
            else {
                console.log("Popular Movie Cache not used");
                dataService.getTheMovieDbKey()
                .then( function(key) {
                    var completeUrl = url + mode + (api_key+=key);
                
                    return completeUrl;
                })
                .then(function(completeUrl) {
                
                    return $http.get(completeUrl); 
                })
                .then( function(results) {
                    vm.movieListCache.put(cacheKey,results.data);

                    deferred.resolve(results.data);
                })
                .catch( function(data) {
                    deferred.reject(data);
                });
            }

            return deferred.promise;
        }

        function getMovieDetails(movieId) {
            var url = "http://api.themoviedb.org/3/movie/",
                mode = "",
                data = movieId;

            var api_key = "?api_key=";

            var deferred = $q.defer();

            dataService.getTheMovieDbKey()
            .then( function(key) {
                var completeUrl = url + mode + data + (api_key+=key);
                
                return completeUrl;
            })
            .then(function(completeUrl) {
                
                return $http.get(completeUrl); 
            })
            .then( function(results) {
                
                deferred.resolve(results.data);
            })
            .catch( function(data) {
                deferred.reject(data);
            });

            return deferred.promise;
        }

        return {
            getMovies: getMovies,
            getMovieDetails: getMovieDetails
        };
    };
})();