(function (angular) {
    "use strict";

    angular.module("dbcheck.layout.directives.menuToggle", [])

    .directive("menuToggle", [function () {
        return {
            link: function (scope, element) {
                var elm = angular.element(element);
                elm.bind("click", function () {
                    elm.toggleClass("menu-opened");
                    angular.element("#main-top-nav")
                        .toggleClass("show-me");
                });
            },
            restrict: "A"
        };
    }]);
})(angular);
