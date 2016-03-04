(function (angular) {
    "use strict";

    angular.module("dbcheck.auth.authBase", [])
    .controller("dbcheck.auth.controllers.authBase", ["$scope", "$state",
        function ($scope, $state) {
            $scope.year = new Date().getFullYear();
            $scope.params = $state.params;
        }
    ]);
})(angular);
