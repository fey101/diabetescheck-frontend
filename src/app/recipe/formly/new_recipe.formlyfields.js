(function (angular) {
    "use strict";

    angular.module("dbcheck.recipes.services.formly", [])

    .factory("dbcheck.recipe.formly.new_recipe", [function () {
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
                    "key": "name",
                    "ngModelElAttrs": {
                        "tabindex" : "1"
                    },
                    "templateOptions": {
                        "label": "Recipe name",
                        "reqValidationMsg": "Please provide a Recipe name",
                        "required": true,
                        "type": "text"
                    },
                    "type": "input"
                },
                {
                    "key": "description",
                    "ngModelElAttrs": {
                        "tabindex" : "2"
                    },
                    "templateOptions": {
                        "label": "Description",
                        "required": false,
                        "type": "text"
                    },
                    "type": "input"

                },
                {
                    "key": "instructions",
                    "ngModelElAttrs": {
                        "tabindex" : "3"
                    },
                    "templateOptions": {
                        "label": "Cooking instructions",
                        "reqValidationMsg":
                            "Please provide the Cooking instructions",
                        "required": true,
                        "type": "text"
                    },
                    "type": "textarea"
                },
                {
                    "key": "prep_time",
                    "ngModelElAttrs": {
                        "tabindex" : "4"
                    },
                    "templateOptions": {
                        "label": "Prep time",
                        "reqValidationMsg": "Please provide the time it" +
                            " takes to get recipe ready",
                        "required": true,
                        "type": "time"
                    },
                    "type": "timepicker"
                },
                {
                    "key": "serving",
                    "ngModelElAttrs": {
                        "tabindex" : "5"
                    },
                    "defaultValue": 1,
                    "templateOptions": {
                        "label": "Serving",
                        "reqValidationMsg":
                            "Please provide the number of people this recipe serves",
                        "required": true,
                        "min": 1,
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
