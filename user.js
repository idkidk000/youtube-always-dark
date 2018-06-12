// ==UserScript==
// @name           YouTube always dark
// @version        0.1
// @description    Modified from https://greasyfork.org/en/scripts/40812-youtube-dark-at-night/code
// @author         gvvad
// @run-at         document-end
// @include        http*://www.youtube.com/*
// @include        http*://youtube.com/*
// @grant          none
// @downloadURL      https://github.com/johnakki/youtube-always-dark/new/master/user.js
// ==/UserScript==

(function() {
    'use strict';
    const STORAGE_NAME = "yt_dark_night";

    let scope = {
        turnDarkTheme: function(v) {
            try {
                let ytd_app = document.querySelector("ytd-app");
                if (ytd_app.isAppDarkTheme_() != v) {
                    let ytd_thr = document.createElement('ytd-toggle-theme-compact-link-renderer');
                    //  prefs_ & setLabel_ - not present in ytd-app
                    //  just copy it from ytd-theme-renderer
                    ytd_app.prefs_ = ytd_thr.prefs_;
                    ytd_app.setLabel_ = ytd_thr.setLabel_;

                    if (v) {
                        ytd_thr.handleSignalActionToggleDarkThemeOn_.call(ytd_app);
                    } else {
                        ytd_thr.handleSignalActionToggleDarkThemeOff_.call(ytd_app);
                    }
                }
            } catch(e) {}
        }
    };

    //  Local storage for synchronize all opened tabs
    //  [STORAGE_NAME] - ('1' - dark theme on | '0' - dark theme off)
    window.addEventListener("storage", function(ev) {
        if (ev.key == STORAGE_NAME) {
            this.turnDarkTheme(!!parseInt(ev.newValue));
        }
    }.bind(scope));

    let dispatcher = function() {
        this.turnDarkTheme(true);
        localStorage[STORAGE_NAME] = "1";
    }.bind(scope);
    dispatcher();
})();
