(function () {
    'use strict';

    angular.module('whatToWatchApp').controller('MoviesCtrl', ['$state', 'movieService', MoviesCtrl]);

    function MoviesCtrl($state, movieService) {
        var vm = this;

        movieService.getMovies().then(function(data) {
        	console.log("Inside getMovies");

            vm.movies = data;
        });
    };
})();