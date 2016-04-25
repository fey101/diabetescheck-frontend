(function(angular) {
    "use strict";
    angular.module("dbcheck.admin.services.registrationData", [])
    .factory("registrationData", function() {
        var registrationData = {};

        return {
            setWhatToMange: function(toManage) {
                _.extend(registrationData, toManage);
            },
            setRelatedConditions: function(relatedConditions) {
                _.extend(registrationData, relatedConditions);
            },
            setAboutYou: function(aboutYou) {
                _.extend(registrationData, aboutYou);
            },
            setProfile: function(profile) {
                _.extend(registrationData, profile);
            },
            getData: function() {
                return registrationData;
            }
        };
    });
})(angular);
