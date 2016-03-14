(function (angular) {
    "use strict";
    angular.module("dbcheck.journal.controllers", [])

    .controller("dbcheck.journal.controllers.blood_glucose",[
        "$scope", "$state", "errorMessage", "dbcheck.journal.formly.log_glucose",
        function ( $scope, $state, alert, formlyService) {
            $scope.glucoseLogForm = {};
            $scope.fields = formlyService.getFields();

            $scope.logBloodGlucose = function () {
                if ($scope.glucoseLogForm.$valid) {
                    $scope.alert = false;
                    $scope.submitClicked = true;
                }
                else {
                    var data = {
                        "data": {
                            "error": "Please correct the" +
                            " errors on the form"
                        }
                    };
                    $scope.submitClicked = false;
                    $scope.alert = alert.showError(data, "Error");
                }
            };
            //Accordion controls
            $scope.groups = [
                {
                    title: "Why do I need to take blood glucose readings?",
                    content: "Regular monitoring of blood glucose provides" +
                    "a good overview about metabolic condition."
                },
                {
                    title: "How do I know when it's appropriate to take the" +
                    "readings?",
                    content: "In special situations the blood sugar should be" +
                    " tested more frequently, e.g. when you suspect hyperglycemia" +
                    " or even ketoacidosis, illnesses with fever, nausea or" +
                    " diarrhoea, intake of new medication or strong interferences" +
                    " of the daily life (night shift, holidays abroad with time" +
                    " delay)."
                },
                {
                    title: "How often do I need to take the readings?",
                    content: "The frequency of measuring depends on the kind of" +
                    " therapy. However, If you perform Intensified Insulin Therapy" +
                    " or you wear an insulin pump the frequency of blood sugar" +
                    " testing should be minimum 6 times a day."
                }
            ];

        }
    ]);

})(angular);
