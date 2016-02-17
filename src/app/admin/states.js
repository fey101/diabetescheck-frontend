(function (angular) {
    "use strict";
    angular.module("dbcheck.admin.routes", ["ui.router"])

    .config(function config($stateProvider) {
        $stateProvider
            .state("admin", {
                url: "/admin",
                controller: "dbcheck.admin.controllers.setup",
                templateUrl: "/admin/tpls/admin_setup.tpl.html"
            });
    });
})(angular);
