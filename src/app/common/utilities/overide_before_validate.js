(function (angular, _) {
    "use strict";

    angular.module("dbcheck.common.utilities.overide_before_validate",[
        "dbcheck.config",
        "dbcheck.auth.services",
        "dbcheck.common.utilities.jsDataUtils"
    ])

    .factory("dbcheck.resource.overideBeforeValidate",
    ["DS", function (DS) {

        return {
            beforeValidate : function () {
                DS.beforeValidate = function (resourceName, resource, data, cb) {
                    var err = {};
                    if (_.isEmpty(err)) {
                        cb(null, data);
                    } else {
                        cb(err);
                    }
                };
            }
        };
    }]);
})(angular, _);
