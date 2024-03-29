(function (angular) {
    "use strict";
    angular.module("dbcheck.common.routes", ["ui.router"])

    .config(function config($stateProvider) {
        $stateProvider
            .state("base_state", {
                ncyBreadcrumb: {
                    label: "DIABETES CHECK"
                },
                views: {
                    "indexheader@":{
                        templateUrl: "layout/tpls/header.tpl.html"
                    },
                    "indexsidebar@": {
                        templateUrl: "layout/tpls/index_sidebar.tpl.html"
                    }
                }
            })
            .state("profile", {
                ncyBreadcrumb: {
                    label: "User Profile"
                },
                parent: "base_state",
                url :"/profile/:userId",
                views: {
                    "content@":{
                        controller: "dbcheck.common.controllers.user_profile",
                        templateUrl: "common/tpls/user_detail.tpl.html"
                    },
                    "indexsidebar@" : {
                        templateUrl: "common/tpls/sidebars/" +
                                     "user_sidebar.tpl.html"
                    }
                }
            })
            .state("change_password", {
                ncyBreadcrumb: {
                    label: "Change Password"
                },
                parent: "base_state",
                url :"/profile/password/change",
                views: {
                    "content@":{
                        controller: "dbcheck.common.controllers.changePassword",
                        templateUrl: "common/tpls/change_password.tpl.html"
                    },
                    "indexsidebar@" : {
                        templateUrl: "common/tpls/sidebars/" +
                                     "user_sidebar.tpl.html"
                    },
                    "pageactions@":{
                        templateUrl:"common/tpls/pageactions/" +
                                    "common_user_actions.tpl.html"
                    }
                }
            })
            .state("auth_403", {
                ncyBreadcrumb: {
                    label: "Error Page"
                },
                parent: "base_state",
                // allows user to view state when `is_initial` is true
                showErrorPage: false,
                url: "/403/?initial_pwd&no_organisation",
                views:{
                    "content@":{
                        controller: "dbcheck.common.controllers.errorPage",
                        templateUrl: "auth/tpls/403.tpl.html"
                    }
                }
            });
    });
})(angular);
