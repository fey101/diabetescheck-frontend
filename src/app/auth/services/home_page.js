(function (angular, _) {
    "use strict";

    angular.module("dbcheck.auth.homePageService", [])

    .factory("dbcheck.auth.services.homePage", ["AVAILABLE_HOMEPAGES",
        "dbcheck.auth.services.login", function (homePages,loginServ) {
        /**
         * @description A service that use the actions that a user has to
         * determine the homepage for a user. The service performs a cascade
         * starting with the common actions as in moves to the rare ones
         */

        var determineHomePage = function () {
            if (loginServ.isLoggedIn()) {
                var currUser = loginServ.getUser();
                var actions = _.pluck(currUser.actions, "actions__name");
                for ( var i = 0; i < homePages.length; i++) {
                    var homePageActs = viewAct[homePages[i]];
                    var result = _.intersection(homePageActs, actions);
                    if (!_.isEmpty(result)) {
                        return homePages[i];
                    }
                }
                return "auth_403";
            }
            return "auth_login";
        };

        return {
            "determineHomePage": determineHomePage
        };
    }]);
})(angular, _);
