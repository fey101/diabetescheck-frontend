(function (angular) {
    "use strict";

    angular.module("emr.auth.services.authentication.hasOrganisation", [
        "ui.router",
        "emr.auth.services"
    ])

    .service("emr.authentication.hasOrganisation", [
        "$state", "emr.auth.services.login", function ($state, authConfig) {

            this.checkFailed = function () {
                $state.go("auth_403", {"no_organisation": true});
            };

            /*
             * @name canView
             *
             * @description
             * Allows users to view resources only when they have a organisation
             * defined. The lack of an organisation will lead to permission
             * denial until an organisation is added.
             * This is required since all records being saved are required
             * to infer the `organisation` from the logged in user
            */
            this.canView = function (fromParams, toParams) {
                var showErrorPage = toParams.showErrorPage === false;
                var isLoggedIn = authConfig.isLoggedIn();

                if (isLoggedIn && !showErrorPage) {
                    var user = authConfig.getUser();
                    if (!user.organisation) {
                        return false;
                    }
                }
                return true;
            };
        }
    ]);
})(angular);
