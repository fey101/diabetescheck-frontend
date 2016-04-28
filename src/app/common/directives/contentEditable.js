(function(angular) {
    "use strict";

    angular.module("dbcheck.common.directives.editableDiv", [])

    .directive("contentEditable", function() {
        return {
            require: "ngModel",
            restrict: "A",
            link: function(scope, elm, attr, ngModel) {

                function updateViewValue() {
                    ngModel.$setViewValue(scope.innerHTML);
                }
                //Binding it to keyup, lly bind it to any other events of interest
                //like change etc..
                elm.on("keyup", updateViewValue);

                scope.$on("$destroy", function() {
                    elm.off("keyup", updateViewValue);
                });

                ngModel.$render = function() {
                    elm.html(ngModel.$viewValue);
                };

            }
        };
    });

}) (angular);
