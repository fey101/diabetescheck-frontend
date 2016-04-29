(function (angular) {
    "use strict";
    angular.module("dbcheck.journal.routes", ["ui.router"])

    .config(function config($stateProvider) {
        $stateProvider
            .state("journal", {
                ncyBreadcrumb: {
                    label: "Journal"
                },
                parent: "base_state",
                url: "/",
                views: {
                    "content@": {
                        templateUrl: "journal/tpls/journal_nav.tpl.html"
                    }
                }
            })
            .state("journal.bloodGlucose", {
                ncyBreadcrumb: {
                    label: "Blood_Glucose"
                },
                url: "journal/blood_glucose",
                views: {
                    "content@": {
                        controller: "dbcheck.journal.controllers.blood_glucose",
                        templateUrl: "journal/tpls/blood_glucose.tpl.html"
                    },
                    // "results@journal.bloodGlucose":{
                    //     templateUrl: "journal/tpls/glucose_results.tpl.html",
                    //     controller: "dbcheck.journal.controllers.blood_glucose"
                    // },
                    "pageactions@": {
                        templateUrl: "journal/tpls/pageactions/" +
                            "pageactions_detailView.tpl.html"
                    }
                }
            })
            .state("journal.dietaryInfo", {
                ncyBreadcrumb: {
                    label: "Diet"
                },
                url: "journal/diet/:mealtime",
                views: {
                    "content@": {
                        templateUrl: "journal/tpls/dietary_log.tpl.html"
                    },
                    "indexsidebar@": {
                        templateUrl: "journal/tpls/sidebar.planner.tpl.html"
                    },
                    "mealtime-content@journal.dietaryInfo": {
                        controller: "dbcheck.planner.controllers.setup",
                        templateUrl: "journal/tpls/mealtime.planner.tpl.html"
                    },
                    "pageactions@": {
                        templateUrl: "journal/tpls/pageactions/" +
                            "pageactions_detailView.tpl.html"
                    }
                }
            })
            .state("journal.fitness", {
                ncyBreadcrumb: {
                    label: "Fitness"
                },
                url: "journal/fitness",
                views: {
                    "content@": {
                        controller: "dbcheck.journal.controllers.fitness_log",
                        templateUrl: "journal/tpls/fitness_log.tpl.html"
                    },
                    "pageactions@": {
                        templateUrl: "journal/tpls/pageactions/" +
                            "pageactions_detailView.tpl.html"
                    }
                }
            });
    });
})(angular);
