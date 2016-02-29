(function (angular) {
    "use strict";

    angular.module("dbcheck.auth.services.authentication.isInitial", [
        "ui.router",
        "dbcheck.auth.services"
    ])

    .service("dbcheck.authentication.isInitial", [
        "$injector", "dbcheck.auth.services.login", function ($injector, authConfig) {

            return {
                canView: function (fromParams, toParams) {
                    /*
                     * @name canView
                     *
                     * @description
                     * Check if a user is loggedIn. If they are logged in and
                     * the initial field is set to false then successfully
                     log them in
                     * If ``initial`` field is true then a call is
                     made to checkFailed
                     * which redirects to a view that
                     allows them to change the password
                    */

                    var showErrorPage = toParams.showErrorPage === false;
                    var isLoggedIn = authConfig.isLoggedIn();

                    if (isLoggedIn && !showErrorPage) {
                        var user = authConfig.getUser();
                        if (user.is_initial) {
                            return false;
                        }
                    }
                    return true;
                },
                checkFailed : function () {
                    var $state = $injector.get("$state");
                    $state.go("auth_403", {"initial_pwd": true});
                }
            };
        }
    ]);
})(angular);
