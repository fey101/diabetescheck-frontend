(function (angular) {
    "use strict";

    angular.module("emr.common.controllers.userProfile", [
        "emr.common.services",
        "emr.resources.auth.user",
        "emr.common.formly.user",
        "emr.resources.common.person"
    ])

    .controller("emr.common.controllers.user_profile", [
        "$scope", "$stateParams", "emr.common.formly.user",
        "emr.resource.user","emr.auth.services.login","emr.resource.person",
        "errorMessage",
        function ( $scope, $stateParams, formlyService, userResource, AuthService,
            personResource, silAlert) {
            $scope.userProfile = {};

            $scope.userForm = {};
            var id = $stateParams.userId;

            $scope.fields = formlyService.getFields();

            var user = AuthService.getUser();

            $scope.userProfile.model = user;

            $scope.updateUser = function () {
                var meResource = {
                        email: $scope.userProfile.model.email,
                        password: user.password
                    };
                userResource.update(id, meResource).then(function (data) {
                        $scope.updated = data;
                        $scope.alert = silAlert.showSuccess(
                            "You have successfully updated your details!" +
                            "Kindly logout to view the changes.","Success");
                    }, function (err) {
                        $scope.alert = silAlert.showError(err,"Error");
                    });
            };
            $scope.update = function () {
                var params = $scope.userProfile.model.person_details.id;
                var personDetails = {
                    first_name: $scope.userProfile.model.person_details.first_name,
                    last_name: $scope.userProfile.model.person_details.last_name,
                    organisation: user.organisation
                };
                personResource.update(params, personDetails)
                .then(function () {
                    $scope.updateUser();

                }, function (err) {
                    $scope.alert = silAlert.showError(err, "Error");
                });
            };
        }
    ]);
}) (angular);
