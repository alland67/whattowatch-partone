(function () {
    'use strict';

    angular.module('whatToWatchApp').controller('MovieDetailsCtrl', ['$stateParams', 'movieService', MovieDetailsCtrl]);

    function MovieDetailsCtrl($stateParams, movieService) {
        var vm = this;

        var movieId = $stateParams.id;

        movieService.getMovieDetails(movieId).then(function(data) {
        	vm.movieDetails = data;
        });
    };
})();