"use strict";

describe ("Test the query adapter helpers service", function () {
    var adapterHelpers, scope, adapter, metadataCache, organisation;

    beforeEach (function () {
        module("emr.common.queryAdapterHelpers");
        module("emr.common.queryAdapter");
        module("emr.resources.common.jsDataUtils");
        module("emr.resources.common.deserialize_drf");
        module("emr.resources.common.overide_before_validate");
        module("emr.common.adapter.utils");
        module("emr.common.pagination.helpers");
        module("emr.common.ordering.helpers");
        module("emr.common.filtering.helpers");
        module("emr.common.search.helpers");
        module("emr.common.partials.helpers");
        module("emr.common.query.paramsCache");
        module("emr.common.get.params.helpers");
        module("emr.resources");
        module("emrApp.constants");

        inject (["emr.common.queryAdapterHelpers", "$rootScope", "queryAdapter",
            "emr.resource.metadataCache", "emr.resource.organisation",
            function (_adapterHelpers, $rootScope, _adapter, _metadataCache,
                org) {
                adapterHelpers = _adapterHelpers;
                scope = $rootScope.$new();
                adapter = _adapter;
                metadataCache = _metadataCache;
                organisation = org;
            }]);
    });

    it("'listRetrieveOKHandler' should return a grid params obj", function () {
        // The adapter expects the scope to have a resource set up
        // Every list controller needs to have a 'resource' on its scope
        scope.resource = organisation;
        var gridParams = {
            filter: adapter.handleFiltering(organisation),
            list: {},
            metadata: metadataCache.get(organisation),
            page_size: adapter.handlePagingPageSize(organisation),
            paginator: adapter.handlePaging(organisation),
            partial: adapter.handlePartialResponses(organisation),
            search: adapter.handleSearch(organisation),
            sorter: adapter.handleSorting(organisation)
        };

        var returnedParams = adapterHelpers.listRetrieveOKHandler(scope, {});
        var returnedKeys = _.keys(returnedParams);

        expect(returnedParams.list).toEqual(gridParams.list);
        expect(returnedKeys).toContain("paginator");
        expect(returnedKeys).toContain("sorter");
        expect(returnedKeys).toContain("filter");
        expect(returnedKeys).toContain("search");
        expect(returnedKeys).toContain("metadata");
        expect(returnedKeys).toContain("partial");
        expect(returnedKeys).toContain("page_size");
    });

    it("'listRetrieveErrorHandler' should throw error", function () {
        var func = function() {
            adapterHelpers.listRetrieveErrorHandler(scope, {});
        };
        expect(func).toThrow();
    });
});
