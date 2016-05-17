(function (angular) {
    "use strict";
    angular.module("dbcheck.planner.risktestcontroller", [])

    .controller("dbcheck.planner.risktest", [
        "$scope", "dbcheck.planner.formly.riskTest", "$state", "errorMessage",
        "dbcheck.auth.services.login", "dbcheck.planner.dateOfBirthToAge",
        function ( $scope, formlyService, $state, error_svc,
            loginSvc, ageConverter) {

            $scope.riskForm = {};
            $scope.fields = formlyService.getFields();
            var user = loginSvc.getUser();
            $scope.user = user;
            var dateOfBirth = user.person.date_of_birth;
            $scope.age = ageConverter.getAge(dateOfBirth);
            var calculate_waist_CircumPoints = function(waist) {
                if (user.person.gender_name === "Female") {
                    if (waist < 80) {
                        return 0;
                    }
                    else if (waist >= 80 && waist < 88) {
                        return 3;
                    }
                    else {
                        return 4;
                    }

                }
                if (user.person.gender_name === "Male") {
                    if (waist < 94) {
                        return 0;
                    }
                    else if (waist >= 94 && waist < 102) {
                        return 3;
                    }
                    else {
                        return 4;
                    }
                }
                else {
                    var data = {
                        "data": {
                            "error": "An error was encounter in fetching details." +
                                " Refresh the page and try again."
                        }
                    };
                    $scope.alert = error_svc.showError(data, "Error");
                }
            };
            var calculate_age_points = function() {
                var age = $scope.age.split(" ");
                var ageValue = parseInt(age[0], 10);
                if (ageValue < 35 || age[1] !== "years") {
                    return 0;
                }
                else if (ageValue >= 35 && ageValue <= 44) {
                    return 1;
                }
                else if (ageValue > 44 && ageValue <= 54) {
                    return 2;
                }
                else if (ageValue > 54 && ageValue <= 64) {
                    return 3;
                }
                else {
                    return 4;
                }
            };

            $scope.analyse = function () {
                if ($scope.riskForm.$valid) {
                    $scope.submitClicked = true;
                    var waist_circum = $scope.riskForm.model.waist_circumference;
                    var waist_CircumPoints = calculate_waist_CircumPoints(
                        waist_circum);
                    var age_points = calculate_age_points();
                    var points_array = [waist_CircumPoints, age_points,
                        $scope.riskForm.model.diabetic_relatives,
                        $scope.riskForm.model.fruits_intake,
                        $scope.riskForm.model.high_sugar
                    ];

                    var totalPoints = _.reduce(points_array,
                        function(memo, num) { return memo + num; }, 0);
                    console.log(totalPoints);
                    $state.go("journal");
                }
                else {
                    $scope.submitClicked = false;
                    var data = {
                        "data": {
                            "error": "Please correct the" +
                            " errors on the form"
                        }
                    };
                    console.log($scope.riskForm.$error);
                    $scope.alert = error_svc.showError(data, "Error");

                }
            };
        }
    ]);
})(angular);
