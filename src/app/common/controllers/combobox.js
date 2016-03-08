(function (angular, _) {
    "use strict";

    angular.module("dbcheck.common.controllers.combobox", [
        "dbcheck.common.services",
        "dbcheck.resources.auth.user"
    ])

    .controller("dbcheck.common.comboboxController", [
        "$scope", "DS", "$sce", "errorMessage",
        function ($scope, DS, $sce, alerts) {
            $scope.trustAsHtml = function (value) {
                return $sce.trustAsHtml(value);
            };
            if (_.isUndefined($scope.to.optionsResource)) {
                return;
            }
            var resourceName = $scope.to.optionsResource;
            $scope.to.options = [];

            $scope.refreshResults = function (value) {
                /*
                *   This method uses the fulltext search to allow searching
                *   for records that are not displayed in the combobox but
                *   are present in the API
                */
                var params = {
                    search: value
                };
                DS.findAll(resourceName, params).then(function (data) {//for searches
                    $scope.to.options = data;
                }, function (err) {
                    $scope.alert = alerts.showError(
                        err, "Failed to Load Resource");
                });
            };

            DS.findAll(resourceName).then(function (data) {//shows 30 records
                $scope.to.options = data;
            }, function (err) {
                    $scope.alert = alerts.showError(
                        err, "Failed to Load Resource");
                });
        }
    ]);
})(angular, _);
