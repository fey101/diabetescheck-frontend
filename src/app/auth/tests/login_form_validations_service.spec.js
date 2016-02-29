"use strict";

describe("Unit Test: emr.auth.services.loginFormValidations",function () {
    var formlyConfig, formlyValidationMessages;
    beforeEach(function () {

        module("emr.common.services.query_adapter");
        module("emr.auth.services");
        module("emrApp.constants");

        inject(["formlyConfig","formlyValidationMessages",
            function (_formlyConfig_, _formlyValidationMessages_) {
            formlyConfig = _formlyConfig_;
            formlyValidationMessages = _formlyValidationMessages_;
        }]);
    });

    it("should validate formly username required fields", function () {

        inject(["emr.auth.services.loginFormValidations",
            function (validation) {
                var scope_var = {
                    "options" : {
                        "key": "username"
                    }
                };

                var message = "Please fill in an E-mail Address";

                validation.setValidations();
                var response = formlyValidationMessages.messages
                    .required("","",scope_var);

                expect(response).toBe(message);
            }
        ]);
    });

    it("should validate formly password required fields", function () {

        inject(["emr.auth.services.loginFormValidations",
            function (validation) {
                var scope_var = {
                    "options" : {
                        "key": "password"
                    }
                };

                var message = "Please fill in a password";

                validation.setValidations();
                var response = formlyValidationMessages.messages
                    .required("","",scope_var);

                expect(response).toBe(message);
            }
        ]);
    });

    it("should return a default message if field is unknown", function () {

        inject(["emr.auth.services.loginFormValidations",
            function (validation) {
                var scope_var = {
                    "options" : {
                        "key": "some_key"
                    }
                };

                var message = "This field is required";

                validation.setValidations();
                var response = formlyValidationMessages.messages
                    .required("","",scope_var);

                expect(response).toBe(message);
            }
        ]);
    });

    it("should return an invalid e-mail error", function () {

        inject(["emr.auth.services.loginFormValidations",
            function (validation) {
                var scope_var = {
                    "fc": {
                        "$error": {
                            "email": true
                        }
                    },
                    "options" : {
                        "key": "username"
                    }
                };

                var message = "Please fill in a valid E-mail Address";

                validation.setValidations();
                var response = formlyValidationMessages.messages
                    .email("","",scope_var);

                expect(response).toBe(message);
            }
        ]);
    });

    it("should return null on email validation", function () {

        inject(["emr.auth.services.loginFormValidations",
            function (validation) {
                var scope_var = {
                    "fc": {
                        "$error": {}
                    },
                    "options" : {
                        "key": "username"
                    }
                };

                validation.setValidations();
                var response = formlyValidationMessages.messages
                    .email("","",scope_var);

                expect(response).toBeFalsy();
            }
        ]);
    });
});
