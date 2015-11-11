(function () {
    'use strict';

    angular.module('whatToWatchApp').factory('tvshowsService', ['$http', '$q', 'dataService', 'CacheFactory', tvshowsService]);

    function tvshowsService($http, $q, dataService, CacheFactory) {
        var vm              = this;
        vm.tvshowListCache   = CacheFactory.get("tvshowListCache");

        function getTvShows() {
            var url             = "http://api.themoviedb.org/3/tv/",
                mode            = "popular",
                data            = "",
                cacheKey        = "populartvshows",
                populartvshows  = vm.tvshowListCache.get(cacheKey);

            var api_key = "?api_key=";

            var deferred = $q.defer();

            if (populartvshows) {
                console.log("Popular Tv Shows Cache being used");
                deferred.resolve(populartvshows);
            }
            else {
                dataService.getTheMovieDbKey()
                .then( function(key) {
                    var completeUrl = url + mode + (api_key+=key);
                
                    return completeUrl;
                })
                .then(function(completeUrl) {
                
                    return $http.get(completeUrl); 
                })
                .then( function(results) {
                    vm.tvshowListCache.put(cacheKey,results.data);

                    deferred.resolve(results.data);
                })
                .catch( function(data) {
                    deferred.reject(data);
                });
            }

            return deferred.promise;
        }

        function getTvshowDetails(tvshowId) {
            var url = "http://api.themoviedb.org/3/tv/",
                mode = "",
                data = tvshowId;

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
            getTvShows: getTvShows,
            getTvshowDetails: getTvshowDetails
        };
    };
})();