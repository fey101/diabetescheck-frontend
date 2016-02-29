(function () {
    "use strict";

    describe("Test authentication module", function () {

        beforeEach(function () {
            module("ui.router");
            module("emr.common.services.query_adapter");
            module("emr.authentication");
            module("emrApp.constants");
        });

        describe("Testing pageUserRequired", function () {
            var authConfig, $state;
            beforeEach(function () {
                inject(["emr.auth.services.login", "$state",
                    function (ac, _$state_) {
                        authConfig = ac;
                        $state = _$state_;
                    }]);
            });

            it("should allow with user and requireuser is undefined",
                function () {
                    spyOn(authConfig, "isLoggedIn").and.returnValue(true);
                    inject(["emr.authentication.pageUserRequired",
                        function (pur) {
                            var params = {};
                            var val = pur.canView(null, params);
                            expect(val).toBe(true);
                            expect(authConfig.isLoggedIn).toHaveBeenCalled();
                        }]);
                });

            it("should allow with user and requireuser is true", function () {
                spyOn(authConfig, "isLoggedIn").and.returnValue(true);
                inject(["emr.authentication.pageUserRequired", function (pur) {
                    var params = {
                        requireUser: true
                    };
                    var val = pur.canView(null, params);
                    expect(val).toBe(true);
                    expect(authConfig.isLoggedIn).toHaveBeenCalled();
                }]);
            });

            it("should allow with user and requireuser is false", function () {
                spyOn(authConfig, "isLoggedIn").and.returnValue(true);
                inject(["emr.authentication.pageUserRequired", function (pur) {
                    var params = {
                        requireUser: false
                    };
                    var val = pur.canView(null, params);
                    expect(val).toBe(true);
                    expect(authConfig.isLoggedIn).toHaveBeenCalled();
                }]);
            });

            it("should allow with user and requireuser is not bool",
                function () {
                    spyOn(authConfig, "isLoggedIn").and.returnValue(true);
                    inject(["emr.authentication.pageUserRequired",
                        function (pur) {
                            var params = {
                                requireUser: "kaa"
                            };
                            var val = pur.canView(null, params);
                            expect(val).toBe(true);
                            expect(authConfig.isLoggedIn).toHaveBeenCalled();
                        }]);
                });

            it("should deny without user and requireuser is undefined",
                function () {
                    spyOn(authConfig, "isLoggedIn").and.returnValue(false);
                    inject(["emr.authentication.pageUserRequired",
                        function (pur) {
                            var params = {};
                            var val = pur.canView(null, params);
                            expect(val).toBe(false);
                            expect(authConfig.isLoggedIn).toHaveBeenCalled();
                        }]);
                });

            it("should deny without user and requireuser is true",
                function () {
                    spyOn(authConfig, "isLoggedIn").and.returnValue(false);
                    inject(["emr.authentication.pageUserRequired",
                        function (pur) {
                            var params = {
                                requireUser: true
                            };
                            var val = pur.canView(null, params);
                            expect(val).toBe(false);
                            expect(authConfig.isLoggedIn).toHaveBeenCalled();
                        }]);
                });

            it("should allow without user and requireuser is false",
                function () {
                    spyOn(authConfig, "isLoggedIn").and.returnValue(false);
                    inject(["emr.authentication.pageUserRequired",
                        function (pur) {
                            var params = {
                                requireUser: false
                            };
                            var val = pur.canView(null, params);
                            expect(val).toBe(true);
                            expect(authConfig.isLoggedIn).toHaveBeenCalled();
                        }]);
                });

            it("should deny without user and requireuser is not bool",
                function () {
                    spyOn(authConfig, "isLoggedIn").and.returnValue(false);
                    inject(["emr.authentication.pageUserRequired",
                        function (pur) {
                            var params = {
                                requireUser: "kaa"
                            };
                            var val = pur.canView(null, params);
                            expect(val).toBe(false);
                            expect(authConfig.isLoggedIn).toHaveBeenCalled();
                        }]);
                });

            it("should test if a checkFailed", function () {
                spyOn($state, "go");
                inject(["emr.authentication.pageUserRequired", function (fail) {
                    fail.checkFailed();
                    expect($state.go).toHaveBeenCalledWith("auth_login");
                }]);
            });

            it("should set next state", function () {
                spyOn($state, "go");
                spyOn(authConfig, "dumpState");
                inject(["emr.authentication.pageUserRequired", function (fail) {
                    var toState = "some_state";
                    var toParams = {};
                    fail.checkFailed(toState, toParams);
                    expect($state.go).toHaveBeenCalledWith("auth_login");
                    expect(authConfig.dumpState).toHaveBeenCalledWith(
                        toState, toParams);
                }]);
            });
        });
        describe("emr.authentication.isInitial", function () {
            var authConfig, $state;
            beforeEach(function () {
                inject(["emr.auth.services.login", "$state",
                    function (ac, _$state_) {
                        authConfig = ac;
                        $state = _$state_;
                    }]);
            });

            it("should allow when user has the ``is_initial`` field as false",
                function () {
                    spyOn(authConfig, "isLoggedIn").and.returnValue(true);
                    spyOn(authConfig, "getUser").and.returnValue({
                        "is_initial": false});
                    inject(["emr.authentication.isInitial",
                        function (initial) {
                            var params = {};
                            var val = initial.canView(null, params);
                            expect(val).toBe(true);
                            expect(authConfig.isLoggedIn).toHaveBeenCalled();
                            expect(authConfig.getUser).toHaveBeenCalled();
                        }]);
                });
            it("should always allow permissions when ``showErrorPage`` is false",
                function () {
                    spyOn(authConfig, "isLoggedIn").and.returnValue(true);
                    spyOn(authConfig, "getUser").and.returnValue({
                        "is_initial": true});
                    inject(["emr.authentication.isInitial",
                        function (initial) {
                            var params = {
                                showErrorPage: false
                            };
                            var val = initial.canView(null, params);
                            expect(val).toBe(true);
                        }]);
                });
            it("should always deny permissions when ``showErrorPage`` is true" +
            " the user is logged in and ``is_inital`` is true",
                function () {
                    spyOn(authConfig, "isLoggedIn").and.returnValue(true);
                    spyOn(authConfig, "getUser").and.returnValue({
                        "is_initial": true});
                    inject(["emr.authentication.isInitial",
                        function (initial) {
                            var params = {
                                showErrorPage: true
                            };
                            var val = initial.canView(null, params);
                            expect(val).toBe(false);
                            expect(authConfig.isLoggedIn).toHaveBeenCalled();
                            expect(authConfig.getUser).toHaveBeenCalled();
                        }]);
                });

            it("should deny when user has the ``is_initial`` field as true",
                function () {
                    spyOn(authConfig, "isLoggedIn").and.returnValue(true);
                    spyOn(authConfig, "getUser").and.returnValue({
                        "is_initial": true});
                    inject(["emr.authentication.isInitial",
                        function (initial) {
                            var params = {};
                            var val = initial.canView(null, params);
                            expect(val).toBe(false);
                            expect(authConfig.isLoggedIn).toHaveBeenCalled();
                            expect(authConfig.getUser).toHaveBeenCalled();
                        }]);
                });

            it("should return false if the user is not loggedIn",
                function () {
                    spyOn(authConfig, "isLoggedIn").and.returnValue(false);
                    inject(["emr.authentication.isInitial",
                        function (initial) {
                            var params = {};
                            var val = initial.canView(null, params);
                            expect(val).toBe(true);
                            expect(authConfig.isLoggedIn).toHaveBeenCalled();
                        }]);
                });
            it("test checkFailed: that is should redirect to ``auth_403`` state",
                function () {
                    spyOn($state, "go");
                    inject(["emr.authentication.isInitial", function (fail) {
                        fail.checkFailed();
                        expect($state.go).toHaveBeenCalled();
                    }]);
                });
        });
        describe("emr.authentication.hasOrganisation", function () {
            var authConfig, $state;
            beforeEach(function () {
                inject(["emr.auth.services.login", "$state",
                    function (ac, _$state_) {
                        authConfig = ac;
                        $state = _$state_;
                    }]);
            });

            it("should allow when user has the ``organisation`` field as exists",
                function () {
                    spyOn(authConfig, "isLoggedIn").and.returnValue(true);
                    spyOn(authConfig, "getUser").and.returnValue({
                        "organisation": "org"});
                    inject(["emr.authentication.hasOrganisation",
                        function (organisation) {
                            var params = {};
                            var val = organisation.canView(null, params);
                            expect(val).toBe(true);
                            expect(authConfig.isLoggedIn).toHaveBeenCalled();
                            expect(authConfig.getUser).toHaveBeenCalled();
                        }]);
                });
            it("should always allow permissions when ``showErrorPage`` is false",
                function () {
                    spyOn(authConfig, "isLoggedIn").and.returnValue(true);
                    spyOn(authConfig, "getUser").and.returnValue({
                        "organisation": "org"});
                    inject(["emr.authentication.hasOrganisation",
                        function (organisation) {
                            var params = {
                                showErrorPage: false
                            };
                            var val = organisation.canView(null, params);
                            expect(val).toBe(true);
                        }]);
                });
            it("should always deny permissions when ``showErrorPage`` is true" +
            " the user is logged in and ``organisation`` exists",
                function () {
                    spyOn(authConfig, "isLoggedIn").and.returnValue(true);
                    spyOn(authConfig, "getUser").and.returnValue({
                        "organisation": "org"});
                    inject(["emr.authentication.hasOrganisation",
                        function (organisation) {
                            var params = {
                                showErrorPage: true
                            };
                            var val = organisation.canView(null, params);
                            expect(val).toBe(true);
                            expect(authConfig.isLoggedIn).toHaveBeenCalled();
                            expect(authConfig.getUser).toHaveBeenCalled();
                        }]);
                });

            it("should deny when user has the ``organisation`` field null",
                function () {
                    spyOn(authConfig, "isLoggedIn").and.returnValue(true);
                    spyOn(authConfig, "getUser").and.returnValue({
                        "organisation": null});
                    inject(["emr.authentication.hasOrganisation",
                        function (organisation) {
                            var params = {};
                            var val = organisation.canView(null, params);
                            expect(val).toBe(false);
                            expect(authConfig.isLoggedIn).toHaveBeenCalled();
                            expect(authConfig.getUser).toHaveBeenCalled();
                        }]);
                });

            it("should return true if the user is not loggedIn",
                function () {
                    spyOn(authConfig, "isLoggedIn").and.returnValue(false);
                    inject(["emr.authentication.hasOrganisation",
                        function (organisation) {
                            var params = {};
                            var val = organisation.canView(null, params);
                            expect(val).toBe(true);
                            expect(authConfig.isLoggedIn).toHaveBeenCalled();
                        }]);
                });
            it("test checkFailed: that is should redirect to ``auth_403`` state",
                function () {
                    spyOn($state, "go");
                    inject(["emr.authentication.hasOrganisation",
                        function (fail) {
                            fail.checkFailed();
                            expect($state.go).toHaveBeenCalled();
                        }]);
                });
        });
    });

})(angular, window.moment);
