(function (angular) {
    "use strict";

    angular.module("dbcheck.common.controllers.userProfile", [
        "dbcheck.common.services",
        "dbcheck.resources.auth.user",
        "dbcheck.common.services.formly",
        "dbcheck.resources.journal.persons"
    ])

    .controller("dbcheck.common.controllers.user_profile", [
        "$scope", "$stateParams", "dbcheck.common.formly.user",
        "dbcheck.resource.user","dbcheck.auth.services.login",
        "dbcheck.resources.person", "errorMessage",
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
            // $scope.update = function () {
            //     var params = $scope.userProfile.model.person_details.id;
            //     var personDetails = {
            //         first_name:
            //             $scope.userProfile.model.person_details.first_name,
            //         last_name: $scope.userProfile.model.person_details.last_name,
            //     };
            //     personResource.update(params, personDetails)
            //     .then(function () {
            //         $scope.updateUser();

            //     }, function (err) {
            //         $scope.alert = silAlert.showError(err, "Error");
            //     });
            // };
        }
    ]);
}) (angular);
