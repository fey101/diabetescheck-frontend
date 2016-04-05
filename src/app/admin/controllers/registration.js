(function (angular) {
    "use strict";

    angular.module("dbcheck.admin.registration.controllers", [
        "dbcheck.admin.formly.dbmDetails",
        "dbcheck.admin.services.multistepValidation"
    ])

    .controller("dbcheck.admin.controller.dbmDetails", [
        "$scope", "$state", "errorMessage",
        "registrationForms", "dbcheck.admin.multistepValidation",
        "dbcheck.admin.formly.dbm",
        function ($scope, $state, alert, registrationForms,
            multistepValidation, fields) {
            $scope.formData = {};
            $scope.formStepSubmitted = false;

            $scope.dbmfields = fields.getFields();

            $scope.saveDbm = function (isFormValid) {
                $scope.formStepSubmitted = true;

                multistepValidation.validateForm(isFormValid);
                $state.go("create_account.related_conditions", {
                    diabetes_status: $scope.formData.diabetes_status
                });
            };

        }
    ])
    .controller("dbcheck.admin.controller.related_conditions", [
        "$scope", "$state","errorMessage",
        "registrationForms", "dbcheck.admin.multistepValidation",
        "dbcheck.admin.formly.related_conditions",
        function ($scope, $state, alert, registrationForms,
            multistepValidation, fields) {
            $scope.conditionsForm = {};
            $scope.formStepSubmitted = false;

            $scope.fields = fields.getFields();

            $scope.saveConditions = function (isFormValid) {
                $scope.formStepSubmitted = true;

                multistepValidation.validateForm(isFormValid);
                $state.go("create_account.about_you");
            };

        }
    ])
    .controller("dbcheck.admin.controller.about_you", [
        "$scope", "$state","errorMessage",
        "registrationForms", "dbcheck.admin.multistepValidation",
        "dbcheck.admin.formly.aboutYou",
        function ($scope, $state, alert, registrationForms,
            multistepValidation, fields) {
            $scope.aboutYouForm = {};
            $scope.formStepSubmitted = false;

            $scope.fields = fields.getFields();

            $scope.saveDetails = function (isFormValid) {
                $scope.formStepSubmitted = true;

                multistepValidation.validateForm(isFormValid);
                $state.go("create_account.create_profile");
            };

        }
    ])
    .controller("dbcheck.admin.controller.create_profile", [
        "$scope", "$state", "moment", "errorMessage",
        "registrationForms", "dbcheck.admin.multistepValidation",
        "dbcheck.admin.formly.create_profile",
        function ($scope, $state, moment, alert, registrationForms,
            multistepValidation, fields) {
            $scope.profileForm = {};
            $scope.formStepSubmitted = false;

            $scope.fields = fields.getFields();

            $scope.submitDetails = function (isFormValid) {
                $scope.submitClicked = true;
                $scope.formStepSubmitted = true;

                multistepValidation.validateForm(isFormValid);

                // var dob = moment($scope.formData.date_of_birth);
                // var personDob = dob.format("YYYY-MM-DD");
                // var personInfo = {
                //     date_of_birth: personDob,
                //     first_name: $scope.formData.first_name,
                //     gender:$scope.formData.gender,
                //     last_name: $scope.formData.last_name,
                //     marital_status: $scope.formData.marital_status,
                //     other_name: $scope.formData.other_name
                // };
                //     linker.person.create(personInfo)
                //         .then(function (personData) {
                //             $scope.patient = {
                //                 active: personData.active,
                //                 person: personData.id
                //             };
                //             var patientIDModel = {
                //                 active: personData.active,
                //                 id_document_type:
                //                        $scope.formData.id_document_type,
                //                 id_value: $scope.formData.id_value,
                //                 person: personData.id
                //             };
                //             linker.personID.create(patientIDModel).then(function () {
                //                 $scope.registerPatient($scope.patient);
                //             }, function (err) {
                //                 $scope.submitClicked = false;
                //                 $scope.alert = alert.showError(err);
                //                 $scope.formStepSubmitted = false;
                //             });
                //         }, function (err) {
                //             if ($scope.formData.date_of_birth) {
                //                 var dob = moment($scope.formData.date_of_birth);
                //                 var patientDob = dob.format("DD-MM-YYYY");
                //                 $scope.formData.date_of_birth = patientDob;
                //             }
                //             else {
                //                 $scope.formData.date_of_birth = "";
                //             }
                //             $scope.submitClicked = false;
                //             $scope.alert = alert.showError(err);
                //         });

                $state.go("auth_login");
            };

        }
    ]);
})(angular);