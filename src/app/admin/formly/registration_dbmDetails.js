(function (angular) {
    "use strict";

    angular.module("dbcheck.admin.formly.dbmDetails", [])

    .factory("dbcheck.admin.formly.dbm", [function () {
        /*
        *   This service hold the fields necessary for creating new
        *   recipe. Fields are rendered as JSON by the awesome angular formly
        *   form directive.
        *
        *   Defining forms fields this way(other than puting them in a JSON file)
        *   enables us to take advantage of the full power of angular-formly
        *   and use it's validation that is easily implemented using JS
        */
        var getFields = function () {
            var fields = [
                {
                    "key": "diabetic",
                    "ngModelElAttrs": {
                        "tabindex" : "1"
                    },
                    "templateOptions": {
                        "label": "Diabetes status",
                        "options": [
                            {
                                "name": "Pre-diabetic",
                                "value": false
                            },
                            {
                                "name": "Type 2 diabetic",
                                "value": true
                            }
                        ],
                        "reqValidationMsg": "This field is required",
                        "required": true
                    },
                    "type": "radio"
                }
            ];
            return fields;
        };

        return {
            "getFields": getFields
        };
    }])
    .factory("dbcheck.admin.formly.related_conditions", [function () {
        var getFields = function () {
            var fields = [
                {
                    "key": "related_conditions",
                    "ngModelElAttrs": {
                        "tabindex" : "1"
                    },
                    "templateOptions": {
                        "label": "Do you have any of the following " +
                            "conditions?(select all applicable)",
                        "labelProp": "name",
                        "valueProp": "id",
                        "options": [
                            {
                                "name": "Anxiety",
                                "id": 1
                            },
                            {
                                "name": "Allergies",
                                "id": 2
                            },
                            {
                                "name": "Cancer",
                                "id": 3
                            },
                            {
                                "name": "Depression",
                                "id": 4
                            },
                            {
                                "name": "High Blood Pressure/Hypertension",
                                "id": 5
                            },
                            {
                                "name": "High Cholestrol",
                                "id": 6
                            },
                            {
                                "name": "Pain",
                                "id": 7
                            }
                        ],
                        "reqValidationMsg": "This field is required",
                        "required": true
                    },
                    "type": "radio"
                }
            ];
            return fields;
        };

        return {
            "getFields": getFields
        };
    }])
    .factory("dbcheck.admin.formly.aboutYou", [function () {
        var getFields = function () {
            var fields = [
                {
                    "key": "weight",
                    "ngModelElAttrs": {
                        "tabindex" : "1"
                    },
                    "templateOptions": {
                        "label": "Current weight in kilograms (Kgs)",
                        "required": true,
                        "reqValidationMsg": "This field is required",
                        "min": 30,
                        "max": 500,
                        "type": "number"
                    },
                    "type": "input"
                },
                {
                    "key": "height",
                    "ngModelElAttrs": {
                        "tabindex" : "2"
                    },
                    "templateOptions": {
                        "label": "Height in metres (M)",
                        "required": true,
                        "reqValidationMsg": "This field is required",
                        "min": 1,
                        "max": 3,
                        "type": "number"
                    },
                    "type": "input"
                },
                {
                    "key": "daily_activity_level",
                    "ngModelElAttrs": {
                        "tabindex" : "3"
                    },
                    "templateOptions": {
                        "label": "How would you describe your" +
                        "normal daily activity level",
                        "options": [
                            {
                                "name": "You spend the whole day in bed" +
                                "/No movements",
                                "value": "in bed"
                            },
                            {
                                "name": "High",
                                "value": "high"
                            },
                            {
                                "name": "Moderate",
                                "value": "moderate"
                            },
                            {
                                "name": "Low",
                                "value": "low"
                            }
                        ],
                        "reqValidationMsg": "This field is required",
                        "required": true
                    },
                    "type": "radio"
                },
                {
                    "key": "exercise_freq",
                    "ngModelElAttrs": {
                        "tabindex" : "4"
                    },
                    "templateOptions": {
                        "label": "How frequent is your scheduled time for exercises",
                        "labels": ["display"],
                        "options": [
                            {
                                "display": "Random",
                                "value": "Random"
                            },
                            {
                                "display": "15 minutes",
                                "value": "15 min"
                            },
                            {
                                "display": "30 minutes",
                                "value": "30 min"
                            },
                            {
                                "display": "1 hour/above 1 hour",
                                "value": "1 hr or more"
                            }

                        ],
                        "valueProp": "value",
                        "required": true,
                        "reqValidationMsg": "This field is required"
                    },
                    "type": "combobox"
                }
            ];
            return fields;
        };

        return {
            "getFields": getFields
        };
    }])
    .factory("dbcheck.admin.formly.create_profile", [function () {
        var getFields = function () {
            var fields = [
                {
                    "key": "first_name",
                    "ngModelElAttrs": {
                        "tabindex" : "1"
                    },
                    "templateOptions": {
                        "label": "First name",
                        "maxlength": 50,
                        "maxlengthValidationMsg": "The First Name" +
                        " should not be longer than 50 characters",
                        "minlength": 3,
                        "minlengthValidationMsg": "The First Name" +
                        " should not be shorter than 3 characters",
                        "reqValidationMsg": "Please provide your " +
                        "First Name",
                        "required": true,
                        "type": "text"
                    },
                    "type": "input"
                },
                {
                    "key": "last_name",
                    "ngModelElAttrs": {
                        "tabindex" : "2"
                    },
                    "templateOptions": {
                        "label": "Last name",
                        "maxlength": 50,
                        "maxlengthValidationMsg": "The Last Name " +
                        "should not be longer than 50 characters",
                        "minlength": 3,
                        "minlengthValidationMsg": "The Last Name " +
                        "should not be shorter than 3 characters",
                        "reqValidationMsg": "Please provide your " +
                        "Last Name",
                        "required": true,
                        "type": "text"
                    },
                    "type": "input"
                },
                {
                    "key": "gender",
                    "ngModelElAttrs": {
                        "tabindex" : "3"
                    },
                    "templateOptions": {
                        "label": "Gender",
                        "options": [
                            {
                                "name": "Male",
                                "value": 1
                            },
                            {
                                "name": "Female",
                                "value": 2
                            }
                        ],
                        "reqValidationMsg": "This field is required",
                        "required": true
                    },
                    "type": "radio"
                },
                {
                    "key": "date_of_birth",
                    "ngModelElAttrs" : {
                        "tabindex" : "4"
                    },
                    "templateOptions": {
                        "description": "Date format should be (DD-MM-YYYY)",
                        "label": "Birthdate",
                        "placeholder": "DD-MM-YYYY",
                        "reqValidationMsg": "Please provide your " +
                        "Date of Birth",
                        "required": true,
                        "type": "text"
                    },
                    "type": "horizontalDatepicker"
                },
                {
                    "key": "email",
                    "ngModelElAttrs": {
                        "tabindex" : "5"
                    },
                    "templateOptions": {
                        "addonLeft": {
                            class: "fa fa-envelope"
                        },
                        "emailValidationMsg": "Please provide a valid email address",
                        "label": "Email address (Optional)",
                        "required": true,
                        "type": "email"
                    },
                    "type": "input"
                },
                {
                    "key": "password",
                    "ngModelElAttrs": {
                        "tabindex" : "6"
                    },
                    "templateOptions": {
                        "addonLeft": {
                            "class": "fa fa-lock"
                        },
                        "label": "Password",
                        "reqValidationMsg": "To safeguard your details," +
                        " please provide a password",
                        "required": true,
                        "type": "password"
                    },
                    "type": "input"
                }
                // {
                //     "expressionProperties": {
                //         "templateOptions.pwCheckerVal": "model.password"
                //     },
                //     "key": "confirm_password",
                //     "ngModelAttrs": {
                //         "tabindex" : "7",
                //         "pwCheckerVal": {
                //             "attribute": "pw-checker"
                //         }
                //     },
                //     "templateOptions": {
                //         "addonLeft": {
                //             "class": "fa fa-lock"
                //         },
                //         "label": "Confirm password",
                //         "reqValidationMsg": "Please re-enter the" +
                //         " selected password here",
                //         "required": true,
                //         "type": "password"
                //     },
                //     "type": "input"
                // }

            ];
            return fields;
        };

        return {
            "getFields": getFields
        };
    }]);
})(angular);
