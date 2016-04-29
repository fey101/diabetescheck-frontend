(function (angular) {
    "use strict";

    angular
    .module("dbcheck.resources.admin.linkAdminThings", [
        "dbcheck.resources.admin.users",
        "dbcheck.resources.journal.persons",
        "dbcheck.resources.journal.healthDetails"
    ])

    .factory("dbcheck.resource.linkAdminThings", [
        "dbcheck.resources.users",
        "dbcheck.resources.person",
        "dbcheck.resources.healthDetails",
        function (usersResource, personResource,
                healthDetailsResource
            ) {

            return {
                person: personResource,
                user: usersResource,
                healthDetail: healthDetailsResource
            };
        }
    ]);

}) (angular);
