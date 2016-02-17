"use strict";

(function (window) {

    var setts = {
        "SERVER_URL": "http://localhost:8000",
        "DEBUG": true,
        "ACTIONS": {
            "RESTRICT": []
        },
        "CREDZ": {
            "client_id": "dbc254",
            "client_secret": "diabetescheck@siri"
        },
        "AUTH": {
            "SERVER_DOMAIN": "http://localhost:9000",
            "TOKEN_URL": "/o/token/",
            "AUTHORIZE_URL": "/o/authorize/",
            "REVOKE_TOKEN_URL": "/o/revoke_token/",
            "USER_INFO_URL": "/me/",
            "REDIRECT_URL": "/complete/",
            "USER_PROFILE": "/manage/profile/",
            "RESET_URL": "/accounts/password/reset/",
            "RESET_CONFIRM": "/accounts/password/reset/confirm/",
            "PASS_CHANGE_URL": "/accounts/password/change/"
        },
        "TIMEOUT": {
            "idle": 1200,
            "warning": 10
        }
    };

    setts.CREDZ.token_url = setts.SERVER_URL + setts.AUTH.TOKEN_URL;
    setts.CREDZ.revoke_url = setts.SERVER_URL + setts.AUTH.REVOKE_TOKEN_URL;
    window.DBCHECK_SETTINGS = setts;

})(window);
