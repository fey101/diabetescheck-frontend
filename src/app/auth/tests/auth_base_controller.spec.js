"use strict";

describe("Unit Test: emr.auth.controllers.authBase", function () {
    var scope, state, rootScope, createController;

    beforeEach(function () {
        module("emr.common.services.query_adapter");
        module("emr.auth.controllers");
        module("emrApp.constants");

        inject(["$controller", "$rootScope", "$state",
            function ($controller, $rootScope, $state) {
                state = $state;
                rootScope = $rootScope;
                scope = rootScope.$new();
                state.params = {"key": "val"};

                createController = function () {
                    var ctrlData = {
                        "$scope": scope,
                        "$state": state
                    };

                    return $controller("emr.auth.controllers.authBase",
                        ctrlData);
                };
            }
        ]);
    });
    it("should have the state params defined in the scope", function () {
        createController();
        expect(scope.params).toEqual(state.params);
    });
    it("should have the year equal the current year", function () {
        createController();
        var year = new Date().getFullYear();
        expect(scope.year).toEqual(year);
    });
});
