(function (angular, _) {
    "use strict";

    angular.module("emr.auth.services.actions.hasAction", [
        "emr.exceptions"
    ])

    .constant("APP_ACTION_CHECKERS", "ACTIONS.CHECKERS")

    .factory("emr.actions.hasAction",
        ["$injector", "$log", "APP_ACTION_CHECKERS", "emr.exceptions.Errors",
        function ($injector, $log, APP_ACTION_CHECKERS, errs) {
            var has_checkers = $injector.has(APP_ACTION_CHECKERS);
            var checkers = [];
            var checkers_value = has_checkers ?
                $injector.get(APP_ACTION_CHECKERS) : null;

            if (has_checkers) {
                // assert we have an array
                if (!angular.isArray(checkers_value)) {
                    var err = errs.createError("emr.actions",
                        errs.ImproperlyConfigured);
                    throw err("hasAction", APP_ACTION_CHECKERS +
                        " should be an array");
                }

                // load action checkers
                checkers_value.forEach(function (checker) {
                    checkers.push($injector.get(checker));
                });
            }

            return {
                hasActions: function(actions) {
                    var AND = ":";
                    var OR = ";";

                    if (!_.isString(actions) || _.isEmpty(actions)) {
                        // coz of things like the emr-app-actions directive
                        return true;
                    }

                    // check if action checkers have been set
                    if (!has_checkers) {
                        return true;  // if none are restricted, all are allowed
                    }

                    var useOr = false;
                    var listActions = [actions];

                    if (actions.indexOf(AND) !== -1 &&
                            actions.indexOf(OR) !== -1) {

                        throw new
                            Error("You can only use one type of action splitter");

                    }

                    if (actions.indexOf(AND) !== -1) {
                        listActions = actions.split(AND);
                    }

                    if (actions.indexOf(OR) !== -1) {
                        listActions = actions.split(OR);
                        useOr = true;
                    }

                    for (var i = 0; i < listActions.length; i++) {
                        var acts = listActions[i].toUpperCase();
                        var res = true;

                        for (var j = 0; j < checkers.length; j++) {
                            if (!checkers[j].canPerform(acts) && res) {
                                res = false;
                                break;
                            }
                        }

                        if (res && useOr) {
                            return true;
                        }

                        if (!(res || useOr)) {
                            return false;
                        }

                    }
                    return useOr ? false : true;
                }
            };
        }
    ]);
})(angular, _);
