angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('DonoCtrl', function($scope, $stateParams, $http, BaseURL) {

  $scope.dono = {};

  if ($scope.loginData.username) {
    $http.get(BaseURL + '/dono/' + $scope.loginData.username)
      .then(
        function(response) {
          if (response.data) {
            var dono = response.data;
            dono.persisted = true;
            if (dono.dtNascimento) {
              dono.dtNascimento = new Date(dono.dtNascimento);
            }
            $scope.dono = dono;
          }
          console.log(response.data);
        }, 
        function(error) {
          console.log(error);
        })
      ;
  }

  $scope.save = function() {
    $http.post(BaseURL + '/dono/save', $scope.dono)
      .then(function(response) {
        console.log(response.data);
      }, function(error) {
        console.log(error);
      });
    }
})

.controller('AnimalCtrl', function($scope, $stateParams) {
})

.controller('GreetingCtrl', function($scope, $http) {
    $scope.greeting = {};

    $http.get('http://localhost:8080/vet-service-spring/greeting')
      .then(function(response) {
        $scope.greeting = response.data;
      }, function(error) {
        console.log(error);
      });

    $scope.updateGreeting = function() {
      $http.post('http://localhost:8080/vet-service-spring/updateGreeting', $scope.greeting)
        .then(function(response) {
          console.log(response.data)
        }, function(error) {
          console.log(error);
        });
    }

})
;
