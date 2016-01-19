angular.module('starter.services', [])

.factory('GoogleAPI', function($http, $q) {
    return {
        getToken: function(scope, rt, cID) {
            var deferred = $q.defer();
            $http.get("https://accounts.google.com/o/oauth2/v2/auth" + "?scope=" + encodeURIComponent(scope) + "&response_type=" + encodeURIComponent(rt) + "&client_id=" + encodeURIComponent(cID) + "&nonce=17").success(function(data) {
                deferred.resolve(data);
            });
            return deferred.promise;
        }
    }
})