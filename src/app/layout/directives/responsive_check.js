(function (angular, _) {
    "use strict";

    angular.module("dbcheck.layout.directives.responsiveCheck", [])

    .directive("responsiveCheck", ["$rootScope",
        function ($rootScope) {
            return {
                link: function (scope, element) {
                    $rootScope.toggle = false;

                    var elm = angular.element(element);
                    if (_.isEmpty(elm.html())) {
                        angular.element("#content_wrapper")
                            .addClass("null-out");
                        angular.element("#sidebar_left")
                            .addClass("dis-none");
                    }
                    else {
                        $rootScope.toggle = "true";
                        angular.element("#content_wrapper")
                            .removeClass("null-out");
                        angular.element("#sidebar_left")
                            .removeClass("dis-none");
                    }
                },
                restrict: "A"
            };
        }
    ]);
})(angular, _);
