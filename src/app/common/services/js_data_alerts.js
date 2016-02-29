(function (angular) {
    "use strict";

    angular.module("dbcheck.common.services.js_data_alerts", [])

    .service("dbcheck.common.service.js_data_alerts", [function () {
        /**
        *   This service defines various alerts types for the application.
        **/

        var buttonType = ["success", "danger", "info", "warning"];
        this.showMsg = function (message, title, type) {
            return {"msg": message, "title": title, "type": type};
        };
        this.showOk = function(message, title) {
            return this.showMsg(message, title, buttonType[0]);
        };

        this.showErr = function(message, title) {
            return this.showMsg(message, title, buttonType[1]);
        };

        this.showInfo = function(message, title) {
            return this.showMsg(message, title, buttonType[2]);
        };

        this.showWarning = function(message, title) {
            return this.showMsg(message, title, buttonType[3]);
        };

    }]);
}) (angular);
