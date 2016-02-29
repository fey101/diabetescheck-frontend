(function (angular) {
    "use strict";

    angular.module("emr.auth.directives.emrAppActions", [
        "emr.actions"
    ])

    .directive("emrAppActions", ["$log", "emr.actions.hasAction",
        function ($log, hasAction) {
            return {
                link: function (scope, element, attrs, controller,
                                transclude) {
                    transclude(scope, function (clone) {
                        var actions = attrs.emrAppActions;
                        if (hasAction.hasActions(actions)) {
                            // element.replaceWith(clone);
                            element.after(clone);
                        }
                    });
                },
                priority: 1500, // highest yet : higher than ng-switch (1200)
                restrict: "A",
                transclude: "element"
            };
        }]);
})(angular);
