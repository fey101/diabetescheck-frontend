(function (angular) {
    "use strict";
    angular.module("dbcheck.journal.controllers", [])

    .controller("dbcheck.journal.controllers.blood_glucose",[
        "$scope", "$state", "dbcheck.journal.formly.log_glucose",
        "dbcheck.journal.service", "dbcheck.resource.linkJournalThings",
        "dbcheck.common.service.js_data_alerts", "errorMessage",
        function ( $scope, $state, formlyService,
            journalSvc, linkResource, alert, error_svc) {

            $scope.glucoseLogForm = {};
            $scope.fields = formlyService.getFields();

            $scope.logBloodGlucose = function () {
                if ($scope.glucoseLogForm.$valid) {
                    $scope.alert = false;
                    $scope.submitClicked = true;
                    var sugarLevel = $scope.glucoseLogForm.model.glycemic_index;
                    var period = $scope.glucoseLogForm.model.period_taken;

                    var params = journalSvc.findParams(period, sugarLevel);
                    linkResource.sugarDetails.findAll(
                        params, {bypassCache:true}).then(function(data) {
                            $scope.results = data[0];
                            var object = {
                                sugarLevel: sugarLevel,
                                period: period,
                                details: $scope.results.id
                            };
                            //save log
                            linkResource.sugarLog.create(object).then(
                                function() {
                                    var message = "Sugar level logged successfully";
                                    $scope.success = {
                                        msg:message,
                                        title: "OK"
                                    };
                                },
                                function(error) {
                                    $scope.alert = error_svc.showError(
                                        error, "Error");
                                    $scope.submitClicked = false;
                                }
                            );
                        }, function(error) {
                            $scope.alert = error_svc.showError(error, "Error");
                        }
                        );
                }
                else {
                    var data = {
                        "data": {
                            "error": "Please correct the" +
                            " errors on the form"
                        }
                    };
                    $scope.submitClicked = false;
                    $scope.alert = error_svc.showError(data, "Error");
                }
            };
            //Accordion controls
            $scope.groups = [
                {
                    title: "Why do I need to take blood glucose readings?",
                    content: "Regular monitoring of blood glucose provides" +
                    " a good overview about metabolic condition.  Measuring" +
                    " your blood sugar provides important feedback on how" +
                    " high your sugar went based on what you ate and your level" +
                    " of activity."
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
    ])
    .controller("dbcheck.journal.controllers.fitness_log",[
        "$scope", "$state", "errorMessage", "dbcheck.journal.formly.fitness_log",
        "dbcheck.resource.linkJournalThings",
        function ( $scope, $state, error_svc, formlyService, linkResource) {
            $scope.fitnessLogForm = {};
            $scope.fields = formlyService.getFields();

            $scope.logActivity = function () {
                if ($scope.fitnessLogForm.$valid) {
                    $scope.alert = false;
                    $scope.submitClicked = true;
                    linkResource.exerciseLog.create(
                        $scope.fitnessLogForm.model).then(
                            function(data) {
                                var message = "Activity logged successfully";
                                $scope.success = {
                                        msg:message,
                                        title: "OK"
                                    };
                                $scope.calories_burnt = data.total_calories_burnt;
                                var conversion_rate = 7709;
                                $scope.bw_equivalent = (
                                    $scope.calories_burnt / conversion_rate);
                            },
                            function(error) {
                                $scope.alert = error_svc.showError(error, "Error");
                                $scope.submitClicked = false;
                            }
                        );
                }
                else {
                    var data = {
                        "data": {
                            "error": "Please correct the" +
                            " errors on the form"
                        }
                    };
                    $scope.submitClicked = false;
                    $scope.alert = error_svc.showError(data, "Error");
                }
            };
            $scope.groups = [
                {
                    title: "Importance of exercise",
                    content: "The benefits of exercising include: Lower blood" +
                    " pressure, better control of weight, increased level of good" +
                    " cholesterol (HDL) leaner and stronger muscles, stronger" +
                    " bones, more energy, improved mood, better sleep, and it's" +
                    " also a form of stress management."
                },
                {
                    title: "Importance of exercise to persons with diabetes",
                    content:"Exercise has so many benefits, but the biggest one" +
                    " is that it makes it easier to control your blood glucose/" +
                    "sugar) level. it doesn’t matter if you’re insulin resistant" +
                    " or if you don’t have enough insulin: when you exercise," +
                    " your muscles get the glucose they need, and in turn, your" +
                    " blood glucose level goes down.\n" +

                    "Remember to stay hydrated by drinking water and always have a" +
                    " treatment for low blood glucose handy (a 15 g carb snack is" +
                    " a good idea). It is smart to check your blood sugar with" +
                    " your glucose meter before and after exercise to make sure" +
                    " you are in a safe range."
                },
                {
                    title: "How to come up with an exercise plan",
                    content: "you need to set realistic goals. If you haven’t" +
                    " exercised much recently, you will want to start slow and" +
                    " gradually increase the amount and intensity of the activity." +
                    " You also need to find a way to exercise that you actually" +
                    " enjoy—because if it’s not fun, you won’t do it" +
                    ". There are three main kinds of exercise—aerobic," +
                    " strength training, and flexibility work. You should aim" +
                    " to to have a good balance of all three but importantly" +
                    " get at least 30 minutes of aerobic exercise most days" +
                    " of the week. If you think that you can’t find 30 minutes," +
                    " you can break up the exercise into chunks—10 minutes" +
                    " here and there. Build up to 30 minutes gradually."
                }
            ];
        }
    ]);
})(angular);
