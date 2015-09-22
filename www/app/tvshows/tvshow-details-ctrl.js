(function () {
    'use strict';

    angular.module('whatToWatchApp').controller('TvshowDetailsCtrl', ['$stateParams', 'tvshowsService', TvshowDetailsCtrl]);

    function TvshowDetailsCtrl($stateParams, tvshowsService) {
        var vm = this;

        var tvshowId = $stateParams.id;

        tvshowsService.getTvshowDetails(tvshowId).then(function(data) {
        	vm.tvshowDetails = data;
        });
    };
})();