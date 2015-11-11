angular.module('whatToWatchApp', ['ionic','angular-cache'])

.run(function($ionicPlatform, CacheFactory) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }

    CacheFactory("movieListCache", {storageMode: "localStorage", maxAge: 60*60*24*1000, deleteOnExpire: "aggressive"});
    CacheFactory("tvshowListCache", {storageMode: "localStorage", maxAge: 60*60*24*1000, deleteOnExpire: "aggressive"});
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "app/layout/tabs.html"
    })
  
    .state('tab.home', {
      url: '/home',
      views: {
        'tab-home': {
          templateUrl: 'app/home/home.html'
        }
      }
    })

    .state('tab.movies', {
      url: '/movies',
      views: {
        'tab-movies': {
          templateUrl: 'app/movies/movies.html'
        }
      }
    })

    .state('tab.tvshows', {
      url: '/tvshows',
      views: {
        'tab-tvshows': {
          templateUrl: 'app/tvshows/tvshows.html'
        }
      }
    })

    .state('tab.settings', {
      url: '/settings',
      views: {
        'tab-settings': {
          templateUrl: 'app/settings/settings.html'
        }
      }
    })

    .state('tab.movie-details', {
      url: '/movie/:id',
      views: {
        'tab-movies' : {
          templateUrl: 'app/movies/movie-details.html'
        }
      }
    })

    .state('tab.tvshow-details', {
      url: '/tvshow/:id',
      views: {
        'tab-tvshows' : {
          templateUrl: 'app/tvshows/tvshow-details.html'
        }
      }
    })

    $urlRouterProvider.otherwise('/tab/home');
  });
