(function (angular) {
    "use strict";

    angular.module("dbcheck.journal.formly.fitnessLog", [])

    .factory("dbcheck.journal.formly.fitness_log", [function () {
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
                    "key": "exercise_type",
                    "ngModelElAttrs": {
                        "tabindex" : "1"
                    },
                    "templateOptions": {
                        "label": "Exercise type",
                        "labels": ["name"],
                        "options": [],
                        "optionsResource": "exerciseRoutine",
                        "valueProp": "id",
                        "reqValidationMsg": "This field is required",
                        "required": true
                    },
                    "type": "combobox"
                },
                {
                    "key": "duration",
                    "ngModelElAttrs": {
                        "tabindex": "2"
                    },
                    "defaultValue": "00:30:00",
                    "templateOptions": {
                        "label": "Duration",
                        "required": true,
                        "type": "datetime"
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
