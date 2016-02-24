(function (angular) {
    "use strict";

    angular.module("dbcheck.layout.directives.breadCrumbs", [
        "ui.router"
    ])

    .directive("breadCrumbs", ["$rootScope", "$state",
        function ($rootScope, $state) {
            return {
                link: function (scope) {
                    var listener = function(event, toState) {
                        if (toState.data && toState.data.title) {
                            scope.title = toState.data.title;
                            scope.icon = toState.data.icon;
                        }
                        if (toState.redirectTo) {
                            event.preventDefault();
                            $state.go(toState.redirectTo);
                        }
                    };
                    $rootScope.$on("$stateChangeSuccess", listener);
                },
                restrict: "AE",
                template: "<div ncy-breadcrumb></div>"
            };
        }
    ]);
})(angular);
