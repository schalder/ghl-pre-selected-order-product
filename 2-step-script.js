(function () {
    function getDynamicValue() {
        // Use the function defined in the HTML page
        if (typeof getDynamicValueFromHTML === 'function') {
            return getDynamicValueFromHTML();
        } else {
            console.error("Function getDynamicValueFromHTML() is not defined in the HTML page.");
            return null;
        }
    }

    function getURLParameter(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
    }

    function waitForEl(selector, callback) {
        if (document.querySelector(selector)) {
            callback();
        } else {
            setTimeout(function () {
                waitForEl(selector, callback);
            }, 250);
        }
    }

    waitForEl(".form-payment", function () {
        let pid = getURLParameter("pid");
        console.log("pid: ", pid);
        if (pid && pid !== "null") {
            let dynamicValue = getDynamicValue();
            let checkbox = document.querySelector(`input#checkbox-ctwo-setp-order-${dynamicValue}-${pid}`);
            if (checkbox) {
                checkbox.click();
            } else {
                console.log("Checkbox not found for pid:", pid);
            }
        }
    });
})();
