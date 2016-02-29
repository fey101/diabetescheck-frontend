(function (angular) {
    "use strict";

    /**
     * inspired by angular's minErr
     */
    function createError (module, err_name) {
        var name = err_name || "Error";
        var creator = function (code, message) {
            var prefix = "[" + (module ? module + ":" : "") + code + "] ";
            var msg = prefix + name + " : " + message;
            return new Error(msg);
        };
        return creator;
    }

    angular.module("dbcheck.exceptions", [])
    .provider("emr.exceptions.Errors", [function () {
        this.$get = [function ( ) {
            return {
                "ImproperlyConfigured": "ImproperlyConfigured",
                "createError": createError
            };
        }];
    }]);

})(angular);
