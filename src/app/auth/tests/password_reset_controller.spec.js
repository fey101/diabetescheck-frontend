"use strict";

describe("Unit Test: emr.auth.controllers.passwordReset", function () {
    var scope, state, createController, loginService, rootScope, httpBackend;
    var resetUrl;
    beforeEach(function () {
        module("ui.router");
        module("emr.auth.services");
        module("emr.auth.controllers");
        module("emr.common.services.query_adapter");
        module("emr.auth.formly.reset_email");
        module("emr.authorization");
        module("emr.common.errorMessages");
        module("emrApp.constants");

        inject(["$controller", "$rootScope", "$state",
            "emr.auth.services.login", "$httpBackend", "PASSWORD_RESET",
            function ($controller, $rootScope, $state, login, $httpBackend,
                resUrl) {

                state = $state;
                loginService = login;
                rootScope = $rootScope;
                scope = rootScope.$new();
                httpBackend = $httpBackend;
                resetUrl = resUrl;

                createController = function () {
                    var ctrlData = {
                        "$scope": scope,
                        "$state": state,
                        "emr.auth.services.login": loginService
                    };

                    return $controller("emr.auth.controllers." +
                            "passwordReset", ctrlData);
                };
            }
        ]);
    });

    it("should prompt user to correct an invalid form", function () {
        scope.resetForm = {};
        createController();

        scope.resetForm.$valid = false;
        scope.submitEmail();
        var err = "Please correct the errors on" +
            " the form to reset your password";
        expect(scope.alert.msg[0].Error).toEqual(err);
    });

    it("should post the users email", function () {
        spyOn(state, "go");
        scope.resetForm = {};
        createController();
        var test_data = {
            email: "you@me.com"
        };
        httpBackend.expectPOST(resetUrl)
            .respond(200, test_data);

        scope.resetForm.$valid = true;

        scope.resetModel = test_data;
        scope.submitEmail();
        httpBackend.flush();
        expect(state.go).toHaveBeenCalledWith("auth_login", {
            reset_password: true
        });
    });
    it("should call backend and post users email: fail",
        function () {
            scope.resetForm = {};
            createController();
            scope.resetForm.$valid = true;
            scope.resetModel = {
                email: "you@me.com"
            };
            scope.submitEmail();
            httpBackend.expectPOST(resetUrl).respond(400,
                new Error());

            httpBackend.flush();
            expect(scope.alert.msg[0].Error).not.toEqual("");
        }
    );

});
