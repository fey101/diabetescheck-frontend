(function (angular) {
    "use strict";

    angular.module("dbcheck.planner",[
        "dbcheck.planner.controllers",
        "dbcheck.planner.risktestcontroller",
        "dbcheck.planner.plancontrollers",
        "dbcheck.planner.states",
        "dbcheck.planner.services.formly"
    ]);
})(angular);
