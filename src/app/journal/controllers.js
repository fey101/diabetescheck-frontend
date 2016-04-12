(function (angular) {
    "use strict";
    angular.module("dbcheck.journal.controllers", [])

    .controller("dbcheck.journal.controllers.blood_glucose",[
        "$scope", "$state", "errorMessage", "dbcheck.journal.formly.log_glucose",
        "dbcheck.auth.services.login",
        function ( $scope, $state, alert, formlyService, loginservice) {
            $scope.glucoseLogForm = {};
            $scope.fields = formlyService.getFields();

            $scope.logBloodGlucose = function () {
                if ($scope.glucoseLogForm.$valid) {
                    $scope.alert = false;
                    $scope.submitClicked = true;
                    var sugarLevel = $scope.glucoseLogForm.model.glycemic_index;
                    var period = $scope.glucoseLogForm.model.period_taken;
                    var user = loginservice.getUser();
                    var isDiabetic = user.person_health.diabetic;
                    var results;
                    if (period === "fasting glucose") {
                        if (sugarLevel < 50) {
                            results = {
                                status: "Hypoglycemia",
                                explanation: "Your sugar levels are too low below" +
                                    " normal",
                                remedial_action: " Take 3 scoops of glucose or" +
                                    " sweets immediately ",
                                recommendation:"Seek medical advice soonest possible"
                            };
                        }
                        else if (sugarLevel < 70) {
                            results = {
                                status: "Hypoglycemia",
                                explanation: "Your sugar level is below normal",
                                remedial_action: "Find food to eat and take" +
                                    " blood sugar level readings more often",
                                recommendation:"Seek medical advice soonest possible"
                            };
                        }
                        else if (sugarLevel >= 70 && sugarLevel <= 110) {
                            results = {
                                status: "Normal blood sugar level",
                                explanation: "Sugar level range is between 70" +
                                    " and 110 mg/dl",
                                remedial_action: "None",
                                recommendation:"Maintain a healthy lifestyle by" +
                                    " eating healthy and doing exercises"
                            };

                        }
                        else if (sugarLevel > 110 && isDiabetic) {
                            results = {
                                status: "Hyperglycemia",
                                explanation: "Your sugar level is above normal",
                                remedial_action: "Exercise to reduce the blood" +
                                    " sugar levels. High sugar levels lead to" +
                                    " diabetic related complications",
                                recommendation: "Try reducing your carbs/calories" +
                                    " intake or increase your activity levels"
                            };
                        }
                        else if (sugarLevel > 110 && !isDiabetic) {
                            results = {
                                status: "Hyperglycemia",
                                explanation: "Your sugar level is above normal",
                                recommendation: "if high readings persit/have" +
                                    " persisted, it is recommended that you have" +
                                    " your HbA1c levels tested at a health" +
                                    " facility to determine if you are diabetic. ",
                                remedial_action: "Try reducing your carbs/calories" +
                                    " intake or increase your activity levels"
                            };
                        }

                    }
                    // if (period === "before meal") {
                    //     //todo;
                    // }
                    // if (period === "after meal") {
                    //     //todo;
                    // }
                    $scope.results = results;
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
        function ( $scope, $state, alert, formlyService) {
            $scope.fitnessLogForm = {};
            $scope.fields = formlyService.getFields();

            $scope.logActivity = function () {
                if ($scope.fitnessLogForm.$valid) {
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
    ])
    .controller("dbcheck.journal.controllers.food_log",[
        "$scope", "$state", "errorMessage", "dbcheck.journal.formly.log_medication",
        function ( $scope, $state, alert, formlyService) {
            $scope.medicationLogForm = {};
            $scope.fields = formlyService.getFields();

            $scope.logMedication = function () {
                if ($scope.medicationLogForm.$valid) {
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
            $scope.groups = [
                {
                    title: "Understanding Food Groups",
                    content: "There are 3 basic food groups: fats, proteins, and" +
                    " carbohydrates. The carbohydrates are the foods that can be" +
                    " broken down into sugar. It is essential to have all 3 food" +
                    " groups in your diet to have good nutrition."
                },
                {
                    title: "Why Count Carbohydrates?",
                    content: "Carbohydrates make your blood glucose level go up." +
                    " If you know how much carbohydrates you've eaten, you have a" +
                    " good idea what your blood glucose level is going to do. The" +
                    " more carbohydrates you eat, the higher your blood sugar" +
                    " will go up. Space out your carbohydrates throughout" +
                    " the day to avoid sugar \"loading.\""
                },
                {
                    title: "Which Foods Contain Carbohydrates?",
                    content: "Most of the carbohydrate we eat comes from 3 food" +
                    " groups: starch, fruit, and milk." +
                    " Vegetables also contain some carbohydrates, but foods in" +
                    " the meat and fat groups contain very little carbohydrates"
                },
                {
                    title: "Why then not avoid carbohydrates all together",
                    content: "you need to set realistic goals. If you haven’t" +
                    " exercised much recently, you will want to start slow and" +
                    " gradually increase the amount and intensity of the activity." +
                    " You also need to find a way to exercise that you actually" +
                    " enjoy—because if it’s not fun, you won’t do it. There are" +
                    " three main kinds of exercise—aerobic, strength training, and" +
                    " flexibility work. You should aim to to have a good balance" +
                    " of all three but importantly get at least 30 minutes of" +
                    " aerobic exercise most days of the week." +
                    " If you think that you" +
                    " can’t find 30 minutes, you can break up the exercise into" +
                    " chunks—10 minutes here and there. Build up to 30 minutes" +
                    " gradually."
                },
                {
                    title: "Where then do counting calories come in?",
                    content: "The amount of food you eat is closely related to" +
                    " blood sugar control. If you eat more food than is" +
                    " recommended, your blood sugar goes up. Although foods" +
                    " containing carbohydrates (carbs) have the most impact on" +
                    " blood sugars, the calories" +
                    " from all foods will affect blood sugar. Calories" +
                    " also contribute to body weight. You also want to keep" +
                    " count of it so that you keep you weight in check as being" +
                    " overweight contributes to insulin resistance"
                }
            ];
        }
    ]);
})(angular);
