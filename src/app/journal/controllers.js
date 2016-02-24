(function (angular) {
    "use strict";
    angular.module("dbcheck.journal.controllers", [])

    .controller("dbcheck.journal.controllers.initial",["$scope",
        function($scope) {
            $scope.module = "Journal";
        }
    ]);

})(angular);
