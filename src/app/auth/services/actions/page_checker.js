(function (angular, _) {
    "use strict";

    angular.module("emr.auth.services.actions.pageChecker", [
        "emr.exceptions"
    ])

    .constant("APP_PAGE_CHECKERS", "PAGE.CHECKERS")

    .factory("emr.actions.pageChecker",
        ["$injector", "$log", "$rootScope", "APP_PAGE_CHECKERS",
            "emr.exceptions.Errors",
        function ($injector, $log, $rootScope, APP_PAGE_CHECKERS, errs) {
            var evtListener = null;
            var has_checkers = $injector.has(APP_PAGE_CHECKERS);
            var checkers = [];
            var checkers_value = has_checkers ?
                $injector.get(APP_PAGE_CHECKERS) : null;

            if (has_checkers) {
                // assert we have an array
                if (!angular.isArray(checkers_value)) {
                    var err = errs.createError("emr.actions",
                        errs.ImproperlyConfigured);
                    throw err("pageChecker", APP_PAGE_CHECKERS +
                        " should be an array");
                }

                // load action checkers
                checkers_value.forEach(function (checker) {
                    checkers.push($injector.get(checker));
                });
            }

            var defaultCheckFail = angular.noop;

            return {
                canViewPage : function (fromParams, toParams) {
                    var ans = {
                        "can_view": true
                    };

                    if (has_checkers) {
                        for (var i = 0; i < checkers.length; i++) {
                            //    "using", checkers_value[i]);
                            var val = checkers[i].canView(fromParams, toParams);
                            if (!val) {
                                // checkers_value[i]);
                                ans.can_view = false;
                                ans.callback = checkers[i].checkFailed ||
                                    defaultCheckFail;
                                return ans;
                            }
                        }
                    }
                    return ans;
                },
                startListening : function () {
                    var self = this;
                    evtListener = $rootScope.$on("$stateChangeStart",
                        function (evt, toState, toParams, fromState, fromParams) {
                            var ans = self.canViewPage(fromState, toState);
                            if (!ans.can_view) {
                                evt.preventDefault();
                                ans.callback(toState, toParams, fromState,
                                    fromParams);
                            }
                        }
                    );
                },
                stopListening : function () {
                    if (_.isNull(evtListener)) {
                        return;
                    }
                    evtListener();
                    evtListener = null;
                }
            };
        }
    ]);
})(angular, _);
