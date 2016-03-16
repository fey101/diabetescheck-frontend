(function (angular) {
    "use strict";

    angular.module("dbcheck.common.controllers.errorPage", [
        "dbcheck.auth.services"
    ])

    .controller("dbcheck.common.controllers.errorPage",
        ["$stateParams", "$scope", "AVAILABLE_HOMEPAGES", "$state", "$log",
        function ($stateParams, $scope, homePageServ, $state, $log) {
            $scope.params = $stateParams;
            $log.debug("Error page");
            $scope.goHome = function () {
                var homePage = homePageServ[0];
                $state.go(homePage);
            };
        }]);
})(angular);
