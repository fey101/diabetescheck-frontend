(function (angular) {
    "use strict";

    angular.module("dbcheck.journal.formly.medicationLog", [])

    .factory("dbcheck.journal.formly.log_medication", [function () {
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
                        "labels": ["value"],
                        "options": [
                            {"value": "Before breakfast"},
                            {"value": "Before Lunch"},
                            {"value": "Before supper/dinner"},
                            {"value": "Before going to bed"},
                            {"value": "Other"}
                        ],
                        "valueProp": "value",
                        "reqValidationMsg": "This field is required",
                        "required": true
                    },
                    "type": "combobox"
                },
                {
                    "hideExpression":
                        "model.period_taken !== 'Other'",
                    "key": "logging_time",
                    "ngModelElAttrs": {
                        "tabindex": "2"
                    },
                    //todo: create a fn to supply current time
                    "defaultValue": "time.now",
                    "templateOptions": {
                        "label": "How many hours after a meal was reading taken?",
                        "required": true
                    },
                    "type": "timepicker"
                }
            ];
            return fields;
        };

        return {
            "getFields": getFields
        };
    }]);
})(angular);
