"use strict";

describe ("Test the partial_response_helpers service", function () {
    var partialsHelper;

    beforeEach (function () {
        module("emr.common.partials.helpers");
        module("emr.common.query.paramsCache");
        module("emr.resources.common.jsDataUtils");
        module("emr.resources.common.deserialize_drf");
        module("emr.resources.common.overide_before_validate");
        module("emr.common.adapter.utils");
        module("emrApp.constants");

        inject (["emr.common.partial.response.service",
            function (_partialsHelper) {
                partialsHelper = _partialsHelper;
            }]);
    });

    it ("Should verify valid resource", function () {
        var resource = {
            "name": "encounter"
        };
        var func = function () {
            partialsHelper.getPartialResponse(resource);
        };
        expect(func).not.toThrow();
    });

    it("Should throw for an invalid resource supplied", function () {
        var resource = {
            "random": "stuff"
        };
        var func = function () {
            partialsHelper.getPartialResponse(resource);
        };
        expect(func).toThrow();
    });

    it("Should throw if resource is not an obj", function () {
        var resource = "random stuff";
        var func = function () {
            partialsHelper.getPartialResponse(resource);
        };
        expect(func).toThrow();
    });

    it ("Should return an object of pre-evaluated keys", function () {
        var resource = {
            "name": "encounter"
        };
        expect(partialsHelper.getPartialResponse(resource)
            .hasOwnProperty("getPartialResponseConfig")).toBeTruthy();
        expect(partialsHelper.getPartialResponse(resource)
            .hasOwnProperty("getResourceParams")).toBeTruthy();
        expect(partialsHelper.getPartialResponse(resource)
            .hasOwnProperty("removePartialsResponseConfig")).toBeTruthy();
        expect(partialsHelper.getPartialResponse(resource)
            .hasOwnProperty("updatePartialResponse")).toBeTruthy();
        expect(partialsHelper.getPartialResponse(resource)
            .hasOwnProperty("removePartialsResponse")).toBeTruthy();
    });
});
