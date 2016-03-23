(function (angular) {
    "use strict";

    angular.module("dbcheck.auth.states", [])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
            .state("auth_base", {
                requireUser: false,
                views:{
                    "main":{
                        templateUrl: "auth/tpls/auth_base.tpl.html"
                    }
                }
            })
            .state("auth_login", {
                parent: "auth_base",
                requireUser: false,
                url: "/login/?reset_password&" +
                    "reset_password_confirm&change_pwd&timeout",
                views:{
                    "form":{
                        controller: "dbcheck.auth.controllers.loginAuth",
                        templateUrl: "auth/tpls/login.tpl.html"
                    }
                }
            })
            .state("auth_logout", {
                parent: "auth_base",
                requireUser: false,
                showErrorPage: false,
                url: "/logout/?timeout&change_pwd",
                views:{
                    "form":{
                        controller: "dbcheck.auth.controllers.logoutAuth",
                        templateUrl: "auth/tpls/login.tpl.html"
                    }
                }
            }).state("auth_reset", {
                parent: "auth_base",
                requireUser: false,
                url: "/password/reset",
                views:{
                    "form":{
                        controller: "dbcheck.auth.controllers.passwordReset",
                        templateUrl: "auth/tpls/reset_email.tpl.html"
                    }
                }
            }).state("auth_reset_confirm", {
                parent: "auth_base",
                requireUser: false,
                url: "/password/reset/confirm/:uid/:token",
                views:{
                    "form":{
                        controller: "dbcheck.auth.controllers.passwordResetConfirm",
                        templateUrl: "auth/tpls/reset_confirm.tpl.html"
                    }
                }
            }).state("auth_change_pwd", {
                parent: "auth_base",
                requireUser: false,
                showErrorPage: false,
                url: "/auth/change/password/",
                views:{
                    "form":{
                        controller: "dbcheck.common.controllers.changePassword",
                        templateUrl: "auth/tpls/change_password.tpl.html"
                    }
                }
            })
            .state("auth_create_account", {
                parent: "auth_base",
                requireUser: false,
                showErrorPage: false,
                url: "/account/signup/",
                views:{
                    "form":{
                        // controller: "dbcheck.common.controllers.signup",
                        templateUrl: "auth/tpls/registration/signup.base_tpl.html"
                    }
                }
            });
    }]);

})(angular);
