(function (angular, _) {
    "use strict";

    angular.module("emr.common.adapter.fetch_data", [])

    .service("emr.common.adapter.fetchDataService", [
        "queryAdapter", "emr.common.queryAdapterHelpers",
        "emr.common.query.paramsCache",
        function (adapter, helpers, paramsCache) {
            this.getData = function (scope, resource, params) {
                params = params || "";
                if (!_.isEmpty(params) && !_.isNull(params)) {
                    paramsCache.updatePartialResponseConfig(resource, params);
                }
                adapter.getData(resource).then(
                    _.partial(helpers.listRetrieveOKHandler, scope),
                    _.partial(helpers.listRetrieveErrorHandler, scope)
                );
            };
        }
    ]);
})(angular, _);
