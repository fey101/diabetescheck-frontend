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
                url: "journal/diet",
                views: {
                    "content@": {
                        templateUrl: "journal/tpls/dietary_log.tpl.html"
                    },
                    "pageactions@": {
                        templateUrl: "journal/tpls/pageactions/" +
                            "pageactions_detailView.tpl.html"
                    }
                }
            })
            .state("journal.medication", {
                ncyBreadcrumb: {
                    label: "Medication"
                },
                url: "journal/medication",
                views: {
                    "content@": {
                        templateUrl: "journal/tpls/medication_log.tpl.html"
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
