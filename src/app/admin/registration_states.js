(function (angular) {
    "use strict";

    angular.module("dbcheck.admin.registration.states", [])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
            .state("create_account", {
                requireUser: false,
                url: "/account/signup",
                views:{
                    "main":{
                        templateUrl: "admin/tpls/registration/signup.base.tpl.html"
                    }
                }
            })
            .state("create_account.diabetes_mgt", {
                requireUser: false,
                url: "/diabetes_mgt",
                views:{
                    "wizard-content":{
                        templateUrl: "admin/tpls/registration/diabetes_mgt.tpl.html",
                        controller: "dbcheck.admin.controller.dbmDetails"
                    }
                }
            })
            .state("create_account.related_conditions", {
                requireUser: false,
                url: "/related_conditions",
                views:{
                    "wizard-content":{
                        templateUrl: "admin/tpls/registration/" +
                            "related_conditions.tpl.html",
                        controller: "dbcheck.admin.controller.related_conditions"
                    }
                }
            })
            .state("create_account.about_you", {
                requireUser: false,
                url: "/about_you",
                views:{
                    "wizard-content":{
                        templateUrl: "admin/tpls/registration/about_you.tpl.html",
                        controller: "dbcheck.admin.controller.about_you"
                    }
                }
            })
            .state("create_account.create_profile", {
                requireUser: false,
                url: "/profile",
                views:{
                    "wizard-content":{
                        templateUrl: "admin/tpls/registration/" +
                            "create_profile.tpl.html",
                        controller: "dbcheck.admin.controller.create_profile"
                    }
                }
            });
    }]);

})(angular);
