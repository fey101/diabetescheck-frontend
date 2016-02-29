(function (angular, _) {
    "use strict";

    angular.module("emr.auth.services.authorization.actionChecker", [
        "emr.exceptions",
        "emr.authentication",
        "emr.auth.services"
    ])

    .factory("emr.authorization.actionChecker",
        ["$injector", "$log", "emr.authorization.hasPerm", "emr.exceptions.Errors",
        function ($injector, $log, hasPerm, errs) {

            return {
                canPerform : function (action) {
                    var inject_val = action.toUpperCase();

                    if (!$injector.has(inject_val)) {
                        throw errs.createError("emr.authorization",
                            errs.ImproperlyConfigured)
                        ("actionChecker.badaction", "no action like : '" +
                            action + "'");
                    }

                    var act = $injector.get(inject_val);

                    if (_.isUndefined(act.action)) {
                        return true;
                    }
                    if (!angular.isString(act.action) || _.isEmpty(act.action)) {
                        throw errs.createError("emr.authorization",
                            errs.ImproperlyConfigured)
                        ("actionChecker.badperm",
                            "Action permission: '" + action +
                            "' should be a non-empty string"
                        );
                    }
                    return hasPerm.hasPermissions([{"name": act.action}]);
                }
            };
        }
     ]);
})(angular, _);
