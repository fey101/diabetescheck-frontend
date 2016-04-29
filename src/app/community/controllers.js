(function (angular) {
    "use strict";
    angular.module("dbcheck.community.controllers", [])

    .controller("dbcheck.community.controllers.setup",["$scope",
        "dbcheck.resources.FAQs", "errorMessage",
        function($scope, FAQsResource, error_svc) {

            FAQsResource.findAll({bypassCache:true}).then(
                function(data) {
                    $scope.questions = data;
                    console.log(data);
                },
                function(error) {
                    $scope.alert = error_svc.showError(error, "Error");
                }
            );

        }
    ]);

})(angular);
