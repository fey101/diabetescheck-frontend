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

            var calculate_bmi_points = function() {
                var bmi = user.person.person_health.bmi;
                if (bmi < 25) {
                    return 0;
                }
                else if (bmi >= 25 && bmi <= 30) {
                    return 1;
                }
                else {
                    return 3;
                }
            };

            var calculate_exercise_points = function() {
                var exer_level = user.person.person_health.daily_activity_level;
                if (exer_level === "high" || exer_level === "moderate") {
                    return 0;
                }

                else {
                    return 2;
                }
            };
            var calculate_related_conditions_pts = function() {
                if (user.person.person_health.related_conditions) {
                    return 2;
                }
                else {
                    return 0;
                }
            };
            var determine_risk_level = function(pts) {
                if (pts < 7) {
                    return "No increased risk for diabetes. Nevertheless it is" +
                        " important to ensure healthy nutrition and enough" +
                        " exercise.";
                }
                else if (pts >= 7 && pts <= 11) {
                    return "Minimal increased risk for diabetes. Take care about" +
                        " guidelines for a healthy lifestyle.";
                }
                else if (pts > 11 && pts <= 14) {
                    return "Moderate increased risk for diabetes. Follow the" +
                        " guidelines for a healthy lifestyle and contact your" +
                        " physician for further questions.";
                }
                else if (pts > 14 && pts <= 20) {
                    return "Clearly increased risk for diabetes. Follow the" +
                        " guidelines for a healthy lifestyle and contact" +
                        " immediately your physician for medical advice.";
                }
                else if (pts > 20) {
                    return "Highly increased risk for diabetes – maybe you" +
                        " have already developed diabetes. Contact immediately" +
                        " your physician.";
                }
            };

            $scope.analyse = function () {
                if ($scope.riskForm.$valid) {
                    $scope.submitClicked = true;
                    var waist_circum = $scope.riskForm.model.waist_circumference;
                    var waist_CircumPoints = calculate_waist_CircumPoints(
                        waist_circum);
                    var age_points = calculate_age_points();
                    var bmi_points = calculate_bmi_points();
                    var exer_points = calculate_exercise_points();
                    var rel_conditions_pts = calculate_related_conditions_pts();
                    var points_array = [waist_CircumPoints, age_points,
                        $scope.riskForm.model.diabetic_relatives,
                        $scope.riskForm.model.fruits_intake,
                        $scope.riskForm.model.high_sugar, bmi_points,
                        exer_points, rel_conditions_pts
                    ];

                    var totalPoints = _.reduce(points_array,
                        function(memo, num) { return memo + num; }, 0);
                    var results = determine_risk_level(totalPoints);
                    console.log(results);
                    console.log("points:" + totalPoints);
                    var message = results;
                    var title = totalPoints + " points";
                    $scope.success = {
                        msg:message,
                        title: title
                    };
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
