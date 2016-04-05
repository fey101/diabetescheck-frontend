(function (angular, _) {
    "use strict";

    angular.module("dbcheck.admin.services.multistepValidation", [])

    .value("registrationForms", [
        {uiSref: "create_account.diabetes_mgt", valid: false},
        {uiSref: "create_account.related_conditions", valid: false},
        {uiSref: "create_account.about_you", valid: false},
        {uiSref: "create_account.create_profile", valid: false}
    ])

    .factory("dbcheck.admin.multistepValidation",[
        "registrationForms", "errorMessage", "$state", "$rootScope",
        function(registrationForms, alert, $state, $rootScope) {
            var scope;
            scope = $rootScope.$new();

            return {
                validateForm : function (isFormValid) {
                    var nextState = function(currentState) {
                        switch (currentState) {
                        case "create_account.diabetes_mgt":
                            return "create_account.related_conditions";

                        case "create_account.related_conditions":
                            return "create_account.about_you";

                        case "create_account.about_you":
                            return "create_account.create_profile";

                        }
                    };
                    var updateValidityOfCurrentStep = function(updatedValidity) {

                        var currentStateIndex = _.findIndex(registrationForms,
                            function(registrationForm) {
                            return registrationForm.uiSref === $state.current.name;
                        });
                        registrationForms[currentStateIndex].valid = updatedValidity;
                    };
                    if (isFormValid) {
                        scope.formStepSubmitted = false;
                        updateValidityOfCurrentStep(true);
                        return nextState($state.current.name);
                    } else {
                        updateValidityOfCurrentStep(false);
                    }
                }
            };
        }
    ]);
})(angular, _);
