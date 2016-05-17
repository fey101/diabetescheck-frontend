(function (angular) {
    "use strict";
    angular.module("dbcheck.planner.risktestcontroller", [])

    .controller("dbcheck.planner.risktest", [
        "$scope", "dbcheck.planner.formly.riskTest", "$state",
        "dbcheck.auth.services.login", "dbcheck.planner.dateOfBirthToAge",
        function ( $scope, formlyService, $state, loginSvc, ageConverter) {
            $scope.riskForm = {};
            $scope.fields = formlyService.getFields();
            $scope.user = loginSvc.getUser();
            var dateOfBirth = $scope.user.person.date_of_birth;
            $scope.age = ageConverter.getAge(dateOfBirth);

            $scope.analyse = function () {
                $scope.submitClicked = true;
                $state.go("journal");
            };
        }
    ]);
})(angular);
