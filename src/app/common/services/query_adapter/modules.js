(function (angular) {
    "use strict";

    angular.module("emr.common.services.query_adapter", [
        "emr.common.adapter.utils",
        "emr.common.get.params.helpers",
        "emr.common.pagination.helpers",
        "emr.common.ordering.helpers",
        "emr.common.filtering.helpers",
        "emr.common.search.helpers",
        "emr.common.partials.helpers",
        "emr.common.queryAdapterHelpers",
        "emr.common.queryAdapter",
        "emr.common.query.paramsCache",
        "emr.common.adapter.fetch_data"
    ]);
})(angular);
