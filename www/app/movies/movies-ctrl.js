(function () {
    'use strict';

    angular.module('whatToWatchApp').controller('MoviesCtrl', ['$scope','$state', 'errorDisplayService','movieService', MoviesCtrl]);

    function MoviesCtrl($scope, $state, errorDisplayService, movieService) {
        var vm = this;

        movieService.getMovies().then(function(data) {
          vm.movies = data;
        },
        function(reason) {
          
  			   errorDisplayService.showError(reason);
  		  }
  		  );

        vm.doRefresh = function() {
          movieService.getMovies().then(function(data) {
          vm.movies = data;
        },
        function(reason) {
          
           errorDisplayService.showError(reason);
        }
        )
        .finally(function() {
          // Stop the ion-refresher from spinning
          $scope.$broadcast('scroll.refreshComplete');
        });
        }
    };
})();