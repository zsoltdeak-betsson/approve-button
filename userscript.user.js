// ==UserScript==
// @name         Approve Button
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Adds an approve button
// @author       ZsoltD
// @match        https://github.com/*/pull/*
// @icon         https://www.google.com/s2/favicons?domain=github.com
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==

(function () {
    'use strict';

    function approve() {
        var checkExist = setInterval(function () {
            const approveBtn = $("button[value='approve']");
            if (approveBtn.length) {
                approveBtn[0].click();
                clearInterval(checkExist);
            }
        }, 100);
        const prUrlEnd = location.href.match(/pull\/\d+/)?.[0]
        $(`a[href$='${prUrlEnd}/files']`)[0].click();
    }

    $(() => {
        var checkExist = setInterval(function () {
            if (!$("#zsolt-approve-button").length) {
                $(".gh-header-actions")
                    .prepend(`<button id="zsolt-approve-button" class="btn btn-sm btn-primary">Approve</button>`)
                    .click(() => approve());
            }
        }, 1000);
    });
})();