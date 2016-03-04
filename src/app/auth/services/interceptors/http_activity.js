(function (angular) {
    "use strict";

    angular.module("emr.auth.services.interceptors.httpactivity", [])

    .factory("emr.networking.interceptors.httpactivity",
        ["$q", "$rootScope", function ($q, $rootScope) {
        var active_http_actions = 0;
        return {
            "request" : function(config) {
                active_http_actions =
                    active_http_actions > 0 ? active_http_actions + 1 : 1;
                if (active_http_actions === 1) {
                    $rootScope.$broadcast("http.active");
                }
                return config;
            },
            "requestError": function(config) {
                active_http_actions =
                    active_http_actions > 0 ? active_http_actions - 1 : 0;
                if (active_http_actions === 0) {
                    $rootScope.$broadcast("http.inactive");
                }
                return config;
            },
            "response": function(response) {
                active_http_actions =
                    active_http_actions > 0 ? active_http_actions - 1 : 0;
                if (active_http_actions === 0) {
                    $rootScope.$broadcast("http.inactive");
                }
                return response;
            },
            "responseError": function(rejection) {
                active_http_actions =
                    active_http_actions > 0 ? active_http_actions - 1 : 0;
                if (active_http_actions === 0) {
                    $rootScope.$broadcast("http.inactive");
                }
                return $q.reject(rejection);
            }
        };
    }]);
})(angular);
