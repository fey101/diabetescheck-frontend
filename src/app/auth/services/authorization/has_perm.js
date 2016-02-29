(function (angular, _) {
    "use strict";

    angular.module("emr.auth.services.authorization.hasPerm", [
        "emr.authentication",
        "emr.auth.services"
    ])

    .factory("emr.authorization.hasPerm",
        ["emr.auth.services.login",
        function (authConfig) {

            return {
                hasPermissions : function (perms) {
                    var user = authConfig.getUser();
                    if (_.isNull(user)) {
                        return false;
                    }
                    var user_perms = _.pluck(user.actions, "actions__name");
                    var want_perms = _.pluck(perms, "name");
                    var union = _.union(user_perms, want_perms);

                    return union.length === user_perms.length;
                }
            };
        }
    ]);
})(angular, _);
