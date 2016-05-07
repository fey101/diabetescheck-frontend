(function (angular) {
    "use strict";

    angular.module("dbcheck.journal.formly.glucoseLog", [])

    .factory("dbcheck.journal.formly.log_glucose", [function () {
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
                    "key": "period_taken",
                    "ngModelElAttrs": {
                        "tabindex" : "1"
                    },
                    "templateOptions": {
                        "label": "When was the reading taken?",
                        "labels": ["display"],
                        "options": [
                            {
                                "display": "After 8 hours or more without a meal",
                                "value": "fasting glucose"
                            },
                            {
                                "display": "Before breakfast/ Out of bed",
                                "value": "fasting glucose"
                            },
                            {
                                "display": "Before lunch/supper/dinner",
                                "value": "before meal"
                            },
                            {
                                "display": "After a meal",
                                "value": "after meal"
                            },
                            {
                                "display": "2/3 hours after a meal",
                                "value": "after meal"
                            }
                        ],
                        "valueProp": "value",
                        "reqValidationMsg": "This field is required",
                        "required": true
                    },
                    "type": "combobox"
                },
                // {
                //     "hideExpression":
                //         "model.period_taken !== 'Other'",
                //     "key": "logging_time",
                //     "ngModelElAttrs": {
                //         "tabindex": "2"
                //     },
                //     //todo: create a fn to supply current time
                //     "defaultValue": "time.now",
                //     "templateOptions": {
                //         "label": "How many hours after a meal was reading taken?",
                //         "required": true
                //     },
                //     "type": "timepicker"
                // },
                {
                    "key": "glycemic_index",
                    "ngModelElAttrs": {
                        "tabindex" : "3"
                    },
                    "defaultValue": 100,
                    "templateOptions": {
                        "label": "Blood glucose levels (mg/dl)",
                        "reqValidationMsg": "This field is required",
                        "required": true,
                        "min": 20,
                        "max": 600,
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
    }]);
})(angular);
