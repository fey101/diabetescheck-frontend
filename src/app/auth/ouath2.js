(function (angular, _) {
    "use strict";

    angular.module("dbcheck.auth.oauth2", [
        "dbcheck.config",
        "diabetescheck.constants"
    ])

    .factory("api.oauth2",
        ["$window", "$http", "$timeout", "CREDZ", "$q","moment",
        function ($window, $http, $timeout, credentials, $q, moment) {
            var store_key = "auth.token";
            var storage = $window.localStorage;
            var token_timeout = 10 * 1000; // 10 seconds
            var request = null;

            var setXHRToken = function (token) {
                if (_.isUndefined(token) || _.isNull(token)) {
                    return;
                }
                var auth_token = token.token_type + " " + token.access_token;
                $http.defaults.headers.common.Authorization = auth_token;
                jQuery.ajaxSetup({
                    headers: {
                        Authorization: auth_token
                    }
                });
            };

            var storeToken = function (token) {
                setXHRToken(token);
                var till = moment().add(token.expires_in, "seconds");
                token.expire_at = till;
                storage.setItem(store_key, JSON.stringify(token));
                // refresh token before it expires
                $timeout(function () {
                    refreshToken(token);
                }, (parseInt(token.expires_in, 10) * 1000) - token_timeout);
                request = null;
            };

            var requestError = function () {
                request = null;
            };

            var tokenRequest = function (payload) {
                if (!_.isNull(request)) {
                    return request;
                }
                request = $http({
                    data: payload,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    method: "POST",
                    url: credentials.token_url
                }).success(storeToken).error(requestError);
                return request;
            };

            var revokeToken = function (token) {
                storage.removeItem(store_key);

                if (!angular.isObject(token)) {
                    return $q.when(null);
                }
                var payload =
                    "token=" + token.access_token +
                    "&client_id=" + credentials.client_id +
                    "&client_secret=" + credentials.client_secret;

                return $http({
                    data: payload,
                    headers: {
                        "Authorization" : token.token_type + " " +
                        token.access_token,
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    method: "POST",
                    url: credentials.revoke_url
                });
            };

            var refreshToken = function (token) {
                var payload =
                    "grant_type=" + "refresh_token" +
                    "&refresh_token=" + token.refresh_token +
                    "&client_id=" + credentials.client_id +
                    "&client_secret=" + credentials.client_secret;

                return tokenRequest(payload);
            };

            var fetchToken = function (username, password) {
                var payload =
                    "grant_type=" + "password" +
                    "&username=" + username +
                    "&password=" + password +
                    "&client_id=" + credentials.client_id +
                    "&client_secret=" + credentials.client_secret;

                return tokenRequest(payload);
            };

            var getToken = function () {
                var token = JSON.parse(storage.getItem(store_key));
                if (!_.isNull(token)) {
                    if (moment(token.expire_at) > moment()
                        .add(token_timeout, "ms")) {
                        return token;
                    }
                    storage.removeItem(store_key);
                }

                return null;
            };

            return {
                "fetchToken": fetchToken,
                "getToken": getToken,
                "refreshToken": refreshToken,
                "revokeToken": revokeToken,
                "setXHRToken": setXHRToken,
                "storeToken": storeToken
            };
        }
    ]);
})(angular, _);
