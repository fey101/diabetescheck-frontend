(function (angular) {
    "use strict";

    angular.module("dbcheck.common.directives.passwordChecker", [])

    .directive("pwChecker", [function() {
        //This directive is used to validate that two passwords are similar

        return {
            link: function(scope, elem, attrs, ngModel) {

                scope.$watch("pwChecker", function () {
                    ngModel.$validate();
                });

                ngModel.$validators.passwordMatch =
                    function (modelValue, viewValue) {
                        return viewValue === scope.pwChecker;
                    };
            },
            require: "?ngModel",
            scope: {
                pwChecker: "@"
            }
        };
    }]);
})(angular);
