(function (angular) {
    "use strict";

    angular.module("emr.auth.services.interceptors.connection", [])

    .factory("emr.networking.interceptors.connection",
        ["$q", "$rootScope", function($q, $rootScope) {
        var connection_down = false;

        return {
            "response": function(response) {
                if (connection_down) {
                    $rootScope.$broadcast("http.connection.resumed");
                    connection_down = false;
                }
                return response;
            },
            "responseError": function (rejection) {
                if (_.isEmpty(rejection.data) && rejection.status ===
                    0 && _.isEmpty(rejection.statusText)) {
                    if (!connection_down) { // broadcast only once
                        $rootScope.$broadcast("http.connection.fail");
                        connection_down = true;
                    }
                }
                return $q.reject(rejection);
            }
        };
    }]);
})(angular);
