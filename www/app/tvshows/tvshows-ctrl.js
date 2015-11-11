(function () {
    'use strict';

    angular.module('whatToWatchApp').controller('TvShowsCtrl', ['$scope', '$state', 'tvshowsService', 'errorDisplayService', TvShowsCtrl]);

    function TvShowsCtrl($scope, $state, tvshowsService, errorDisplayService) {
        var vm = this;

        tvshowsService.getTvShows().then(function(data) {
        	console.log("Inside getTVShows");

            vm.tvshows = data;
        },
        function(reason) {
          
  			errorDisplayService.showError(reason);
  		}
  		);

  		vm.doRefresh = function() {
          tvshowsService.getTvShows().then(function(data) {
          vm.tvshows = data;
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