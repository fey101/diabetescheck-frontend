"use strict";

describe ("Test emr.common.queryAdapter", function () {
    var queryAdapter, filteringHelper, orderingHelper,
        paginationHelper, searchHelper, partialResponse;

    var resource = {
        "name": "encounter"
    };

    var data = {
        "firstname": "Test",
        "gender": "Male"
    };

    beforeEach (function () {
        module ("emr.common.queryAdapter");
        module ("emr.common.get.params.helpers");
        module ("emr.common.filtering.helpers");
        module ("emr.common.ordering.helpers");
        module ("emr.common.pagination.helpers");
        module ("emr.common.search.helpers");
        module ("emr.common.partials.helpers");
        module ("emr.common.query.paramsCache");
        module("emr.resources.common.jsDataUtils");
        module("emr.resources.common.deserialize_drf");
        module("emr.resources.common.overide_before_validate");
        module ("emr.common.adapter.utils");
        module("emrApp.constants");

        inject (["queryAdapter", "emr.common.filtering.helper",
            "emr.common.ordering.helper", "emr.common.pagination.helper",
            "emr.common.search.helper", "emr.common.partial.response.service",
            function (_queryAdapter, _filteringHelper, _orderingHelper,
                _paginationHelper, _searchHelper, _partialResponse) {
                queryAdapter = _queryAdapter;
                filteringHelper = _filteringHelper;
                orderingHelper = _orderingHelper;
                paginationHelper = _paginationHelper;
                searchHelper = _searchHelper;
                partialResponse = _partialResponse;
            }]);
    });

    it("'handleFiltering()' should not throw if valid resource supplied",
        function () {
            var func = function () {
                queryAdapter.handleFiltering(resource);
            };
            expect(func).not.toThrow();
        });

    it("'handleFiltering()' should throw if invalid resource supplied",
        function () {
            var func = function () {
                queryAdapter.handleFiltering([]);
            };
            expect(func).toThrow();
        });

    it("'handleSorting()' should not throw if valid resource supplied",
        function () {
            var func = function () {
                queryAdapter.handleSorting(resource);
            };
            expect(func).not.toThrow();
        });

    it("'handleSorting()' should throw if invalid resource supplied",
        function () {
            var func = function () {
                queryAdapter.handleSorting([]);
            };
            expect(func).toThrow();
        });

    it("'handlePaging()' should not throw if valid resource supplied",
        function () {
            var func = function () {
                queryAdapter.handlePaging(resource);
            };
            expect(func).not.toThrow();
        });

    it("'handlePaging()' should throw if invalid resource supplied",
        function () {
            var func = function () {
                queryAdapter.handlePaging([]);
            };
            expect(func).toThrow();
        });

    it("'handlePagingPageSize()' should not throw if valid resource supplied",
        function () {
            var func = function () {
                queryAdapter.handlePagingPageSize(resource);
            };
            expect(func).not.toThrow();
        });

    it("'handlePagingPageSize()' should throw if invalid resource supplied",
        function () {
            var func = function () {
                queryAdapter.handlePagingPageSize([]);
            };
            expect(func).toThrow();
        });

    it("'handleSearch()' should not throw if valid resource supplied",
        function () {
            var func = function () {
                queryAdapter.handleSearch(resource);
            };
            expect(func).not.toThrow();
        });

    it("'handleSearch()' should throw if invalid resource supplied",
        function () {
            var func = function () {
                queryAdapter.handleSearch([]);
            };
            expect(func).toThrow();
        });

    it("'handlePartialResponses()' should not throw if valid resource " +
        "supplied", function () {
            var func = function () {
                queryAdapter.handlePartialResponses(resource);
            };
            expect(func).not.toThrow();
        });

    it("'handlePartialResponses()' should throw if invalid resource supplied",
        function () {
            var func = function () {
                queryAdapter.handlePartialResponses([]);
            };
            expect(func).toThrow();
        });

    it("'getData()' should throw if invalid resource supplied",
        function () {
            var func = function () {
                queryAdapter.getData([]);
            };
            expect(func).toThrow();
        });

    it("'getData()' should not throw if valid resource supplied", function () {
        var func = function () {
            queryAdapter.getData(resource);
        };
        expect(func).toThrow();
    });

    it("'createData() is not a function' should be thrown given valid arguments",
        function () {
            var func = function () {
                queryAdapter.createData(resource, data);
            };
            expect(func).toThrow(new Error("resource.create is not a function"));
        });

    it("'createData()' should throw given invalid arguments", function () {
        var func = function () {
            queryAdapter.createData(resource, ["firstname", "gender"]);
        };
        expect(func).toThrow();
    });

    it("'updateData() is not a function' should be thrown given valid arguments",
        function () {
            var func = function () {
                queryAdapter.updateData(resource, 54, data, "PUT");
            };
            expect(func).toThrow(new Error("resource.update is not a function"));
        });

    it("'updateData()' should throw given invalid arguments", function () {
        var func = function () {
            queryAdapter.updateData(resource, 54, ["firstname", "gender"], 8);
        };
        expect(func).toThrow();
    });

    it("'deleteData() is not a function' should be thrown given valid arguments",
        function () {
            var func = function () {
                queryAdapter.deleteData(resource, 54);
            };
            expect(func).toThrow(new Error("resource.destroy is not a function"));
        });

    it("'deleteData()' should throw given invalid arguments", function () {
        var func = function () {
            queryAdapter.deleteData(resource, [54]);
        };
        expect(func).toThrow();
    });
});
