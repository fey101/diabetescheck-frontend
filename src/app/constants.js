(function(moment, Blob) {
    "use strict";

    angular.module("diabetescheck.constants", [])

    .constant("moment", moment)
    .constant("Blob", Blob);

})( window.moment, window.Blob);
