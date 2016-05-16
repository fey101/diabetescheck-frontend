(function (angular) {
    "use strict";
    angular.module("dbcheck.planner.risktestcontroller", [])

    .controller("dbcheck.planner.risktest", [
        "$scope", "dbcheck.planner.formly.riskTest", "$state",
        function ( $scope, formlyService, $state) {
            $scope.riskForm = {};
            $scope.fields = formlyService.getFields();

            $scope.analyse = function () {
                $scope.submitClicked = true;
                $state.go("journal");
            };
        }
    ]);
})(angular);
