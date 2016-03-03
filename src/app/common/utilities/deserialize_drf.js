(function (angular) {
    "use strict";

    angular.module("dbcheck.common.utilities.deserialize_drf",[
        "dbcheck.config",
        "dbcheck.common.utilities.jsDataUtils",
        // "dbcheck.common.utilities.deserialize_drf",
        "dbcheck.common.utilities.overide_before_validate"
    ])

    .factory("dbcheck.resource.deserializeDRF", ["dbcheck.resource.metadataCache",
        function (metadataCache) {
            return {
                deserializeFunc : function(resource, results) {
                    // dont cache data on delete requests

                    if (results.status !== 204) {
                        metadataCache.add(resource, results);
                    }
                    if (angular.isDefined(results.data) &&
                        angular.isDefined(results.data.results)) {
                        return results.data.results;
                    }
                    return results.data;
                }
            };
        }]);
})(angular);
