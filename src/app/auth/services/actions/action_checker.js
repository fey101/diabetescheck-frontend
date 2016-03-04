(function (angular, _) {
    "use strict";

    angular.module("emr.auth.services.actions.actionChecker", [
        "emr.exceptions"
    ])

    .constant("APP_ACTION_RESTRICT", "ACTIONS.RESTRICT")

    .factory("emr.actions.actionChecker",
        ["$injector","$log", "APP_ACTION_RESTRICT", "emr.exceptions.Errors",
        function ($injector, $log, APP_ACTION_RESTRICT, errs) {
            var has_restrictions = $injector.has(APP_ACTION_RESTRICT);
            var restrictions = [];
            var restrictions_value = has_restrictions ?
                $injector.get(APP_ACTION_RESTRICT) : null;
            if (has_restrictions) {
                // assert we have an array
                if (!angular.isArray(restrictions_value)) {
                    var err = errs.createError("emr.actions",
                        errs.ImproperlyConfigured);
                    throw err("actionChecker", APP_ACTION_RESTRICT +
                        " should be an array");
                }
                // load restrictions
                restrictions_value.forEach(function (rest) {
                    restrictions.push(rest.toUpperCase());
                });
            }

            return {
                canPerform: function (actions) {
                    if (!has_restrictions) {
                        return true;
                    }
                    return !_.contains(restrictions, actions.toUpperCase());
                }
            };
        }
    ]);
})(angular, _);
