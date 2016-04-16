(function (angular) {
    "use strict";

    angular.module("dbcheck.journal.services", [])

    .factory("dbcheck.journal.service", [
        "dbcheck.auth.services.login", function (loginservice) {

            var findParams = function (period, sugarLevel) {
                var user = loginservice.getUser();
                var isDiabetic = user.person.person_health.diabetic;
                var params;
                if (period === "fasting glucose") {
                    if (sugarLevel < 50) {
                        params = {
                            period: "fasting glucose",
                            sugarLevel: "0-49"
                        };

                    }
                    else if (sugarLevel < 70) {
                        params = {
                            period: "fasting glucose",
                            sugarLevel: "50-69"
                        };
                    }
                    else if (sugarLevel >= 70 && sugarLevel <= 110) {
                        params = {
                            period: "fasting glucose",
                            sugarLevel: "70-110"
                        };

                    }
                    else if (sugarLevel > 110 && isDiabetic) {
                        params = {
                            period: "fasting glucose",
                            sugarLevel: "110-300",
                            diabetic: "true"
                        };
                    }
                    else if (sugarLevel > 110 && !isDiabetic) {
                        params = {
                            period: "fasting glucose",
                            sugarLevel: "110-300",
                            diabetic: "false"
                        };
                    }

                }
                else if (sugarLevel < 70) {
                    params = {
                        period: "any",
                        sugarLevel: "0-69"
                    };

                }
                else if (period === "before meal") {
                    if (sugarLevel >= 70 && sugarLevel <= 110) {
                        params = {
                            period: "before meal",
                            sugarLevel: "70-110"
                        };
                    }
                    if (sugarLevel > 110) {
                        params = {
                            period: "before meal",
                            sugarLevel: "110-300"
                        };
                    }
                }
                else if (period === "after meal") {
                    if (sugarLevel >= 70 && sugarLevel <= 180) {
                        params = {
                            period: "after meal",
                            sugarLevel: "70-180"
                        };
                    }
                    if (sugarLevel > 180) {
                        params = {
                            period: "after meal",
                            sugarLevel: "180-300"
                        };
                    }
                }
                return params;
            };

            return {
                "findParams": findParams
            };
        }
    ]);
})(angular);
