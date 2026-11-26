(function () {
    'use strict';
    var script = document.currentScript;
    var root = script && script.closest('.lc-site');
    if (!root) {
        root = document.querySelector('.lc-site');
    }
    if (!root || root.getAttribute('data-lc-enquiry-ready') === '1') {
        return;
    }
    var dialog = root.querySelector('#lc-enquiry-dialog');
    var form = root.querySelector('#lc-enquiry-form');
    var model = root.querySelector('#lc-enquiry-product');
    var status = root.querySelector('#lc-enquiry-status');
    var confirm = root.querySelector('#lc-enquiry-confirm');
    var fallback = root.querySelector('#lc-enquiry-fallback');
    var previousFocus = null;
    if (!dialog || !form || !model || !status || !confirm) {
        return;
    }
    root.setAttribute('data-lc-enquiry-ready', '1');
    var openers = root.querySelectorAll('.lc-enquiry-open');
    function hideDialog() {
        if (typeof dialog.close === 'function') {
            dialog.close();
        }
    }
    function clearDetails() {
        form.reset();
        status.hidden = true;
        if (previousFocus && document.documentElement.contains(previousFocus)) {
            previousFocus.focus();
        }
    }
    function showUnavailableMessage() {
        if (!form.checkValidity()) {
            status.hidden = true;
            form.reportValidity();
            return;
        }
        status.hidden = false;
    }
    for (var i = 0; i < openers.length; i += 1) {
        openers[i].disabled = false;
        openers[i].addEventListener('click', function () {
            previousFocus = this;
            if (typeof dialog.showModal !== 'function') {
                if (fallback) {
                    fallback.hidden = false;
                }
                return;
            }
            form.reset();
            status.hidden = true;
            model.value = this.getAttribute('data-lc-request-product') || 'General product enquiry';
            if (!dialog.open) {
                dialog.showModal();
            }
            root.querySelector('#lc-enquiry-first-name').focus();
        });
    }
    root.querySelector('.lc-enquiry-close').addEventListener('click', hideDialog);
    dialog.addEventListener('close', clearDetails);
    dialog.addEventListener('click', function (event) {
        if (event.target !== dialog) {
            return;
        }
        var bounds = dialog.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) {
            hideDialog();
        }
    });
    confirm.disabled = false;
    form.addEventListener('input', function () {
        status.hidden = true;
    });
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        showUnavailableMessage();
    }, true);
})();
