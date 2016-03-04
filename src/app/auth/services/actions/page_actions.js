(function (angular) {
    "use strict";

    angular.module("emr.auth.services.actions.pageActions", [])

    .factory("emr.actions.pageActions",
        ["$log", "emr.actions.hasAction", "$injector",
        function ($log, hasAction, $injector) {
            return {
                canView: function (fromParams, toParams) {
                    var actions = toParams.actions;

                    if (!hasAction.hasActions(actions)) {
                        return false;
                    }
                    return true;
                },
                checkFailed: function () {
                    var $state = $injector.get("$state");
                    $state.go("auth_403");
                }
            };
        }]);
})(angular);
