(function (angular) {
    "use strict";

    angular.module("emr.common.controllers.errorPage", [
        "emr.auth.services"
    ])

    .controller("emr.common.controllers.errorPage",
        ["$stateParams", "$scope", "emr.auth.services.homePage", "$state", "$log",
        function ($stateParams, $scope, homePageServ, $state, $log) {
            $scope.params = $stateParams;
            $log.debug("Error page");
            $scope.goHome = function () {
                var homePage = homePageServ.determineHomePage();
                $state.go(homePage);
            };
        }]);
})(angular);
