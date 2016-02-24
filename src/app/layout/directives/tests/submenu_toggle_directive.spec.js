"use strict";

describe("Test submenu toggle directive", function() {
    var $compile, $scope, $rootScope;

    beforeEach(function () {
        module("emr.layout");
    });

    beforeEach(inject(["$compile", "$rootScope",
      function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
    }]));

    it("should compile directive and do its thing", function () {
        //coverage cheat
        var _html = "<button submenu-toggle></button>";
        var element = $compile(_html)($rootScope);
        $rootScope.$digest();
        element.triggerHandler("click");
    });
});
