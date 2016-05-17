(function (angular) {
    "use strict";

    angular.module("dbcheck.planner.services.formly", [])

    .factory("dbcheck.planner.formly.user_targets", [function () {
        /*
        *   Defining forms fields this way(other than puting them in a JSON file)
        *   enables us to take advantage of the full power of angular-formly
        *   and use it's validation that is easily implemented using JS
        */
        var getFields = function () {
            var fields = [
                {
                    "key": "caloric_target",
                    "ngModelElAttrs": {
                        "tabindex" : "1"
                    },
                    "defaultValue": 2200,
                    "templateOptions": {
                        "label": "Recommended caloric limit PER DAY(on average)",
                        "required": true,
                        "reqValidationMsg": "This field is required",
                        "min": 0,
                        "type": "number"
                    },
                    "type": "input"
                },
                {
                    "key": "cholestrol_target",
                    "ngModelElAttrs": {
                        "tabindex" : "2"
                    },
                    "defaultValue": 200,
                    "templateOptions": {
                        "label": "Recommended cholestrol limit(mg/dl) PER DAY",
                        "reqValidationMsg": "This field is required",
                        "required": true,
                        "min": 0,
                        "max": 1000,
                        "type": "number"
                    },
                    "type": "input"
                }
            ];
            return fields;
        };

        return {
            "getFields": getFields
        };
    }])
    .factory("dbcheck.planner.formly.riskTest", [function () {

        var getFields = function () {
            var fields = [
                {
                    "key": "diabetic_relatives",
                    "ngModelElAttrs": {
                        "tabindex" : "1"
                    },
                    "templateOptions": {
                        "label": "Do any relatives of yours suffer from diabetes?",
                        "options": [
                            {
                                "name": "No",
                                "value": 0
                            },
                            {
                                "name": "Yes, near relatives like parents," +
                                    " children, siblings",
                                "value": 5
                            },
                            {
                                "name": "Yes, far relatives like grand-parents," +
                                    " aunts, uncles, cousins",
                                "value": 3
                            }
                        ],
                        "required": true
                    },
                    "type": "radio"
                },
                {
                    "key": "waist_circumference in centimetres(cm)",
                    "ngModelElAttrs": {
                        "tabindex" : "2"
                    },
                    "defaultValue": 30,
                    "templateOptions": {
                        "label": "What is the circumference of the waist" +
                            " at the belly button?",
                        "min": 10,
                        "required": true,
                        "type": "number"
                    },
                    "type": "input"
                },
                {
                    "key": "fruits_intake",
                    "ngModelElAttrs": {
                        "tabindex" : "3"
                    },
                    "templateOptions": {
                        "label": "How often do you eat fruits, vegetables" +
                            " or wholemeal bread?",
                        "options": [
                            {
                                "name": "Every day",
                                "value": 0
                            },
                            {
                                "name": "Not every day",
                                "value": 2
                            }
                        ],
                        "required": true
                    },
                    "type": "radio"
                },
                {
                    "key": "high_sugar",
                    "ngModelElAttrs": {
                        "tabindex" : "4"
                    },
                    "templateOptions": {
                        "label": "Did you ever have high blood glucose" +
                            " values during a health check?",
                        "options": [
                            {
                                "name": "No",
                                "value": 0
                            },
                            {
                                "name": "Yes",
                                "value": 2
                            }
                        ],
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
    }]);
})(angular);
