(function (angular) {
    "use strict";

    angular.module("dbcheck.admin.services.registrationTracker", [])

    .service("dbcheck.admin.registrationTracker", [
        "$q", function ($q) {
            var STATES = ["create_account.diabetes_mgt",
            "create_account.related_conditions", "create_account.about_you",
            "create_account.create_profile"];

            var updateState = function (currentState) {
                /*
                * This method gives the next state during patient registratiob
                * process
                */
                var nextState;
                var index = STATES.indexOf(currentState);
                if (index !== (STATES.length - 1)) {
                    nextState = STATES[index + 1];
                } else {
                    nextState = STATES[index];
                }
                return nextState;
            };

            var keepTrack = function (patientID, object) {
                /*
                * This method update the patient resource with the last known
                * registered step to keep track of a patient who has completed
                * registration
                * the `object` param contains the `last_registration_state`
                */
                var nextState = updateState(object.last_registration_state);
                object.last_registration_state = nextState;
                var deferred = $q.defer();
                // patient.update(patientID, object).then(function (data) {
                //     deferred.resolve(data);
                // }, function (err) {
                //     deferred.reject(err);
                // });
                return deferred.promise;
            };

            return {
                "keepTrack": keepTrack,
                "updateState": updateState
            };
        }
    ]);
})(angular);
