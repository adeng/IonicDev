angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, GoogleAPI) {
    GoogleAPI.getToken("https://www.googleapis.com/auth/spreadsheets", "token", "910699492833-ihjup1fi0oiv73eelvvfluej9cteakbk.apps.googleusercontent.com").then( function(val) {
        console.log(val);
    })
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
