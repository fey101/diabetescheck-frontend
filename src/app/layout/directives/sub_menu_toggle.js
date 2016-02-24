(function (angular) {
    "use strict";

    angular.module("dbcheck.layout.directives.subMenuToggle", [])

    .directive("submenuToggle", [function () {
        return {
            link: function (scope, element) {
                var elm = angular.element(element);
                elm.bind("click", function () {
                    angular.element("#content_wrapper")
                        .toggleClass("null-out");
                    angular.element("#sidebar_left")
                        .toggleClass("dis-none");
                });
            },
            restrict: "A"
        };
    }]);
})(angular);
