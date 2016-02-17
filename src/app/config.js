(function (angular) {
    "use strict";

    angular.module("dbcheck.config", [
        "ui.router"
    ])
    /** contains the available homepages that a user can be redirected to.
     *  the list is also in order of preference whereby if a user is found
     *  to have actions for a particular page then the checking stops and
     *  the are redirected to that page
     */
    .constant("AVAILABLE_HOMEPAGES", [
        "journal", "planner", "recipe", "community", "admin"
    ])

    .constant("PAGINATION_COUNT", 30)
    .constant("USER_INFO_URL", window.DBCHECK_SETTINGS.AUTH.USER_INFO_URL)
    .constant("SERVER_URL", window.DBCHECK_SETTINGS.SERVER_URL)
    .constant("CREDZ", window.DBCHECK_SETTINGS.CREDZ)
    // .constant("SEARCH_URL", window.DBCHECK_SETTINGS.SEARCH_URL)
    .constant("USER_PROFILE", window.DBCHECK_SETTINGS.AUTH.SERVER_DOMAIN +
        window.DBCHECK_SETTINGS.AUTH.USER_PROFILE)

    .constant("TIMEOUT", window.DBCHECK_SETTINGS.TIMEOUT)
    .constant("ACTIONS.RESTRICT", window.DBCHECK_SETTINGS.ACTIONS.RESTRICT)
    // .constant("ACTIONS.CHECKERS", [
    //     "emr.actions.actionChecker",
    //     "emr.authorization.actionChecker"
    // ])

    .config(["formlyConfigProvider", function (formlyConfigProvider) {
        // set flag to the opposite value of DEBUG,
        // i.e. if `true` it will be `false`
        var flag = !window.DBCHECK_SETTINGS.DEBUG;

        // Disable formly warnings in prod and enable in dev
        formlyConfigProvider.disableWarnings = flag;

        // Disable apiCheck warnings in prod and enable in dev
        // apiCheck is a global variable use window to access it
        window.apiCheck.globalConfig.disabled = flag;
    }])

    .config(["$urlRouterProvider", function($urlRouterProvider) {
        $urlRouterProvider.otherwise("/");
    }])

    .config(["$locationProvider", function ($locationProvider) {
        $locationProvider.html5Mode(true);
    }])

    .config(["$httpProvider", function ($httpProvider) {
        $httpProvider.defaults.xsrfHeaderName = "X-CSRFToken";
        $httpProvider.defaults.xsrfCookieName = "csrftoken";
        $httpProvider.defaults.headers.common = {
            "Content-Type": "application/json",
            "Accept": "application/json, */*"
        };

        /**
         * This is an $http interceptor to decorate the url encoding that
         * angular uses to encode url characters e.g from + to %2B. We need
         * the decoded urls to work well with api queries. The original
         * function is only put back when the response comes back, so this
         * change is global (!!) while the request is ongoing.
        **/
        $httpProvider.interceptors.push(function() {
            var realEncodeURIComponent = window.encodeURIComponent;
            return {
                "request": function(config) {
                    window.encodeURIComponent = function(input) {
                        return realEncodeURIComponent(input).split(
                            "%2B").join("+");
                    };
                    // Incase of a promise: return config || $q.when(config);
                    return config;
                },
                "response": function(config) {
                    window.encodeURIComponent = realEncodeURIComponent;
                    // Incase of a promise: return config || $q.when(config);
                    return config;
                }
            };
        });
    }])

    // .run(["emr.resource.overideBeforeValidate", "emr.resource.deserializeDRF",
    //     "DSHttpAdapter", "SERVER_URL",
    //     function (overide, desDrf, httpAdapter, SERVER_URL) {
    //         httpAdapter.defaults.deserialize = desDrf.deserializeFunc;
    //         overide.beforeValidate();
    //         httpAdapter.defaults.basePath = SERVER_URL;
    //         httpAdapter.defaults.forceTrailingSlash = true;
    //         httpAdapter.defaults.log = false;
    //     }
    // ])

    // .run(["emr.actions.pageChecker", function (pageChecker) {
    //         pageChecker.startListening();
    //     }
    // ])

    // .run(["emr.common.formly.formlyConfig", function (formlyConfig) {
    //     formlyConfig.formlyConfigs();
    //     formlyConfig.setType();
    //     formlyConfig.setWrapper();
    // }])

    .run(["formlyValidationMessages", function (formlyValidationMessages) {
        formlyValidationMessages.addTemplateOptionValueMessage(
            "required", "reqValidationMsg", "", "", "Value Required");
        formlyValidationMessages.addTemplateOptionValueMessage(
            "email", "emailValidationMsg", "", "", "Valid Email Required");
        formlyValidationMessages.addTemplateOptionValueMessage(
            "minlength", "minlengthValidationMsg", "", "", "Too Short");
        formlyValidationMessages.addTemplateOptionValueMessage(
            "maxlength", "maxlengthValidationMsg", "", "", "Too Long");
    }]);

    // .run(["api.oauth2",function (oauth2) {
    //     oauth2.setXHRToken(oauth2.getToken());
    // }]);
})(angular, _);