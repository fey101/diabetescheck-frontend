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
                    "defaultValue": 100,
                    "templateOptions": {
                        "label": "Targeted caloric value",
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
                    "defaultValue": 100,
                    "templateOptions": {
                        "label": "Targeted cholestrol levels (mg/dl)",
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
    }]);
})(angular);
