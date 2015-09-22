(function () {
    'use strict';

    angular.module('whatToWatchApp').controller('TvShowsCtrl', ['$state', 'tvshowsService', TvShowsCtrl]);

    function TvShowsCtrl($state, tvshowsService) {
        var vm = this;

        tvshowsService.getTvShows().then(function(data) {
        	console.log("Inside getTVShows");

            vm.tvshows = data;
        });
    };
})();