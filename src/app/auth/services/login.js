(function (angular, _) {
    "use strict";

    angular.module("dbcheck.auth.loginService", [
        "ui.router",
        "dbcheck.config",
        "dbcheck.auth.oauth2",
        "formly"
    ])

    .service("dbcheck.auth.services.login", ["$window", "$q", "api.oauth2","$http",
        "SERVER_URL","USER_INFO_URL", "PASSWORD_RESET", "PASSWORD_RES_CONFIRM",
        "PASSWORD_CHANGE", "Title", "Idle",
        function ($window, $q, oauth2, $http, server_url, curUser,
            rUrl, rUrlCon, changePassUrl, title, idle) {

            var url = {
                curr_user : curUser
            };
            var store_key = "auth.user";
            var store_state = "state.dump";

            var storage = $window.localStorage;

            return {
                changePassword : function (obj) {
                    return $http.post(changePassUrl, obj);
                },
                clearState : function () {
                    return storage.removeItem(store_state);
                },
                currentUser : function () {
                    return $http.get(server_url + url.curr_user)
                        .success(function (data) {
                            storage.setItem(store_key, JSON.stringify(data));
                        });
                },
                dumpState : function (state, params) {
                    var user = this.getUser();
                    if (user) {
                        var state_dump = {
                            "name": state.name,
                            "params": params,
                            "user": user.id
                        };
                        storage.setItem(store_state, JSON.stringify(state_dump));
                    }
                },
                getUser : function() {
                    var user = JSON.parse(storage.getItem(store_key));
                    console.log(storage);
                    console.log(user);
                    return JSON.parse(storage.getItem(store_key));
                },
                isLoggedIn : function () {
                    var user = this.getUser();
                    var has_token = oauth2.getToken();
                    return (!_.isNull(user)) && (!_.isNull(has_token));
                },
                loadState : function () {
                    var user = this.getUser();
                    var dump = JSON.parse(storage.getItem(store_state));
                    if (user && dump) {
                        if (dump.user === user.id) {
                            return {
                                "name": dump.name,
                                "params": dump.params
                            };
                        }
                    }
                    return null;
                },
                login : function (user) {
                    return oauth2.fetchToken(user.username, user.password);
                },
                logout : function () {
                    storage.removeItem(store_key);
                    return oauth2.revokeToken(oauth2.getToken());
                },
                resetPassword : function (email) {
                    return $http.post(rUrl, {email: email});
                },

                resetPasswordConfirm : function (obj) {
                    return $http.post(rUrlCon, obj);
                },
                startTimeout : function () {
                    if (this.isLoggedIn()) {
                        idle.watch();
                        title.restore();
                    }
                },
                stopTimeout : function () {
                    idle.unwatch();
                }
            };
        }
    ]);
})(angular, _);
