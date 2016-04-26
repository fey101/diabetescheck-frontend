(function (angular) {
    "use strict";

    angular.module("dbcheck.admin.registration.controllers", [
        "dbcheck.admin.formly.dbmDetails",
        "dbcheck.admin.services.multistepValidation",
        "dbcheck.admin.services.registrationData"
    ])

    .controller("dbcheck.admin.controller.dbmDetails", [
        "$scope", "$state", "errorMessage",
        "registrationForms", "dbcheck.admin.multistepValidation",
        "dbcheck.admin.formly.dbm", "registrationData",
        function ($scope, $state, alert, registrationForms,
            multistepValidation, fields, regData) {
            $scope.formData = {};
            $scope.formStepSubmitted = false;

            $scope.dbmfields = fields.getFields();

            $scope.saveDetails = function (isFormValid) {
                $scope.formStepSubmitted = true;
                $scope.next_state = multistepValidation.validateForm(isFormValid);
                if ($scope.next_state) {
                    regData.setWhatToManage($scope.formData);
                    $state.go($scope.next_state);
                }
                else {
                    var data = {
                        "data": {
                            "error": "Please correct the" +
                            " errors on the form"
                        }
                    };
                    $scope.formStepSubmitted = false;
                    $scope.alert = alert.showError(data, "Error");
                }
            };

        }
    ])
    .controller("dbcheck.admin.controller.related_conditions", [
        "$scope", "$state","errorMessage",
        "registrationForms", "dbcheck.admin.multistepValidation",
        "dbcheck.admin.formly.related_conditions","registrationData",
        function ($scope, $state, alert, registrationForms,
            multistepValidation, fields, regData) {
            $scope.conditionsFormData = {};
            $scope.formStepSubmitted = false;

            $scope.fields = fields.getFields();

            $scope.saveDetails = function (isFormValid) {
                $scope.formStepSubmitted = true;
                $scope.next_state = multistepValidation.validateForm(isFormValid);
                if ($scope.next_state) {
                    regData.setRelatedConditions($scope.conditionsFormData);
                    $state.go($scope.next_state);
                }
                else {
                    var data = {
                        "data": {
                            "error": "Please correct the" +
                            " errors on the form"
                        }
                    };
                    $scope.formStepSubmitted = false;
                    $scope.alert = alert.showError(data, "Error");
                }
            };

        }
    ])
    .controller("dbcheck.admin.controller.about_you", [
        "$scope", "$state","errorMessage",
        "registrationForms", "dbcheck.admin.multistepValidation",
        "dbcheck.admin.formly.aboutYou","registrationData",
        function ($scope, $state, alert, registrationForms,
            multistepValidation, fields, regData) {
            $scope.aboutYouFormData = {};
            $scope.formStepSubmitted = false;

            $scope.fields = fields.getFields();

            $scope.saveDetails = function (isFormValid) {
                $scope.formStepSubmitted = true;
                $scope.next_state = multistepValidation.validateForm(isFormValid);
                if ($scope.next_state) {
                    regData.setAboutYou($scope.aboutYouFormData);
                    $state.go($scope.next_state);
                }
                else {
                    var data = {
                        "data": {
                            "error": "Please correct the" +
                            " errors on the form"
                        }
                    };
                    $scope.formStepSubmitted = false;
                    $scope.alert = alert.showError(data, "Error");
                }
            };

        }
    ])
    .controller("dbcheck.admin.controller.create_profile", [
        "$scope", "$state", "moment", "errorMessage",
        "registrationForms", "dbcheck.admin.multistepValidation",
        "dbcheck.admin.formly.create_profile","registrationData",
        "dbcheck.resource.linkAdminThings", "dbcheck.auth.services.login",
        function ($scope, $state, moment, alert, registrationForms,
            multistepValidation, fields, regData, registrationResources,
            loginService) {
            $scope.profileFormData = {};
            $scope.submitClicked = false;

            $scope.fields = fields.getFields();

            $scope.submitDetails = function (isFormValid) {
                $scope.submitClicked = true;

                console.log(registrationForms);
                var data;
                //check that all prior forms have been validated to true.
                var validRegistration = true;
                _.each (registrationForms, function(form) {
                    if (!form.valid &&
                            form.uiSref !== "create_account.create_profile") {
                        validRegistration = false;
                    }
                });

                if (!validRegistration) {
                    data = {
                        "data": {
                            "error": "You may not skip any step of the" +
                            " registration. Please ensure you start from beginning" +
                            " and progress continually to the end."
                        }
                    };
                    $scope.submitClicked = false;
                    $scope.alert = alert.showError(data, "Error");
                }
                // only if validRegistration should we invoke function for next state
                else {
                    $scope.next_state =
                        multistepValidation.validateForm(isFormValid);
                    if ($scope.next_state) {
                        var dob = moment(
                            $scope.profileFormData.date_of_birth, "DD-MM-YYYY");
                        var personDob = dob.format("YYYY-MM-DD");
                        $scope.profileFormData.date_of_birth = personDob;
                        regData.setProfile($scope.profileFormData);
                        // retrieve regData object
                        var regDataDetails = regData.getData();
                        console.log(regDataDetails);
                        // create involved objects but first authorize creation by
                        // temporarily using admin's credentials
                        // loginService.fetchToken();

                        var userObject = {
                            "password": regDataDetails.password,
                            "first_name": regDataDetails.first_name,
                            "last_name": regDataDetails.last_name,
                            "email": regDataDetails.email,
                            "is_active": true
                        };
                        registrationResources.user.create(userObject).then(
                            function(userData) {
                                var healthDetailObject = {
                                    "weight": regDataDetails.weight,
                                    "height": regDataDetails.height,
                                    "diabetic": regDataDetails.diabetic
                                };
                                registrationResources.healthDetail.create(
                                    healthDetailObject).then(
                                    function(healthData) {

                                        var personObject = {
                                            "date_of_birth":
                                                regDataDetails.date_of_birth,
                                            "user": userData.id,
                                            "gender": regDataDetails.gender,
                                            "health_details": healthData.id
                                        };
                                        registrationResources.person.create(
                                            personObject).then(
                                            function(personData) {
                                                console.log(personData);
                                                // $state.go($scope.next_state);
                                            },
                                            function(error) {
                                                $scope.submitClicked = false;
                                                $scope.alert = alert.showError(
                                                    error, "Error");
                                            });

                                    },
                                    function(error) {
                                        $scope.submitClicked = false;
                                        $scope.alert = alert.showError(
                                            error, "Error");
                                    });
                            },
                            function(error) {
                                $scope.submitClicked = false;
                                $scope.alert = alert.showError(error, "Error");
                            });
                    }
                    else {
                        data = {
                            "data": {
                                "error": "Please correct the" +
                                " errors on the form"
                            }
                        };
                        $scope.submitClicked = false;
                        $scope.alert = alert.showError(data, "Error");
                    }
                }

            };

        }
    ]);
})(angular);
